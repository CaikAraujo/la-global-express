'use server'

import { odooExecute } from '@/lib/odooClient'
import { createLead, findOrCreatePartner } from '@/lib/odoo/crm'
import { createDraftSaleOrder } from '@/lib/odoo/sales'
import { getBookingFields } from '@/lib/odoo/bookingFields'
import {
    BookingFormData,
    BookingResponse,
    OfficeSupportData,
    ConciergeData,
    CorporateCleaningData,
    WasteData,
    TruckData,
    CleaningData
} from '@/types/booking'
import {
    calculateOfficeSupportPrice,
    calculateConciergePrice,
    calculateCorporateCleaningPrice,
    calculateWastePrice,
    calculateTruckPrice,
    calculateCleaningPrice
} from '@/components/booking/logic/pricing'

const ODOO_BOOKING_MODEL = process.env.ODOO_BOOKING_MODEL || 'x_agendamentos'
const ODOO_DEFAULT_SERVICE_PRODUCT_ID = Number(process.env.ODOO_DEFAULT_SERVICE_PRODUCT_ID || 0)
const ODOO_ENABLE_SALE_SYNC = process.env.ODOO_ENABLE_SALE_SYNC === 'true'
const fields = getBookingFields()

function toOdooDatetime(value: Date): string {
    // Odoo datetime espera "YYYY-MM-DD HH:mm:ss" (sem timezone ISO).
    return value.toISOString().slice(0, 19).replace('T', ' ')
}

export async function createBooking(formData: BookingFormData): Promise<BookingResponse> {
    if (!formData.name || !formData.email || !formData.serviceId) {
        return { error: 'Dados incompletos: Nome, Email e ID do Serviço são obrigatórios.' }
    }

    let finalPrice = formData.price;

    if (formData.serviceId !== 'unknown' && formData.config) {
        try {
            let safePrice = 0;

            switch (formData.serviceId) {
                case 'corp-office-staff':
                    safePrice = calculateOfficeSupportPrice(formData.config as OfficeSupportData, formData.frequency);
                    break;
                case 'corp-concierge':
                    safePrice = calculateConciergePrice(formData.config as ConciergeData);
                    break;
                case 'corp-cleaning':
                    safePrice = calculateCorporateCleaningPrice(formData.config as CorporateCleaningData);
                    break;
                case 'corp-waste':
                    safePrice = calculateWastePrice(formData.config as WasteData);
                    break;
                case 'res-truck-rental':
                    safePrice = calculateTruckPrice(formData.config as TruckData);
                    break;
                case 'res-cleaning':
                    safePrice = calculateCleaningPrice(formData.config as CleaningData);
                    break;
                default:
                    // Fallback for services without config or new ones
                    safePrice = formData.price;
                    if (formData.config) {
                        console.warn(`[Security] No validator for ${formData.serviceId}. Using client price.`);
                    }
                    break;
            }

            // Tolerance check (for float rounding diffs)
            if (safePrice > 0 && Math.abs(safePrice - formData.price) > 2.0) { // 2 CHF tolerance
                console.warn(`[Security] Price mismatch for ${formData.serviceId}. Client: ${formData.price}, Server: ${safePrice}. Enforcing Server Price.`);
                finalPrice = safePrice;
            } else if (safePrice > 0) {
                finalPrice = safePrice; // Always use server price to be safe
            }

        } catch (e) {
            console.error('[Security] Validation Failed:', e);
            // In a strict environment, we should fail. 
            // For now, allow fallback but logged.
        }
    }

    const payload: Record<string, unknown> = {
        [fields.serviceId]: formData.serviceId,
        [fields.serviceName]: formData.serviceName,
        [fields.frequency]: formData.frequency,
        [fields.duration]: formData.duration,
        [fields.price]: finalPrice,
        [fields.date]: formData.date,
        [fields.time]: formData.time,
        [fields.address]: formData.address,
        [fields.customerName]: formData.name,
        [fields.email]: formData.email,
        [fields.phone]: formData.phone,
        [fields.canton]: formData.canton || '',
        [fields.observations]: formData.observations,
        [fields.serviceDetails]: typeof formData.serviceDetails === 'string'
            ? formData.serviceDetails
            : JSON.stringify(formData.serviceDetails),
        [fields.status]: 'pending',
        [fields.createdAt]: toOdooDatetime(new Date()),
    }

    try {
        const bookingId = await odooExecute(ODOO_BOOKING_MODEL, 'create', [[payload]]) as number

        // Sync comercial: tenta criar/relacionar lead no CRM sem bloquear o agendamento.
        try {
            const partnerId = await findOrCreatePartner({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                street: formData.address,
            })

            await createLead({
                name: `Agendamento Web - ${formData.serviceName}`,
                contactName: formData.name,
                email: formData.email,
                phone: formData.phone,
                description: [
                    `Servico: ${formData.serviceName}`,
                    `Data: ${formData.date} ${formData.time}`,
                    `Endereco: ${formData.address}`,
                    `Valor estimado: CHF ${finalPrice}`,
                    formData.observations ? `Observacoes: ${formData.observations}` : '',
                ].filter(Boolean).join('\n'),
                origin: `Booking ${bookingId}`,
                partnerId,
            })

            if (ODOO_ENABLE_SALE_SYNC && partnerId && ODOO_DEFAULT_SERVICE_PRODUCT_ID > 0) {
                await createDraftSaleOrder({
                    partnerId,
                    origin: `Booking ${bookingId}`,
                    note: `Gerado automaticamente do portal (${formData.serviceName}).`,
                    productId: ODOO_DEFAULT_SERVICE_PRODUCT_ID,
                    quantity: 1,
                    unitPrice: finalPrice,
                })
            }
        } catch (crmError) {
            console.error('CRM sync warning:', crmError)
        }

        return { success: true, bookingId }
    } catch (error) {
        console.error('Odoo Error:', error)
        return { error: 'Erro ao salvar agendamento. Tente novamente em instantes.' }
    }
}

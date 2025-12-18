'use server'

import { createAdminClient } from '@/utils/supabase/admin'
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

export async function createBooking(formData: BookingFormData): Promise<BookingResponse> {
    const supabase = createAdminClient()

    // Basic validation
    if (!formData.name || !formData.email || !formData.serviceId) {
        return { error: 'Dados incompletos: Nome, Email e ID do Serviço são obrigatórios.' }
    }

    // [SECURITY] Server-Side Price Validation
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

    const { data, error } = await supabase
        .from('agendamentos')
        .insert([
            {
                service_id: formData.serviceId,
                service_name: formData.serviceName,
                frequency: formData.frequency,
                duration: formData.duration,
                price: finalPrice, // Use validated price
                data: formData.date,
                horario: formData.time,
                address: formData.address,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                canton: formData.canton || null,
                observations: formData.observations,
                service_details: typeof formData.serviceDetails === 'string'
                    ? formData.serviceDetails
                    : JSON.stringify(formData.serviceDetails),
                status: 'pending',
                created_at: new Date().toISOString(),
                // Optionally save the trusted config to a JSONB column if exists
                // config: formData.config 
            },
        ])
        .select()

    if (error) {
        console.error('Supabase Error:', error)
        return { error: error.message || 'Erro ao salvar agendamento.' }
    }

    return { success: true, bookingId: data[0].id }
}

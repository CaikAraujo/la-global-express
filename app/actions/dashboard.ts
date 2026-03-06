'use server'

import { getAuthSession } from '@/lib/auth/session'
import { getSessionVersion } from '@/lib/auth/sessionVersion'
import { odooExecute } from '@/lib/odooClient'
import { getBookingFields } from '@/lib/odoo/bookingFields'

const ODOO_BOOKING_MODEL = process.env.ODOO_BOOKING_MODEL || 'x_agendamentos'
const fields = getBookingFields()

export async function getUserBookings() {
    const session = await getAuthSession()
    if (!session?.email) {
        return { error: 'Usuário não autenticado' }
    }
    const currentVersion = await getSessionVersion(session.uid)
    if (session.sessionVersion !== currentVersion) {
        return { error: 'Sessão expirada. Faça login novamente.' }
    }

    try {
        const records = (await odooExecute(ODOO_BOOKING_MODEL, 'search_read', [
            [[fields.email, '=ilike', session.email]],
            {
                fields: ['id', fields.serviceName, fields.date, fields.time, fields.status, fields.createdAt, fields.price, fields.address],
                order: `${fields.createdAt} desc`,
            },
        ])) as Array<Record<string, unknown>>

        return {
            bookings: records.map((item) => ({
                id: Number(item.id),
                service_name: String(item[fields.serviceName] ?? ''),
                data: String(item[fields.date] ?? ''),
                horario: String(item[fields.time] ?? ''),
                status: String(item[fields.status] ?? 'pending'),
                created_at: String(item[fields.createdAt] ?? ''),
                price: Number(item[fields.price] ?? 0),
                address: String(item[fields.address] ?? ''),
            })),
        }
    } catch (error) {
        console.error('Error fetching Odoo bookings:', error)
        return { error: 'Erro ao carregar histórico.' }
    }
}

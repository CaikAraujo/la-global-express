'use server'

import { odooExecute } from '@/lib/odooClient'
import { getBookingFields } from '@/lib/odoo/bookingFields'

const ODOO_BOOKING_MODEL = process.env.ODOO_BOOKING_MODEL || 'x_agendamentos'
const fields = getBookingFields()

export async function getAvailability(date: string, serviceName: string) {
    try {
        const bookings = (await odooExecute(ODOO_BOOKING_MODEL, 'search_read', [
            [[fields.date, '=', date], [fields.serviceName, '=ilike', serviceName]],
            { fields: [fields.time, fields.duration] },
        ])) as Array<Record<string, unknown>>

        return bookings.map((b) => {
            const [h, m] = String(b[fields.time] ?? '').split(':').map(Number)
            const start = h + (m / 60)
            const end = start + Number(b[fields.duration] ?? 0)
            return { start, end }
        })
    } catch (error) {
        console.error('Error fetching availability from Odoo:', error)
        return []
    }
}

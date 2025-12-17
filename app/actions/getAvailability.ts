'use server'

import { createAdminClient } from '@/utils/supabase/admin'

export async function getAvailability(date: string) {
    const supabase = createAdminClient()

    // 1. Fetch bookings for the specific date
    const { data: bookings, error } = await supabase
        .from('agendamentos')
        .select('horario, duration')
        .eq('data', date)

    if (error) {
        console.error('Error fetching availability:', error)
        return []
    }

    // 2. Map to a simpler format
    // agendamentos.horario is text like "08:00"
    // agendamentos.duration is numeric like 4 or 4.5
    return bookings.map(b => {
        const [h, m] = b.horario.split(':').map(Number)
        // Convert everything to decimal hours for easier math (08:30 = 8.5)
        const start = h + (m / 60)
        const end = start + Number(b.duration)

        return { start, end }
    })
}

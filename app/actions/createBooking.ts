'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { BookingFormData, BookingResponse } from '@/types/booking'

export async function createBooking(formData: BookingFormData): Promise<BookingResponse> {
    const supabase = createAdminClient()

    // Basic validation
    if (!formData.name || !formData.email || !formData.serviceId) {
        return { error: 'Dados incompletos: Nome, Email e ID do Serviço são obrigatórios.' }
    }

    const { data, error } = await supabase
        .from('agendamentos')
        .insert([
            {
                service_id: formData.serviceId,
                service_name: formData.serviceName,
                frequency: formData.frequency,
                duration: formData.duration,
                price: formData.price,
                data: formData.date, // Mapped to existing column 'data'
                horario: formData.time, // Mapped to existing column 'horario'
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
            },
        ])
        .select()

    if (error) {
        console.error('Supabase Error:', error)
        return { error: error.message || 'Erro ao salvar agendamento.' }
    }

    return { success: true, bookingId: data[0].id }
}

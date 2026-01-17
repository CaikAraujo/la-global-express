'use server'

import { createClient } from '@/utils/supabase/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function getUserBookings() {
    const supabase = await createClient()

    // 1. SEGURANÇA: Verificamos a credencial do usuário no servidor
    // Ninguém pode falsificar isso, pois vem do Cookie criptografado
    const { data: { user } } = await supabase.auth.getUser()

    if (!user || !user.email) {
        return { error: 'Usuário não autenticado' }
    }

    // 2. BUSCA SEGURA: Usamos o cliente Admin para "ler tudo",
    // MAS filtramos estritamente pelo email do usuário logado.
    // O usuário não tem controle sobre esse filtro, o servidor que define.
    const supabaseAdmin = createAdminClient()

    const { data: bookings, error } = await supabaseAdmin
        .from('agendamentos')
        .select('*')
        .ilike('email', user.email) // Garante que só traga os dele
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching bookings:', error)
        return { error: 'Erro ao carregar histórico.' }
    }

    return { bookings }
}

'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { NewCompanyEmailTemplate } from '@/components/emails/NewCompanyEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Validate fields
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Por favor, preencha todos os campos.' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: 'Email ou senha inválidos.' }
    }

    // Check if user is approved (for companies)
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('approved, user_type')
            .eq('id', user.id)
            .single()

        if (profile && profile.user_type === 'company' && !profile.approved) {
            await supabase.auth.signOut()
            return { error: 'Sua conta ainda está em análise. Você receberá um email quando for aprovada.' }
        }
    }

    redirect('/')
}

export async function signupIndividual(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const fullName = `${firstName} ${lastName}`.trim()

    if (!email || !password || !firstName || !lastName) {
        return { error: 'Por favor, preencha todos os campos obrigatórios.' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                user_type: 'individual',
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}

export async function signupCompany(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const companyName = formData.get('companyName') as string
    const companyUid = formData.get('companyUid') as string
    const contactPerson = formData.get('contactPerson') as string

    if (!email || !password || !companyName || !companyUid || !contactPerson) {
        return { error: 'Por favor, preencha todos os campos obrigatórios.' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: companyName,
                user_type: 'company',
                company_details: {
                    uid: companyUid,
                    contact_person: contactPerson
                }
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Send email to admin
    try {
        await resend.emails.send({
            from: 'La Global Express <Anderson@laglobal.ch>',
            to: ['Anderson@laglobal.ch'],
            subject: `Novo cadastro PJ: ${companyName}`,
            react: NewCompanyEmailTemplate({
                companyName,
                email,
                companyUid,
                contactPerson
            }),
        })
    } catch (emailError) {
        console.error('Failed to send admin notification:', emailError)
        // Don't block signup success even if email fails, but maybe log it better
    }

    // We don't redirect to home, but return success to show a "Pending" message
    return { success: true, message: 'Cadastro realizado com sucesso! Aguarde a aprovação da nossa equipe (até 24h).' }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

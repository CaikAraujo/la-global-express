'use server'

import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { NewCompanyEmailTemplate } from '@/components/emails/NewCompanyEmail'
import { headers } from 'next/headers'
import { odooAuthenticate, odooExecute, odooExecuteAsUser, odooExecuteKw } from '@/lib/odooClient'
import { getSessionVersion, bumpSessionVersion, isResetTokenUsed, markResetTokenAsUsed } from '@/lib/auth/sessionVersion'
import { assertRateLimit } from '@/lib/security/rateLimit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'
import {
    clearAuthSession,
    createPasswordResetToken,
    getAuthSession,
    setAuthSession,
    verifyPasswordResetToken,
} from '@/lib/auth/session'

const resend = new Resend(process.env.RESEND_API_KEY)

const CREATE_USER_CONTEXT = {
    no_reset_password: true,
    mail_create_nolog: true,
    mail_create_nosubscribe: true,
    tracking_disable: true,
}

async function getUserByLogin(email: string) {
    const users = (await odooExecute('res.users', 'search_read', [
        [['login', '=', email]],
        { fields: ['id', 'name', 'login', 'active'], limit: 1 },
    ])) as Array<{ id: number; name: string; login: string; active?: boolean }>
    return users[0] ?? null
}

async function getRequestIp() {
    const h = await headers()
    return (h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown')
}

async function validateCaptcha(formData: FormData) {
    const token = (formData.get('cf-turnstile-response') as string) || ''
    const ip = await getRequestIp()
    const valid = await verifyTurnstileToken(token, ip)
    if (!valid) {
        return { error: 'Falha na validação de segurança. Tente novamente.' }
    }
    return null
}

function mapSecurityError(error: unknown): { error: string } | null {
    const message = error instanceof Error ? error.message : ''
    if (message === 'RATE_LIMIT_EXCEEDED') {
        return { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
    }
    if (message.includes('Falha na validação de segurança')) {
        return { error: message }
    }
    return null
}

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Por favor, preencha todos os campos.' }
    }

    try {
        const ip = await getRequestIp()
        try {
            await assertRateLimit('login', `${ip}:${email.toLowerCase()}`, { limit: 5, windowSeconds: 15 * 60 })
        } catch (e) {
            const message = e instanceof Error ? e.message : ''
            if (message === 'RATE_LIMIT_EXCEEDED') {
                return { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
            }
            // Fail-open: não bloqueia login em caso de erro de backend no rate-limit.
            console.warn('Rate limit backend unavailable for login.')
        }
        const captchaError = await validateCaptcha(formData)
        if (captchaError) return captchaError

        const uid = await odooAuthenticate(email, password)
        const users = (await odooExecute('res.users', 'search_read', [
            [['id', '=', uid]],
            { fields: ['id', 'name', 'login', 'active'], limit: 1 },
        ])) as Array<{ id: number; name: string; login: string; active?: boolean }>

        const currentUser = users?.[0]
        if (!currentUser) return { error: 'Email ou senha inválidos.' }
        if (currentUser.active === false) {
            return { error: 'Sua conta está aguardando aprovação.' }
        }

        await setAuthSession({
            uid: currentUser.id,
            email: currentUser.login,
            name: currentUser.name,
            userType: 'individual',
            sessionVersion: await getSessionVersion(currentUser.id),
        })
    } catch (error) {
        const securityError = mapSecurityError(error)
        if (securityError) return securityError
        return { error: 'Email ou senha inválidos.' }
    }

    redirect('/')
}

export async function signupIndividual(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const fullName = `${firstName} ${lastName}`.trim()

    if (!email || !password || !firstName || !lastName) {
        return { error: 'Por favor, preencha todos os campos obrigatórios.' }
    }

    try {
        const existingUser = await getUserByLogin(email)
        if (existingUser) {
            return { error: 'Este email já está cadastrado. Tente fazer login.' }
        }

        const createPayload: Record<string, unknown> = {
            name: fullName,
            login: email,
            email,
            password,
            active: true,
            share: true,
        }
        const createdUserId = await odooExecuteKw(
            'res.users',
            'create',
            [[createPayload]],
            { context: CREATE_USER_CONTEXT }
        ) as number

        // Auto-login após cadastro individual.
        await setAuthSession({
            uid: createdUserId,
            email,
            name: fullName,
            userType: 'individual',
            sessionVersion: await getSessionVersion(createdUserId),
        })

        // E-mail de boas-vindas próprio (sem link de ativação do ERP).
        try {
            await resend.emails.send({
                from: 'La Global Express <Anderson@laglobal.ch>',
                to: [email],
                subject: 'Bem-vindo(a) a La Global Express',
                html: `<p>Olá ${fullName},</p>
                       <p>Sua conta foi criada com sucesso na La Global Express.</p>
                       <p>Seja bem-vindo(a)!</p>`,
            })
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError)
        }
    } catch (error) {
        console.error('Signup individual failed:', error)
        return { error: 'Não foi possível criar sua conta agora. Tente novamente em instantes.' }
    }

    return { success: true, message: 'Conta criada com sucesso.' }
}

export async function signupCompany(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const companyName = formData.get('companyName') as string
    const companyUid = formData.get('companyUid') as string
    const contactPerson = formData.get('contactPerson') as string

    if (!email || !password || !companyName || !companyUid || !contactPerson) {
        return { error: 'Por favor, preencha todos os campos obrigatórios.' }
    }

    try {
        const existingUser = await getUserByLogin(email)
        if (existingUser) {
            return { error: 'Este email já está cadastrado. Tente fazer login.' }
        }

        const createPayload: Record<string, unknown> = {
            name: companyName,
            login: email,
            email,
            password,
            active: false,
            share: true,
        }
        await odooExecuteKw(
            'res.users',
            'create',
            [[createPayload]],
            { context: CREATE_USER_CONTEXT }
        )
    } catch (error) {
        console.error('Signup company failed:', error)
        return { error: 'Não foi possível criar sua conta agora. Tente novamente em instantes.' }
    }

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
    }

    return { success: true, message: 'Cadastro realizado com sucesso! Aguarde a aprovação da nossa equipe (até 24h).' }
}

export async function logout() {
    await clearAuthSession()
    redirect('/login')
}

export async function resetPassword(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) {
        return { error: 'Email inválido.' }
    }

    const ip = await getRequestIp()
    try {
        await assertRateLimit('forgot-password', `${ip}:${email.toLowerCase()}`, { limit: 3, windowSeconds: 15 * 60 })
    } catch (e) {
        const message = e instanceof Error ? e.message : ''
        if (message === 'RATE_LIMIT_EXCEEDED') {
            return { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
        }
        console.warn('Rate limit backend unavailable for forgot-password.')
    }
    const captchaError = await validateCaptcha(formData)
    if (captchaError) return captchaError

    const users = (await odooExecute('res.users', 'search_read', [
        [['login', '=', email]],
        { fields: ['id', 'login'], limit: 1 },
    ])) as Array<{ id: number; login: string }>

    // Nunca revelar se o email existe para evitar enumeração de contas.
    if (!users[0]) {
        return { success: true, message: 'Se o email existir, enviaremos um link de recuperação.' }
    }

    const host = (await headers()).get('host')
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const appUrl = process.env.APP_URL || (host ? `${protocol}://${host}` : '')
    const token = createPasswordResetToken(users[0].id, users[0].login)
    const resetLink = `${appUrl}/auth/reset-password?token=${encodeURIComponent(token)}`

    await resend.emails.send({
        from: 'La Global Express <Anderson@laglobal.ch>',
        to: [email],
        subject: 'Redefinição de senha - La Global Express',
        html: `<p>Recebemos um pedido para redefinir sua senha.</p>
               <p><a href="${resetLink}">Clique aqui para redefinir</a></p>
               <p>Este link expira em 30 minutos.</p>`,
    })

    return { success: true, message: 'Se o email existir, enviaremos um link de recuperação.' }
}

export async function updatePassword(formData: FormData) {
    const token = formData.get('token') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!token || !password || !confirmPassword) {
        return { error: 'Preencha todos os campos' }
    }

    if (password !== confirmPassword) {
        return { error: 'As senhas não coincidem' }
    }

    if (password.length < 6) {
        return { error: 'A senha deve ter pelo menos 6 caracteres' }
    }

    const ip = await getRequestIp()
    try {
        await assertRateLimit('reset-password', `${ip}:${token.slice(0, 16)}`, { limit: 5, windowSeconds: 15 * 60 })
    } catch (e) {
        const message = e instanceof Error ? e.message : ''
        if (message === 'RATE_LIMIT_EXCEEDED') {
            return { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }
        }
        console.warn('Rate limit backend unavailable for reset-password.')
    }
    const captchaError = await validateCaptcha(formData)
    if (captchaError) return captchaError

    const payload = verifyPasswordResetToken(token)
    if (!payload) {
        return { error: 'Link de recuperação inválido ou expirado.' }
    }

    try {
        const alreadyUsed = await isResetTokenUsed(payload.jti)
        if (alreadyUsed) {
            return { error: 'Este link de recuperação já foi utilizado.' }
        }
        await odooExecute('res.users', 'write', [[payload.uid], { password }])
        await markResetTokenAsUsed(payload.jti)
        await bumpSessionVersion(payload.uid)
    } catch {
        return { error: 'Erro ao atualizar senha. Tente novamente.' }
    }

    return { success: true }
}

export async function updateOwnPassword(formData: FormData) {
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const session = await getAuthSession()

    if (!session) return { error: 'Sessão expirada. Faça login novamente.' }
    if (!currentPassword || !newPassword || !confirmPassword) return { error: 'Preencha todos os campos.' }
    if (newPassword !== confirmPassword) return { error: 'As senhas não coincidem.' }
    if (newPassword.length < 6) return { error: 'A senha deve ter pelo menos 6 caracteres.' }

    try {
        await odooExecuteAsUser(session.email, currentPassword, 'res.users', 'change_password', [[currentPassword, newPassword]])
        await bumpSessionVersion(session.uid)
    } catch {
        return { error: 'Não foi possível alterar a senha. Verifique sua senha atual.' }
    }

    return { success: true }
}

export async function getCurrentUser() {
    const session = await getAuthSession()
    if (!session) return { user: null }
    const currentVersion = await getSessionVersion(session.uid)
    if (session.sessionVersion !== currentVersion) {
        await clearAuthSession()
        return { user: null }
    }
    return { user: session }
}

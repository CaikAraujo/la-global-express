'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signupIndividual, signupCompany } from '@/app/actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Building2, User, CheckCircle2 } from 'lucide-react'

export default function SignupPage() {
    const [accountType, setAccountType] = useState<'individual' | 'company'>('individual')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const router = useRouter()

    async function handleIndividualSignup(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await signupIndividual(formData)

        if (result?.error) {
            if (result.error.includes('already registered')) {
                setError('Este email já está cadastrado. Tente fazer login.')
            } else {
                setError(result.error)
            }
            setLoading(false)
        } else if (result?.success) {
            setSuccessMessage('Cadastro realizado com sucesso! Entrando...')
            setTimeout(() => {
                router.push('/')
                router.refresh()
            }, 2000)
        }
    }

    async function handleCompanySignup(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await signupCompany(formData)
        setLoading(false)
        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccessMessage(result.message!)
        }
    }

    if (successMessage) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-100"
                    >
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastro Enviado!</h2>
                        <p className="text-gray-600 mb-6">
                            {successMessage}
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 bg-[#E30613]"
                        >
                            Voltar para Login
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link
                href="/"
                className="absolute top-8 left-8 text-gray-500 hover:text-brand-600 flex items-center gap-2 transition-colors"
            >
                <ArrowLeft size={20} />
                Voltar para a Home
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Crie sua conta
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">

                    {/* Tabs */}
                    <div className="flex rounded-md bg-gray-100 p-1 mb-6">
                        <button
                            onClick={() => setAccountType('individual')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${accountType === 'individual'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <User size={16} />
                            Pessoa Física
                        </button>
                        <button
                            onClick={() => setAccountType('company')}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${accountType === 'company'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            <Building2 size={16} />
                            Pessoa Jurídica
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {accountType === 'individual' ? (
                            <motion.form
                                key="individual"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                action={handleIndividualSignup}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nome</label>
                                        <input id="firstName" name="firstName" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                                        <input id="lastName" name="lastName" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input id="email" name="email" type="email" autoComplete="email" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                                    <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                {error && <div className="text-red-600 text-sm">{error}</div>}

                                <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Criar Conta'}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="company"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                action={handleCompanySignup}
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
                                    <input id="companyName" name="companyName" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="companyUid" className="block text-sm font-medium text-gray-700">NIDE / UID (Registro Comercial)</label>
                                    <input id="companyUid" name="companyUid" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" placeholder="CHE-123.456.789" />
                                </div>

                                <div>
                                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Pessoa de Contato</label>
                                    <input id="contactPerson" name="contactPerson" type="text" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Corporativo</label>
                                    <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                                    <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm" />
                                </div>

                                {error && <div className="text-red-600 text-sm">{error}</div>}

                                <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700">
                                    Atenção: Cadastros de Pessoa Jurídica passam por aprovação. Você receberá um e-mail em até 24h.
                                </div>

                                <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Solicitar Cadastro'}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600 mb-8">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
                        Faça login
                    </Link>
                </p>

            </div>
        </div>
    )
}

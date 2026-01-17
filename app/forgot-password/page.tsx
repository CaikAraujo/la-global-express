'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { resetPassword } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowLeft, Loader2, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        setSuccessMessage(null)

        const result = await resetPassword(formData)

        setLoading(false)

        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccessMessage(result.message!)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Link
                href="/login"
                className="absolute top-8 left-8 text-gray-500 hover:text-brand-600 flex items-center gap-2 transition-colors"
            >
                <ArrowLeft size={20} />
                Voltar para Login
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Recuperar Senha
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Digite seu email para receber um link de redefinição.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">

                    {successMessage ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                        >
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <Mail className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Enviado!</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                {successMessage}
                            </p>
                            <Link
                                href="/login"
                                className="text-brand-600 hover:text-brand-500 font-medium"
                            >
                                Voltar para o Login
                            </Link>
                        </motion.div>
                    ) : (
                        <form action={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Endereço de Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin h-5 w-5" />
                                    ) : (
                                        'Enviar Link de Recuperação'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

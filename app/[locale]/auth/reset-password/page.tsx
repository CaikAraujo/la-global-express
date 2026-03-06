'use client'

import { useState } from 'react'
import { updatePassword } from '@/app/actions/auth'
import { Loader2, Lock } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'

export default function ResetPasswordPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token') || ''
    const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    async function handleSubmit(formData: FormData) {
        if (!token) {
            setError('Link inválido ou expirado.')
            return
        }
        formData.append('token', token)
        setLoading(true)
        setError(null)

        const result = await updatePassword(formData)

        setLoading(false)

        if (result && 'error' in result) {
            setError(result.error)
        } else {
            // Success!
            router.push('/?reset=success')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {turnstileSiteKey ? (
                <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
            ) : null}
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 mb-4">
                    <Lock className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Réinitialiser le Mot de Passe
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Entrez votre nouveau mot de passe ci-dessous.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    <form action={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Nouveau Mot de Passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirmer le Nouveau Mot de Passe
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <input type="hidden" name="token" value={token} />

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        {turnstileSiteKey ? (
                            <div className="flex justify-center">
                                <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
                            </div>
                        ) : null}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md border border-transparent bg-brand-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    'Changer le Mot de Passe'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

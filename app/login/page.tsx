'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import { ArrowLeft, Loader2, LogIn, Building2, User } from 'lucide-react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loginType, setLoginType] = useState<'individual' | 'company'>('individual')

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError(null)
        const result = await login(formData)

        if (result?.error) {
            setError(result.error)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-600/5 to-transparent -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />

            <Link
                href="/"
                className="absolute top-8 left-8 text-slate-500 hover:text-brand-600 flex items-center gap-2 transition-all duration-200 font-medium hover:-translate-x-1"
            >
                <ArrowLeft size={18} />
                Voltar para a Home
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-[450px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100">
                        {/* Tabs Switcher */}
                        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                            <button
                                onClick={() => setLoginType('individual')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${loginType === 'individual'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <User size={18} />
                                Pessoa Física
                            </button>
                            <button
                                onClick={() => setLoginType('company')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${loginType === 'company'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Building2 size={18} />
                                Pessoa Jurídica
                            </button>
                        </div>

                        <div className="mb-8 text-center">
                            <div className="mx-auto w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4 text-brand-600">
                                {loginType === 'individual' ? <LogIn size={24} /> : <Building2 size={24} />}
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                {loginType === 'individual' ? 'Acesse sua conta pessoal' : 'Portal Corporativo'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                {loginType === 'individual'
                                    ? 'Insira suas credenciais para continuar'
                                    : 'Gerencie seus serviços empresariais'
                                }
                            </p>
                        </div>

                        <form action={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                    {loginType === 'individual' ? 'Email' : 'Email Corporativo'}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder={loginType === 'individual' ? 'seu@email.com' : 'nome@empresa.ch'}
                                    className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                        Senha
                                    </label>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm"
                                />
                                <div className="flex justify-end mt-2">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-medium text-slate-500 hover:text-brand-600 transition-colors"
                                    >
                                        Esqueceu sua senha?
                                    </Link>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md"
                                >
                                    <div className="flex">
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    'Entrar na Plataforma'
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-center text-sm text-slate-500">
                                Não tem uma conta?{' '}
                                <Link
                                    href="/signup"
                                    className="font-semibold text-brand-600 hover:text-brand-500 transition-colors"
                                >
                                    Criar conta gratuitamente
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

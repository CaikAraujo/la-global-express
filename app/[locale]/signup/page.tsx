'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signupIndividual, signupCompany } from '@/app/actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2, Building2, User, CheckCircle2, UserPlus, Briefcase } from 'lucide-react'

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
                setError('Cet email est déjà enregistré. Essayez de vous connecter.')
            } else {
                setError(result.error)
            }
            setLoading(false)
        } else if (result?.success) {
            setSuccessMessage('Inscription réussie ! Connexion en cours...')
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
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-600/5 to-transparent -z-10" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -z-10" />
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />

                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
                    >
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Succès !</h2>
                        <p className="text-slate-600 mb-8">
                            {successMessage}
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center w-full px-4 py-3 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/20 transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Aller à la page de Connexion
                        </Link>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-brand-600/5 to-transparent -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl -z-10" />
            <div className="absolute top-1/2 -left-24 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10" />

            <Link
                href="/"
                className="absolute top-8 left-8 text-slate-500 hover:text-brand-600 flex items-center gap-2 transition-all duration-200 font-medium hover:-translate-x-1"
            >
                <ArrowLeft size={18} />
                Retour à l'accueil
            </Link>

            <div className="sm:mx-auto sm:w-full sm:max-w-[500px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-white py-10 px-8 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100">
                        {/* Tabs */}
                        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                            <button
                                onClick={() => setAccountType('individual')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${accountType === 'individual'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <User size={18} />
                                Particulier
                            </button>
                            <button
                                onClick={() => setAccountType('company')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${accountType === 'company'
                                    ? 'bg-white text-brand-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <Building2 size={18} />
                                Entreprise
                            </button>
                        </div>

                        <div className="mb-8 text-center">
                            <div className="mx-auto w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4 text-brand-600">
                                {accountType === 'individual' ? <UserPlus size={24} /> : <Briefcase size={24} />}
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                {accountType === 'individual' ? 'Créez votre compte personnel' : 'Inscription Entreprise'}
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                {accountType === 'individual'
                                    ? 'Rejoignez-nous et commencez à réserver des services'
                                    : 'Inscrivez votre entreprise pour des solutions exclusives'
                                }
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {accountType === 'individual' ? (
                                <motion.form
                                    key="individual"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    action={handleIndividualSignup}
                                    className="space-y-5"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">Prénom</label>
                                            <input id="firstName" name="firstName" type="text" required className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Nom</label>
                                            <input id="lastName" name="lastName" type="text" required className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                        <input id="email" name="email" type="email" autoComplete="email" required placeholder="votre@email.com" className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
                                        <input id="password" name="password" type="password" required placeholder="••••••••" className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <button type="submit" disabled={loading} className="flex w-full justify-center items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5">
                                        {loading ? <Loader2 className="animate-spin" /> : 'Créer mon compte'}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="company"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    action={handleCompanySignup}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700 mb-2">Nom de l'Entreprise</label>
                                        <input id="companyName" name="companyName" type="text" required className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="companyUid" className="block text-sm font-semibold text-slate-700 mb-2">UID / NIDE (Registre Suisse)</label>
                                        <input id="companyUid" name="companyUid" type="text" required placeholder="CHE-123.456.789" className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="contactPerson" className="block text-sm font-semibold text-slate-700 mb-2">Personne de Contact</label>
                                        <input id="contactPerson" name="contactPerson" type="text" required className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Professionnel</label>
                                        <input id="email" name="email" type="email" required placeholder="contact@entreprise.ch" className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Mot de passe</label>
                                        <input id="password" name="password" type="password" required placeholder="••••••••" className="block w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-brand-500 transition-all duration-200 sm:text-sm" />
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                                        <div className="mt-0.5 min-w-[16px]"><Briefcase size={16} /></div>
                                        <div>Cette inscription sera soumise à analyse. Vous recevrez une confirmation sous 24h.</div>
                                    </div>

                                    <button type="submit" disabled={loading} className="flex w-full justify-center items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5">
                                        {loading ? <Loader2 className="animate-spin" /> : 'Demander l\'Inscription Entreprise'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <p className="text-center text-sm text-slate-500">
                                Vous avez déjà un compte ?{' '}
                                <Link
                                    href="/login"
                                    className="font-semibold text-brand-600 hover:text-brand-500 transition-colors"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

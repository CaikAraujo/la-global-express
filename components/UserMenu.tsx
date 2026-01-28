'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { logout } from '@/app/actions/auth'
import Link from 'next/link'
import { LogOut, User, LayoutDashboard, ChevronDown, Building2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'

type Profile = {
    full_name: string | null
    user_type: 'individual' | 'company' | null
}

export function UserMenu() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        let mounted = true

        async function loadUser() {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (user && mounted) {
                    const { data } = await supabase
                        .from('profiles')
                        .select('full_name, user_type')
                        .eq('id', user.id)
                        .single()

                    if (mounted) setProfile(data)
                } else if (mounted) {
                    setProfile(null)
                }
            } catch (err) {
                console.error('Error loading user:', err)
            } finally {
                if (mounted) setLoading(false)
            }
        }

        // Load initially
        loadUser()

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                if (session?.user) {
                    const { data } = await supabase
                        .from('profiles')
                        .select('full_name, user_type')
                        .eq('id', session.user.id)
                        .single()
                    if (mounted) setProfile(data)
                    router.refresh() // Force server components to refresh
                }
            } else if (event === 'SIGNED_OUT') {
                if (mounted) setProfile(null)
                router.refresh() // Force server components to refresh
            }
        })

        return () => {
            mounted = false
            subscription.unsubscribe()
        }
    }, [supabase, pathname, router])

    const handleLogout = async () => {
        // 1. Optimistically clear state
        setProfile(null)
        setIsOpen(false)

        // 2. Clear client-side session logic
        await supabase.auth.signOut()

        // 3. Force router refresh to clear any server-side protected state
        router.refresh()

        // 4. Call server action to clear cookies and redirect
        await logout()
    }

    if (loading) return <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-md" />

    if (!profile) {
        return (
            <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors mr-4"
            >
                <div className="bg-slate-100 p-2 rounded-full">
                    <User size={18} />
                </div>
                <span>Login</span>
            </Link>
        )
    }

    const firstName = profile.full_name?.split(' ')[0] || 'Utilisateur'

    return (
        <div className="relative z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 group focus:outline-none"
            >
                <div className={`p-0.5 rounded-full border-2 ${profile.user_type === 'company' ? 'border-blue-200' : 'border-brand-100'} group-hover:border-brand-500 transition-colors`}>
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${profile.user_type === 'company' ? 'bg-blue-600' : 'bg-brand-600'}`}>
                        {profile.user_type === 'company' ? <Building2 size={16} /> : firstName[0]}
                    </div>
                </div>

                <div className="text-left hidden sm:block">
                    <div className="text-[10px] uppercase font-bold text-slate-400 leading-tight">
                        {profile.user_type === 'company' ? 'Entreprise' : 'Bienvenue'}
                    </div>
                    <div className="text-sm font-bold text-slate-800 flex items-center gap-1 group-hover:text-brand-600 transition-colors">
                        {firstName}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-1 overflow-hidden origin-top-right ring-1 ring-black ring-opacity-5"
                        onMouseLeave={() => setIsOpen(false)}
                    >
                        <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-0.5">Connecté en tant que</p>
                            <p className="text-sm font-bold text-slate-900 truncate">{profile.full_name}</p>
                        </div>

                        <div className="p-1">
                            <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-lg transition-colors font-medium"
                            >
                                <LayoutDashboard size={18} />
                                Mon Tableau de Bord
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                                <LogOut size={18} />
                                Déconnexion
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

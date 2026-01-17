'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, LogOut, Package, Clock, ShieldCheck, MapPin, Calendar } from 'lucide-react'
import { getUserBookings } from '@/app/actions/dashboard'

type Profile = {
    full_name: string | null
    email: string
    user_type: 'individual' | 'company' | null
}

type Booking = {
    id: number
    service_name: string
    data: string
    horario: string
    status: string
    created_at: string
    price: number
    address: string
}

export default function DashboardPage() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function loadData() {
            // 1. Load User Profile
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.push('/login')
                return
            }

            const { data: profileData } = await supabase
                .from('profiles')
                .select('full_name, user_type, email')
                .eq('id', user.id)
                .single()

            setProfile(profileData)

            // 2. Load Bookings (Server Action)
            const { bookings: userBookings, error } = await getUserBookings()
            if (userBookings) {
                setBookings(userBookings)
            }

            setLoading(false)
        }

        loadData()
    }, [supabase, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
            </div>
        )
    }

    const activeServices = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length
    const totalServices = bookings.length

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'completed': return 'bg-green-100 text-green-700 border-green-200'
            case 'cancelled': return 'bg-red-100 text-red-700 border-red-200'
            default: return 'bg-slate-100 text-slate-700 border-slate-200'
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendente'
            case 'confirmed': return 'Confirmado'
            case 'completed': return 'Concluído'
            case 'cancelled': return 'Cancelado'
            default: return status
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Welcome Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="h-20 w-20 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-3xl font-bold">
                                {profile?.full_name?.[0]}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Olá, {profile?.full_name?.split(' ')[0]}!
                                </h1>
                                <p className="text-slate-500 mt-1 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                    {profile?.user_type === 'company' ? 'Conta Corporativa' : 'Conta Pessoal'} • {profile?.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/#servicos">
                                <button className="px-5 py-2.5 bg-brand-600 text-white rounded-lg font-semibold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all hover:-translate-y-0.5">
                                    Novo Agendamento
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between group hover:border-brand-200 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Serviços Ativos</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{activeServices}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Clock size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between group hover:border-brand-200 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total de Serviços</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-1">{totalServices}</h3>
                        </div>
                        <div className="p-3 bg-brand-50 text-brand-600 rounded-lg group-hover:bg-brand-100 transition-colors">
                            <Package size={24} />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between group hover:border-brand-200 transition-all">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Status da Conta</p>
                            <h3 className="text-3xl font-bold text-green-600 mt-1">Verificada</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
                            <ShieldCheck size={24} />
                        </div>
                    </div>
                </div>

                {/* Recent Services List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900">Histórico de Serviços</h2>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                <Package size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">Nenhum serviço recente</h3>
                            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
                                Você ainda não realizou nenhum serviço conosco. Que tal começar um novo agendamento hoje?
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-lg">{booking.service_name}</h3>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {new Date(booking.data).toLocaleDateString('pt-BR')} às {booking.horario}
                                                </span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {booking.address}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
                                        <div className="text-right mr-4">
                                            <p className="text-xs text-slate-400 font-medium uppercase">Valor Estimado</p>
                                            <p className="font-bold text-slate-900">CHF {booking.price}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                            {getStatusLabel(booking.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Coffee,
    Briefcase,
    Sparkles,
    Users,
    Clock,
    CheckCircle2,
    Settings,
    ShieldCheck
} from 'lucide-react';


interface OfficeSupportFormProps {
    onUpdate: (data: any) => void;
}

type RoleType = 'pantry' | 'cleaning' | 'organizer' | 'maintenance';

export const OfficeSupportForm: React.FC<OfficeSupportFormProps> = ({ onUpdate }) => {
    const [state, setState] = useState({
        role: 'pantry' as RoleType,
        staffCount: 1,
        hoursPerDay: 4,
        frequency: 'daily', // daily, weekly
        uniform: true
    });

    const updateState = (field: string, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        // Pricing Logic
        let hourlyRate = 0;
        switch (state.role) {
            case 'pantry': hourlyRate = 35; break;
            case 'cleaning': hourlyRate = 32; break;
            case 'organizer': hourlyRate = 38; break;
            case 'maintenance': hourlyRate = 45; break;
        }

        // Add uniform cost overhead
        if (state.uniform) hourlyRate += 2;

        const totalHours = state.hoursPerDay * state.staffCount;
        let totalDaily = totalHours * hourlyRate;

        // Discount for frequency could be applied in global store, but here we send base price

        const getRoleLabel = () => {
            switch (state.role) {
                case 'pantry': return 'Copa & Café';
                case 'cleaning': return 'Limpeza & Conservação';
                case 'organizer': return 'Organização & Apoio';
                case 'maintenance': return 'Manutenção Predial';
            }
        };

        let details = `Profissional: ${getRoleLabel()}`;
        details += `\nEquipe: ${state.staffCount} profissional(is)`;
        details += `\nCarga: ${state.hoursPerDay}h/dia`;
        if (state.uniform) details += ' (Com Uniforme)';

        onUpdate({
            price: totalDaily * 5, // Weekly estimate (5 days) for the base price shown
            duration: state.hoursPerDay,
            serviceDetails: details,
            isValid: true,
            // Custom frequency flag if needed by parent
            recurrence: 'weekly'
        });

    }, [state]);

    return (
        <div className="space-y-8 font-sans text-slate-800 animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red/5 to-white p-6 rounded-2xl border border-brand-red/10">
                <h1 className="text-2xl font-display font-bold text-brand-dark mb-2 flex items-center gap-3">
                    <Users className="text-brand-red" size={28} />
                    Profissionais para Escritório
                </h1>
                <p className="text-slate-600">
                    Terceirização de equipes operacionais fixas ou temporárias.
                </p>
            </div>

            {/* 1. Role Selection */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-brand-dark">1. Qual perfil você precisa?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'pantry', label: 'Copa & Café', icon: Coffee, desc: 'Preparo de café, serviço de copa e reuniões.', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                        { id: 'cleaning', label: 'Limpeza Fina', icon: Sparkles, desc: 'Manutenção contínua de banheiros e mesas.', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                        { id: 'organizer', label: 'Organização', icon: Briefcase, desc: 'Apoio administrativo e organização de ambientes.', color: 'bg-red-50 border-red-100 text-brand-red' },
                        { id: 'maintenance', label: 'Manutenção', icon: Settings, desc: 'Reparos rápidos e zeladoria predial.', color: 'bg-slate-50 border-slate-200 text-slate-700' },
                    ].map((item) => {
                        const isSelected = state.role === item.id;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => updateState('role', item.id)}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 group ${isSelected
                                    ? 'border-brand-red ring-1 ring-brand-red bg-white shadow-md'
                                    : 'border-slate-100 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${isSelected ? 'bg-brand-red text-white' : item.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-brand-dark' : 'text-slate-700'}`}>
                                            {item.label}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-4 right-4">
                                            <CheckCircle2 className="text-brand-red" size={20} />
                                        </div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            {/* 2. Configuration */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Staff Counter */}
                    <div>
                        <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Users size={20} className="text-brand-red" /> Tamanho da Equipe
                        </h2>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200 w-fit">
                            <button
                                onClick={() => updateState('staffCount', Math.max(1, state.staffCount - 1))}
                                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                -
                            </button>
                            <span className="w-12 text-center text-xl font-bold text-brand-dark">{state.staffCount}</span>
                            <button
                                onClick={() => updateState('staffCount', state.staffCount + 1)}
                                className="w-10 h-10 rounded-lg bg-brand-red border border-brand-red flex items-center justify-center font-bold text-white hover:bg-brand-dark transition-colors shadow-sm"
                            >
                                +
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            Profissionais dedicados
                        </p>
                    </div>

                    {/* Uniform Toggle */}
                    <div className="flex flex-col justify-center">
                        <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${state.uniform ? 'bg-brand-red border-brand-red' : 'border-slate-300 bg-white'}`}>
                                {state.uniform && <CheckCircle2 size={16} className="text-white" />}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={state.uniform}
                                onChange={(e) => updateState('uniform', e.target.checked)}
                            />
                            <div>
                                <span className="block font-bold text-brand-dark flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-slate-400" /> Uniforme Completo
                                </span>
                                <span className="text-xs text-slate-500">Incluir EPIs e Identificação</span>
                            </div>
                        </label>
                    </div>
                </div>
            </section>

            {/* 3. Hours Selection */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-brand-red" /> Carga Horária Diária
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { value: 4, label: '4 Horas', desc: 'Meio Período' },
                        { value: 8, label: '8 Horas', desc: 'Horário Comercial' },
                        { value: 12, label: '12 Horas', desc: 'Plantão / Turno' },
                    ].map((item) => {
                        const isSelected = state.hoursPerDay === item.value;
                        return (
                            <button
                                key={item.value}
                                onClick={() => updateState('hoursPerDay', item.value)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected
                                    ? 'border-brand-dark bg-brand-dark text-white'
                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className="font-bold">{item.label}</span>
                                    {isSelected && <CheckCircle2 size={18} className="text-brand-red" />}
                                </div>
                                <span className={`text-xs ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{item.desc}</span>
                            </button>
                        )
                    })}
                </div>
            </section>

        </div>
    );
};

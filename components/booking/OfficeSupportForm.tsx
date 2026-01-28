'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    CheckCircle2,
    Briefcase,
    Coffee,
    Sparkles,
    Settings,
    Clock
} from 'lucide-react';

import { OfficeSupportData } from '@/types/booking'; // Strict Type
import { calculateOfficeSupportPrice, getOfficeSupportDetails } from './logic/pricing'; // Centralized Logic

interface OfficeSupportFormProps {
    onUpdate: (data: any) => void;
    frequency?: string; // [NEW] Link with parent frequency
}

export const OfficeSupportForm: React.FC<OfficeSupportFormProps> = ({ onUpdate, frequency = 'once' }) => {
    // [REF] Use Strict Type for State
    const [state, setState] = useState<OfficeSupportData>({
        role: 'general' as any, // default
        staffCount: 1,
        hoursPerDay: 4,
        uniform: true
    });

    const updateState = (field: keyof OfficeSupportData, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    // [REF] Logic Extracted to useMemo + Pure Functions
    // Instead of useEffect with lots of math, we derive the values.
    const price = useMemo(() => calculateOfficeSupportPrice(state, frequency), [state, frequency]);
    const details = useMemo(() => getOfficeSupportDetails(state), [state]);

    // Update parent when derived values change
    useEffect(() => {
        onUpdate({
            price,
            duration: state.hoursPerDay,
            serviceDetails: details,
            isValid: true,
            // Pass raw config if needed by API
            config: state
        });
    }, [price, state.hoursPerDay, details, onUpdate]); // Minimal dependency array

    return (
        <div className="space-y-10 font-sans text-slate-800 animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red/5 to-white p-6 rounded-2xl border border-brand-red/10">
                <h1 className="text-2xl font-display font-bold text-brand-dark mb-2 flex items-center gap-3">
                    <Users className="text-brand-red" size={28} />
                    Personnel de Bureau
                </h1>
                <p className="text-slate-600">
                    Externalisation d'équipes opérationnelles fixes ou temporaires.
                </p>
            </div>

            {/* 1. Role Selection */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4">1. Choisissez la Fonction</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'pantry', label: 'Service Café & Repas', icon: Coffee, desc: 'Préparation café, service et réunions.', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                        { id: 'cleaning', label: 'Nettoyage Fin', icon: Sparkles, desc: 'Entretien continu sanitaires et bureaux.', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                        { id: 'organizer', label: 'Organisation', icon: Briefcase, desc: 'Soutien administratif et organisation.', color: 'bg-red-50 border-red-100 text-brand-red' },
                        { id: 'maintenance', label: 'Maintenance', icon: Settings, desc: 'Réparations rapides et conciergerie.', color: 'bg-slate-50 border-slate-200 text-slate-700' },
                    ].map((item) => {
                        const isSelected = state.role === item.id;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => updateState('role', item.id as any)}
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

            {/* 2. Staff Count & Uniform */}
            <section>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Users size={20} className="text-brand-red" /> Taille de l'Équipe
                        </h2>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-200 w-fit">
                            <button
                                onClick={() => updateState('staffCount', Math.max(1, state.staffCount - 1))}
                                disabled={state.staffCount <= 1}
                                className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition-colors font-bold text-lg"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-bold text-xl text-brand-dark">{state.staffCount}</span>
                            <button
                                onClick={() => updateState('staffCount', state.staffCount + 1)}
                                className="w-10 h-10 rounded-lg bg-brand-red border border-brand-red flex items-center justify-center font-bold text-white hover:bg-brand-dark transition-colors shadow-sm"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-brand-dark mb-4">Uniforme</h2>
                        <div
                            onClick={() => updateState('uniform', !state.uniform)}
                            className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white cursor-pointer hover:border-brand-red/50 transition-colors group"
                        >
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${state.uniform ? 'bg-brand-red border-brand-red' : 'border-slate-300 bg-white'}`}>
                                {state.uniform && <CheckCircle2 size={16} className="text-white" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-dark text-sm">Inclure Uniforme Complet</h3>
                                <p className="text-xs text-slate-500">Standard Exécutif (+ CHF 15/jour)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Hours Selection */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-brand-red" /> Heures par Jour
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { value: 4, label: '4 Heures', desc: 'Demi-journée' },
                        { value: 8, label: '8 Heures', desc: 'Heures de Bureau' },
                        { value: 12, label: '12 Heures', desc: 'Garde / Quart' },
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

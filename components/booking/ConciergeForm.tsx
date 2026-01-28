'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ConciergeBell,
    ShieldCheck,
    FileText,
    CheckCircle2,
    Clock,
    Languages,
    UserCheck,
    Briefcase
} from 'lucide-react';
import { Counter } from './ui/Counter';

interface ConciergeFormProps {
    onUpdate: (data: any) => void;
}

type ServiceType = 'reception' | 'security' | 'admin';
type ServiceLevel = 'standard' | 'premium';

export const ConciergeForm: React.FC<ConciergeFormProps> = ({ onUpdate }) => {
    const [state, setState] = useState({
        serviceType: 'reception' as ServiceType,
        serviceLevel: 'standard' as ServiceLevel,
        staffCount: 1,
        hoursPerDay: 4,
        languages: [] as string[],
        uniform: true,
    });

    const updateState = (field: string, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    const toggleLanguage = (lang: string) => {
        setState(prev => {
            const newLangs = prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang];
            return { ...prev, languages: newLangs };
        });
    };

    useEffect(() => {
        // Pricing Logic
        let baseRate = 0;

        // Base rate per hour per staff
        switch (state.serviceType) {
            case 'reception': baseRate = 45; break;
            case 'security': baseRate = 55; break;
            case 'admin': baseRate = 50; break;
        }

        // Premium multiplier (Bi-lingual, Senior staff)
        if (state.serviceLevel === 'premium') {
            baseRate *= 1.4;
        }

        // Language bonus (if standard)
        if (state.serviceLevel === 'standard' && state.languages.length > 1) {
            baseRate += 5; // Extra for languages in standard package
        }

        const total = baseRate * state.staffCount * state.hoursPerDay;

        const description = `Concierge (${state.serviceType === 'reception' ? 'Réception' : state.serviceType === 'security' ? 'Sécurité' : 'Administratif'}) - ${state.serviceLevel === 'standard' ? 'Standard' : 'Premium'}`;

        let details = description;
        details += `\n + ${state.staffCount} Professionnel${state.staffCount > 1 ? 's' : ''}`;
        details += `\n + ${state.hoursPerDay}h/jour`;
        if (state.languages.length > 0) details += `\n + Langues: ${state.languages.join(', ')}`;

        onUpdate({
            price: total,
            duration: state.hoursPerDay, // Should this be total man-hours or duration? usually duration of shift.
            serviceDetails: details,
            isValid: true
        });

    }, [state, onUpdate]);

    return (
        <div className="space-y-10 font-sans text-slate-800 animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-brand-dark mb-2">Configurez votre Concierge</h1>
                <p className="text-slate-500">Des professionnels formés pour élever le niveau de votre service.</p>
            </div>

            {/* 1. Service Type */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4">1. Quel est le profil du professionnel ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'reception', label: 'Réception', icon: ConciergeBell, desc: 'Accueil et Enregistrement' },
                        { id: 'security', label: 'Contrôle d\'Accès', icon: ShieldCheck, desc: 'Surveillance et Loge' },
                        { id: 'admin', label: 'Assistant Admin.', icon: FileText, desc: 'Back-office et Soutien' },
                    ].map((item) => {
                        const isSelected = state.serviceType === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => updateState('serviceType', item.id)}
                                className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 text-center ${isSelected
                                    ? 'border-brand-red bg-brand-red text-white shadow-lg'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50'
                                    }`}
                            >
                                <Icon size={28} className={isSelected ? 'text-white' : 'text-brand-red'} />
                                <div>
                                    <span className="font-bold block">{item.label}</span>
                                    <span className={`text-xs ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>{item.desc}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* 2. Service Level */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4">2. Niveau d'Expérience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => updateState('serviceLevel', 'standard')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${state.serviceLevel === 'standard'
                            ? 'border-brand-dark bg-brand-dark text-white'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg">Standard</span>
                            {state.serviceLevel === 'standard' && <CheckCircle2 size={20} className="text-brand-red" />}
                        </div>
                        <ul className={`text-sm space-y-1 ${state.serviceLevel === 'standard' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <li>• Heures de Bureau</li>
                            <li>• Uniforme Standard</li>
                            <li>• Formation de Base</li>
                        </ul>
                    </button>

                    <button
                        onClick={() => updateState('serviceLevel', 'premium')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${state.serviceLevel === 'premium'
                            ? 'border-brand-red bg-brand-red text-white'
                            : 'border-slate-200 bg-white hover:border-red-200'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg">Premium</span>
                            {state.serviceLevel === 'premium' && <CheckCircle2 size={20} className="text-white" />}
                        </div>
                        <ul className={`text-sm space-y-1 ${state.serviceLevel === 'premium' ? 'text-red-100' : 'text-gray-500'}`}>
                            <li>• Disponibilité Flexible</li>
                            <li>• Professionnels Bilingues</li>
                            <li>• Gestion de Crise</li>
                        </ul>
                    </button>
                </div>
            </section>

            {/* 3. Details (Staff & Hours) */}
            <section className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <UserCheck className="text-brand-red" size={20} />
                            Équipe
                        </h3>
                        <Counter
                            label={state.staffCount === 1 ? 'professionnel' : 'professionnels'}
                            value={state.staffCount}
                            onChange={(v) => updateState('staffCount', v)}
                            min={1}
                            max={10}
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Clock className="text-brand-red" size={20} />
                            Durée quotidienne
                        </h3>
                        <Counter
                            label="heures/jour"
                            value={state.hoursPerDay}
                            onChange={(v) => updateState('hoursPerDay', v)}
                            min={4}
                            max={12}
                        />
                    </div>
                </div>
            </section>

            {/* 4. Languages */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <Languages size={20} /> Langues Requises
                </h2>
                <div className="flex flex-wrap gap-3">
                    {['Français', 'Anglais', 'Allemand', 'Portugais', 'Espagnol'].map(lang => {
                        const isSelected = state.languages.includes(lang);
                        return (
                            <button
                                key={lang}
                                onClick={() => toggleLanguage(lang)}
                                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${isSelected
                                    ? 'bg-brand-dark text-white border-brand-dark'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {lang}
                            </button>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Building2,
    Factory,
    Store,
    CalendarDays,
    Ruler,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { PremiumSlider } from './ui/PremiumSlider';

interface CorporateCleaningFormProps {
    onUpdate: (data: any) => void;
}

type FacilityType = 'office' | 'industrial' | 'retail';
type FrequencyType = 'daily' | 'weekly' | 'biweekly';

export const CorporateCleaningForm: React.FC<CorporateCleaningFormProps> = ({ onUpdate }) => {
    const [state, setState] = useState({
        facilityType: 'office' as FacilityType,
        areaSize: 100, // m2
        frequency: 'weekly' as FrequencyType,
        shift: 'night', // or day
    });

    const updateState = (field: string, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        // Pricing Logic
        let baseRatePerSqm = 0;

        switch (state.facilityType) {
            case 'office': baseRatePerSqm = 3.5; break; // Easier to clean
            case 'industrial': baseRatePerSqm = 4.5; break; // Harder
            case 'retail': baseRatePerSqm = 4.0; break;
        }

        // Area Factor (Economy of scale)
        let areaMultiplier = 1;
        if (state.areaSize > 500) areaMultiplier = 0.9;
        if (state.areaSize > 2000) areaMultiplier = 0.8;

        // Frequency Multiplier (Monthly cost estimation)
        // Let's calculate price PRE-VISIT (per service) or MONTHLY? 
        // Usually booking flow shows 'per service' or 'estimated monthly'.
        // Let's stick to "Per Intervention" base price for consistency, or monthly estimate.
        // BookingForm expects a "price" which usually is the total.

        // Let's do Per Service Estimate
        let perServiceTotal = (baseRatePerSqm * state.areaSize * areaMultiplier);

        // Minimums
        if (perServiceTotal < 150) perServiceTotal = 150;

        const description = `Limpeza Industrial (${state.facilityType === 'office' ? 'Escritório' : state.facilityType === 'industrial' ? 'Industrial' : 'Varejo'})`;

        let details = description;
        details += `\n + Área: ${state.areaSize}m²`;
        details += `\n + Frequência: ${state.frequency === 'daily' ? 'Diária' : state.frequency === 'weekly' ? 'Semanal' : 'Quinzenal'}`;

        onUpdate({
            price: Math.round(perServiceTotal),
            duration: Math.max(2, Math.ceil(state.areaSize / 100)), // Crude estimate: 1h per 100m2
            serviceDetails: details,
            isValid: true
        });

    }, [state]); // onUpdate is stable enough or we don't want to re-trigger on its change

    return (
        <div className="space-y-10 font-sans text-slate-800 animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-brand-dark mb-2">Configure sua Limpeza</h1>
                <p className="text-slate-500">Soluções especializadas para grandes áreas e empresas.</p>
            </div>

            {/* 1. Facility Type */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4">1. Qual o tipo de ambiente?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'office', label: 'Corporativo', icon: Building2, desc: 'Escritórios e Sedes' },
                        { id: 'industrial', label: 'Industrial', icon: Factory, desc: 'Galpões e Fábricas' },
                        { id: 'retail', label: 'Varejo', icon: Store, desc: 'Lojas e Shoppings' },
                    ].map((item) => {
                        const isSelected = state.facilityType === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => updateState('facilityType', item.id)}
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

            {/* 2. Area Size */}
            <PremiumSlider
                label="Área Aproximada"
                description="Estimativa baseada na metragem"
                value={state.areaSize}
                min={50}
                max={5000}
                step={50}
                unit="m²"
                onChange={(val) => updateState('areaSize', val)}
                secondaryLabel={state.areaSize > 2000 ? (
                    'Grande Porte'
                ) : (
                    'Estimativa Padrão'
                )}
                minLabel="50 m²"
                maxLabel="5000 m² +"
            />
            {state.areaSize > 2000 && (
                <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm flex gap-2 items-start mt-[-20px] mx-4 relative z-10 font-medium">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    Para áreas muito grandes, recomendamos uma visita técnica GRATUITA para orçamento preciso.
                </div>
            )}

            {/* 3. Frequency */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    <CalendarDays size={20} /> Frequência Desejada
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'daily', label: 'Diária', desc: 'Segunda a Sexta' },
                        { id: 'biweekly', label: '2-3x / Semana', desc: 'Dias alternados' },
                        { id: 'weekly', label: 'Semanal', desc: '1x na semana' },
                    ].map((item) => {
                        const isSelected = state.frequency === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => updateState('frequency', item.id)}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${state.frequency === item.id
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

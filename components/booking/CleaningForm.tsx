'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Home,
    CheckCircle2,
    Info,
    Building2,
    Armchair,
    Shirt
} from 'lucide-react';
import { Counter } from './ui/Counter';

interface CleaningFormProps {
    showExtras?: boolean;
    onUpdate: (data: any) => void;
}

const EXTRAS_OPTIONS = [
    { id: 'fridge', label: 'Interior da geladeira', price: 30, duration: 0.5 },
    { id: 'cupboard', label: 'Int. de armário de cozinha', price: 50, duration: 1 },
    { id: 'window', label: 'Interior de janelas', price: 50, duration: 1 },
    { id: 'carpet', label: 'Aspirar Tapete ou Estofado', price: 30, duration: 0.5 },
    { id: 'outdoor', label: 'Área externa (até 20m²)', price: 60, duration: 1 },
    { id: 'ironing2h', label: 'Passadoria de roupas - 2h adicionais', price: 100, duration: 2 },
    { id: 'laundry', label: 'Lavar Roupas', price: 40, duration: 1 },
];

type ServiceCategory = 'standard' | 'heavy' | 'ironing';
type HeavyCleaningType = 'routine' | 'move' | 'construction';
type PropertyType = 'studio' | 'apartment' | 'house';

export const CleaningForm: React.FC<CleaningFormProps> = ({ onUpdate, showExtras = false }) => {
    const [state, setState] = useState({
        serviceCategory: 'standard' as ServiceCategory,
        heavyType: 'routine' as HeavyCleaningType,
        propertyType: 'apartment' as PropertyType,
        bedrooms: 1,
        bathrooms: 1,
        ironingHours: 2,
        extras: [] as string[],
        manualDuration: 0, // 0 means auto-calculated
    });

    // Calculate price and update parent
    useEffect(() => {
        let total = 0;
        let description = '';
        let duration = 0;
        let detailsText = '';

        if (state.serviceCategory === 'ironing') {
            // Ironing Logic (kept)
            const hourlyRate = 60;
            total = state.ironingHours * hourlyRate;
            duration = state.ironingHours;

            const minPieces = Math.floor(state.ironingHours * 8);
            const maxPieces = Math.floor(state.ironingHours * 12);

            description = `Passadoria`;
            detailsText = `Passadoria - ${state.ironingHours}h (Estimado ${minPieces}-${maxPieces} peças)`;
        } else {
            // Cleaning Logic
            let basePrice = 560;
            if (state.serviceCategory === 'heavy') basePrice = 640;
            if (state.serviceCategory === 'heavy') {
                if (state.heavyType === 'move') basePrice += 100;
                if (state.heavyType === 'construction') basePrice += 150;
            }

            if (state.propertyType === 'house') basePrice *= 1.3;

            const extraBedrooms = Math.max(0, state.bedrooms - 1);
            const extraBathrooms = Math.max(0, state.bathrooms - 1);

            const roomCost = (extraBedrooms * 60) + (extraBathrooms * 70);
            total = basePrice + roomCost;
            duration = 4 + extraBedrooms + extraBathrooms;

            description = `${state.serviceCategory === 'standard' ? 'Limpeza Padrão' :
                `Limpeza Pesada (${state.heavyType === 'routine' ? 'Rotina' : state.heavyType === 'move' ? 'Pré-mudança' : 'Pós-obra'})`} - ${state.propertyType === 'studio' ? 'Studio' : state.propertyType === 'apartment' ? 'Apartamento' : 'Casa'} (${state.bedrooms} quartos, ${state.bathrooms} banheiros)`;

            detailsText = description;
        }

        // Add Extras (Only if not ironing main service, though logic permits)
        if (state.extras.length > 0) {
            const selectedExtras = EXTRAS_OPTIONS.filter(e => state.extras.includes(e.id));
            const extrasCost = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
            const extrasDuration = selectedExtras.reduce((acc, curr) => acc + curr.duration, 0);

            total += extrasCost;
            duration += extrasDuration;

            const extrasLabels = selectedExtras.map(e => e.label).join(', ');
            detailsText += ` + Extras: ${extrasLabels}`;
        }

        // Manual Duration Override (if set and greater than auto)
        // Or if user strictly wants to set duration? 
        // The image shows "Ajuste de horas". Let's say manualDuration overrides if > 0.
        // But usually manual duration is an override of the total.
        // Let's treat manualDuration as the FINAL duration if set, otherwise use calculated.

        let finalDuration = duration;
        if (state.manualDuration > 0) {
            // Adjust price if manual duration is different?
            // Usually if user adds hours, price increases.
            // Rate for extra hour: R$ 50?
            const diff = state.manualDuration - duration;
            if (diff !== 0) {
                total += diff * 50; // Simple hourly adjustments
            }
            finalDuration = state.manualDuration;
        }

        onUpdate({
            price: total,
            duration: finalDuration,
            serviceDetails: detailsText,
            isIroning: state.serviceCategory === 'ironing', // Emit logic flag
            isValid: true
        });
    }, [state, onUpdate]);

    const updateState = (field: string, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    const toggleExtra = (id: string) => {
        setState(prev => {
            const newExtras = prev.extras.includes(id)
                ? prev.extras.filter(e => e !== id)
                : [...prev.extras, id];
            return { ...prev, extras: newExtras };
        });
    };

    // Compute current calculated duration for the "Ajuste de horas" default
    const getCalculatedDuration = () => {
        // Replicate logic just for display/init
        // This should only be called when serviceCategory is NOT ironing
        if (state.serviceCategory === 'ironing') return state.ironingHours;

        const extraBedrooms = Math.max(0, state.bedrooms - 1);
        const extraBathrooms = Math.max(0, state.bathrooms - 1);
        let d = 4 + extraBedrooms + extraBathrooms;
        const extrasDuration = EXTRAS_OPTIONS.filter(e => state.extras.includes(e.id)).reduce((a, b) => a + b.duration, 0);
        return d + extrasDuration;
    };

    // Initialize manualDuration on first extras view?
    // Actually, stick to: if manualDuration == 0, show calculated.
    const currentDuration = state.manualDuration > 0 ? state.manualDuration : getCalculatedDuration();

    if (showExtras) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Itens opcionais</h2>
                    <p className="text-slate-500">Personalize sua diária com itens opcionais.</p>
                    <button className="text-brand-red text-sm font-semibold mt-1">O que está incluso?</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {EXTRAS_OPTIONS.map((extra) => {
                        const isSelected = state.extras.includes(extra.id);
                        return (
                            <button
                                key={extra.id}
                                onClick={() => toggleExtra(extra.id)}
                                className={`p-4 text-left rounded-lg border flex items-center gap-3 transition-all ${isSelected
                                    ? 'bg-brand-cream border-brand-red text-brand-dark'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-brand-red/30'
                                    }`}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-brand-red border-brand-red' : 'border-slate-300 bg-white'
                                    }`}>
                                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                                </div>
                                <span className="text-sm font-medium">{extra.label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-brand-dark mb-4">Ajuste de horas</h3>
                    <div className="flex items-center gap-4">
                        <Counter
                            label={currentDuration === 1 ? 'hora' : 'horas'}
                            value={currentDuration}
                            min={2}
                            max={12}
                            onChange={(v) => updateState('manualDuration', v)}
                        />

                        {currentDuration >= 9 && (
                            <div className="bg-purple-600 text-white text-xs p-3 rounded-xl relative ml-2 max-w-xs shadow-lg">
                                <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-purple-600"></div>
                                {currentDuration} horas é bastante tempo, então você será atendido por <b>2 profissionais</b> e a diária será realizada em {currentDuration / 2}h.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Default View (Config)
    return (
        <div className="space-y-10 font-sans text-slate-800">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold text-brand-dark mb-2">Configure sua Limpeza</h1>
                <p className="text-slate-500">Personalize cada detalhe do serviço em poucos cliques.</p>
            </div>

            {/* ... Rest of Main Form (Service Selection, Property, Rooms) ... */}
            {/* 1. Escolha um serviço */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    1. Tipo de Limpeza
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'standard', label: 'Padrão', badge: 'MAIS PEDIDO', icon: Sparkles },
                        { id: 'heavy', label: 'Pesada', icon: CheckCircle2 },
                        { id: 'ironing', label: 'Passadoria', icon: Shirt },
                    ].map((item) => {
                        const isSelected = state.serviceCategory === item.id;
                        const Icon = item.icon;
                        return (
                            <div key={item.id} className="relative">
                                {item.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full z-10 tracking-wide shadow-sm">
                                        {item.badge}
                                    </div>
                                )}
                                <button
                                    onClick={() => updateState('serviceCategory', item.id)}
                                    className={`w-full h-full p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 relative overflow-hidden group ${isSelected
                                        ? 'border-brand-red bg-brand-red text-white shadow-lg'
                                        : 'border-slate-200 bg-white text-slate-500 hover:border-red-200 hover:bg-red-50'
                                        }`}
                                    type="button"
                                >
                                    <Icon size={24} className={isSelected ? 'text-white' : 'text-brand-red'} />
                                    <span className="font-semibold text-sm md:text-base">{item.label}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 2. Sub-Opções (Conditional for Heavy) */}
            <AnimatePresence>
                {state.serviceCategory === 'heavy' && (
                    <motion.section
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Qual finalidade?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'routine', label: 'Rotina' },
                                { id: 'move', label: 'Pré-mudança', badge: 'PRODUTOS INCLUSOS' },
                                { id: 'construction', label: 'Pós-obra', badge: 'PRODUTOS INCLUSOS' },
                            ].map((sub) => {
                                const isSelected = state.heavyType === sub.id;
                                return (
                                    <div key={sub.id} className="relative mt-2">
                                        {sub.badge && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 whitespace-nowrap">
                                                {sub.badge}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => updateState('heavyType', sub.id)}
                                            className={`w-full p-4 rounded-xl border transition-all duration-200 text-sm font-semibold flex items-center justify-center gap-2 ${isSelected
                                                ? 'border-brand-red bg-white text-brand-red'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                                }`}
                                            type="button"
                                        >
                                            {isSelected && <CheckCircle2 size={16} />}
                                            {sub.label}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-3 flex items-start gap-2 text-sm text-brand-dark bg-brand-cream p-3 rounded-lg border border-brand-red/10">
                            <Info size={18} className="shrink-0 mt-0.5 text-brand-red" />
                            <p>A limpeza pesada é ideal para limpezas profundas, mudanças ou pós-obras. Inclui vidros e parte interna de móveis (se vazios).</p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* 3. Ironing Specific UI */}
            <AnimatePresence>
                {state.serviceCategory === 'ironing' && (
                    <motion.section
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center space-y-6">
                            <h2 className="text-xl font-bold text-brand-dark">Quantas horas de serviço?</h2>

                            <div className="flex justify-center">
                                <Counter
                                    label="horas"
                                    value={state.ironingHours}
                                    onChange={(v) => updateState('ironingHours', v)}
                                    min={2}
                                    max={8}
                                />
                            </div>

                            {/* Suggestion Bubble */}
                            <div className="relative inline-block max-w-md w-full">
                                {/* Triangle arrow */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-50 border-t border-l border-red-100 rotate-45 rounded-[2px]" />

                                <div className="relative bg-red-50 border border-red-100 text-red-900 p-4 rounded-xl shadow-lg shadow-red-100/50">
                                    <h3 className="font-bold text-lg mb-1">
                                        Sugestão para {state.ironingHours * 8} - {state.ironingHours * 12} peças
                                    </h3>
                                    <p className="text-red-700/80 text-sm leading-relaxed">
                                        Cálculo com base em peças comuns (calças jeans, camisetas).
                                        Para peças mais delicadas (vestidos, camisas sociais), aumente o número de horas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* 4. Property Type & Counters (Only for Standard/Heavy) */}
            {state.serviceCategory !== 'ironing' && (
                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Como é o imóvel?</h2>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { id: 'studio', label: 'Studio', icon: Armchair },
                            { id: 'apartment', label: 'Apartamento', icon: Building2 },
                            { id: 'house', label: 'Casa', icon: Home },
                        ].map((prop) => {
                            const isSelected = state.propertyType === prop.id;
                            const Icon = prop.icon;
                            return (
                                <button
                                    key={prop.id}
                                    onClick={() => updateState('propertyType', prop.id)}
                                    className={`h-14 rounded-lg border font-medium text-sm transition-all flex items-center justify-center gap-2 ${isSelected
                                        ? 'bg-brand-red border-brand-red text-white shadow-md'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                    type="button"
                                >
                                    <Icon size={18} className={isSelected ? 'opacity-100' : 'opacity-50'} />
                                    <span className="hidden sm:inline">{prop.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Counters */}
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center">
                            <Counter
                                label={state.bedrooms === 1 ? 'quarto' : 'quartos'}
                                value={state.bedrooms}
                                onChange={(v) => updateState('bedrooms', v)}
                            />
                            <div className="hidden md:block w-px h-12 bg-slate-100"></div>
                            <Counter
                                label={state.bathrooms === 1 ? 'banheiro' : 'banheiros'}
                                value={state.bathrooms}
                                onChange={(v) => updateState('bathrooms', v)}
                                min={1}
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50/50 py-2 rounded-lg border border-green-100/50">
                            <CheckCircle2 size={16} />
                            <span>Cozinha e sala já estão inclusos no valor.</span>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};


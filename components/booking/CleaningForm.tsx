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
    { id: 'fridge', label: 'Intérieur du réfrigérateur', price: 30, duration: 0.5 },
    { id: 'cupboard', label: 'Int. des placards de cuisine', price: 50, duration: 1 },
    { id: 'window', label: 'Intérieur des fenêtres', price: 50, duration: 1 },
    { id: 'carpet', label: 'Aspirer Tapis ou Canapé', price: 30, duration: 0.5 },
    { id: 'outdoor', label: 'Zone extérieure (jusqu\'à 20m²)', price: 60, duration: 1 },
    { id: 'ironing2h', label: 'Repassage - 2h supplémentaires', price: 100, duration: 2 },
    { id: 'laundry', label: 'Laver le Linge', price: 40, duration: 1 },
];

const CANTON_FEES: Record<string, number> = {
    'geneve': 30,
    'vaud': 70,
    'fribourg': 80,
    'neuchatel': 100,
    'valais': 100,
    'jura': 120
};

type ServiceCategory = 'standard' | 'heavy' | 'ironing';
type HeavyCleaningType = 'routine' | 'move' | 'construction';
type PropertyType = 'studio' | 'apartment' | 'house';

export const CleaningForm: React.FC<CleaningFormProps> = ({ onUpdate, showExtras = false }) => {
    const [state, setState] = useState({
        serviceCategory: 'standard' as ServiceCategory,
        heavyType: 'routine' as HeavyCleaningType,
        propertyType: 'studio' as PropertyType,
        bedrooms: 1,
        bathrooms: 1,
        ironingHours: 2,
        canton: 'geneve',
        extras: [] as string[],
        manualDuration: 0, // 0 means auto-calculated
    });

    // Calculate price and update parent
    useEffect(() => {
        let total = 0;
        let description = '';
        let duration = 0;
        let detailsText = '';

        // Add Canton Fee
        const displacementFee = CANTON_FEES[state.canton] || 0;
        total += displacementFee;

        if (state.serviceCategory === 'ironing') {
            // Ironing Logic (kept)
            const hourlyRate = 60;
            total += state.ironingHours * hourlyRate; // Add to existing total (displacement)
            duration = state.ironingHours;

            const minPieces = Math.floor(state.ironingHours * 8);
            const maxPieces = Math.floor(state.ironingHours * 12);

            description = `Repassage`;
            detailsText = `Repassage - ${state.ironingHours}h (Estimé ${minPieces}-${maxPieces} pièces)`;
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
            total += basePrice + roomCost; // Add to existing total (displacement)
            duration = 4 + extraBedrooms + extraBathrooms;

            description = `${state.serviceCategory === 'standard' ? 'Nettoyage Standard' :
                `Grand Nettoyage (${state.heavyType === 'routine' ? 'Routine' : state.heavyType === 'move' ? 'Déménagement' : 'Fin de chantier'})`} - ${state.propertyType === 'studio' ? 'Studio' : state.propertyType === 'apartment' ? 'Appartement' : 'Maison'} (${state.bedrooms} chambres, ${state.bathrooms} bains)`;

            detailsText = description;
        }

        // Add Displacement Fee to details
        if (displacementFee > 0) {
            detailsText += ` + Déplacement (${state.canton.charAt(0).toUpperCase() + state.canton.slice(1)}): CHF ${displacementFee}`;
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

        // Manual Duration Override (cannot be less than calculated)
        let finalDuration = Math.max(duration, state.manualDuration);

        // Only charge for ADDED hours (cannot reduce price below calculated)
        const addedHours = Math.max(0, finalDuration - duration);
        if (addedHours > 0) {
            total += addedHours * 50; // CHF 50 per extra hour
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

    // Current duration is the greater of manual (if set) or calculated
    const calculatedDuration = getCalculatedDuration();
    const currentDuration = state.manualDuration > 0
        ? Math.max(state.manualDuration, calculatedDuration)
        : calculatedDuration;

    if (showExtras) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Options supplémentaires</h2>
                    <p className="text-slate-500">Personnalisez votre service avec des options.</p>
                    <button className="text-brand-red text-sm font-semibold mt-1">Ce qui est inclus ?</button>
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
                    <h3 className="font-bold text-brand-dark mb-4">Ajustement des heures</h3>
                    <div className="flex items-center gap-4">
                        <Counter
                            label={currentDuration === 1 ? 'heure' : 'heures'}
                            value={currentDuration}
                            min={calculatedDuration}
                            max={12}
                            onChange={(v) => updateState('manualDuration', v)}
                        />

                        {currentDuration >= 9 && (
                            <div className="bg-purple-600 text-white text-xs p-3 rounded-xl relative ml-2 max-w-xs shadow-lg">
                                <div className="absolute left-0 top-1/2 -translate-x-1.5 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-purple-600"></div>
                                {currentDuration} heures est une longue durée, vous serez donc servi par <b>2 professionnels</b> et le service sera réalisé en {currentDuration / 2}h.
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
                <h1 className="text-3xl font-display font-bold text-brand-dark mb-2">Configurez votre Nettoyage</h1>
                <p className="text-slate-500">Personnalisez chaque détail en quelques clics.</p>
            </div>

            {/* ... Rest of Main Form (Service Selection, Property, Rooms) ... */}
            {/* 1. Escolha um serviço */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2">
                    1. Type de Nettoyage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { id: 'standard', label: 'Standard', badge: 'LE PLUS POPULAIRE', icon: Sparkles },
                        { id: 'heavy', label: 'Grand Nettoyage', icon: CheckCircle2 },
                        { id: 'ironing', label: 'Repassage', icon: Shirt },
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
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Quel objectif ?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'routine', label: 'Routine' },
                                { id: 'move', label: 'Déménagement', badge: 'PRODUITS INCLUS' },
                                { id: 'construction', label: 'Fin de chantier', badge: 'PRODUITS INCLUS' },
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
                            <p>Le grand nettoyage est idéal pour les nettoyages en profondeur, déménagements ou fins de chantier. Comprend les vitres et l'intérieur des meubles (si vides).</p>
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
                            <h2 className="text-xl font-bold text-brand-dark">Combien d'heures de service ?</h2>

                            <div className="flex justify-center">
                                <Counter
                                    label="heures"
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
                                        Suggestion pour {state.ironingHours * 8} - {state.ironingHours * 12} pièces
                                    </h3>
                                    <p className="text-red-700/80 text-sm leading-relaxed">
                                        Calcul basé sur des pièces courantes (jeans, t-shirts).
                                        Pour des pièces plus délicates (robes, chemises), augmentez le nombre d'heures.
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
                    <h2 className="text-lg font-bold text-slate-800 mb-4">Quel type de propriété ?</h2>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                            { id: 'studio', label: 'Studio', icon: Armchair },
                            { id: 'apartment', label: 'Appartement', icon: Building2 },
                            { id: 'house', label: 'Maison', icon: Home },
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
                                label={state.bedrooms === 1 ? 'chambre' : 'chambres'}
                                value={state.bedrooms}
                                onChange={(v) => updateState('bedrooms', v)}
                            />
                            <div className="hidden md:block w-px h-12 bg-slate-100"></div>
                            <Counter
                                label={state.bathrooms === 1 ? 'salle de bain' : 'salles de bain'}
                                value={state.bathrooms}
                                onChange={(v) => updateState('bathrooms', v)}
                                min={1}
                            />
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50/50 py-2 rounded-lg border border-green-100/50">
                                <CheckCircle2 size={16} />
                                <span className="text-center font-medium">
                                    {state.propertyType === 'studio'
                                        ? 'Cuisine incluse'
                                        : 'Cuisine et salon'}
                                </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50/50 py-2 rounded-lg border border-green-100/50">
                                <CheckCircle2 size={16} />
                                <span className="text-center font-medium">Produits inclus</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-green-700 bg-green-50/50 py-2 rounded-lg border border-green-100/50">
                                <CheckCircle2 size={16} />
                                <span className="text-center font-medium">Assurance incluse</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Canton Selection */}
            <section>
                <h2 className="text-lg font-bold text-brand-dark mb-4">Où aura lieu le service ?</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    {[
                        { id: 'geneve', label: 'Genève', image: '/images/cantons/geneve-v2.webp' },
                        { id: 'vaud', label: 'Vaud (Lausanne)', image: '/images/cantons/vaud-v2.webp' },
                        { id: 'fribourg', label: 'Fribourg', image: '/images/cantons/fribourg-v2.jpeg' },
                        { id: 'neuchatel', label: 'Neuchâtel', image: '/images/cantons/neuchatel-v2.jpg' },
                        { id: 'valais', label: 'Valais (Sion)', image: '/images/cantons/valais-v2.jpg' },
                        { id: 'jura', label: 'Jura', image: '/images/cantons/jura-v2.jpg' },
                    ].map((canton) => {
                        const isSelected = state.canton === canton.id;
                        return (
                            <button
                                key={canton.id}
                                onClick={() => updateState('canton', canton.id)}
                                className={`relative group overflow-hidden rounded-xl border-2 transition-all duration-300 aspect-[4/3] ${isSelected
                                    ? 'border-brand-red ring-2 ring-brand-red/30'
                                    : 'border-transparent hover:border-brand-red/50'
                                    }`}
                            >
                                <img
                                    src={canton.image}
                                    alt={canton.label}
                                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isSelected ? 'scale-110' : 'group-hover:scale-110'
                                        }`}
                                />
                                <div className={`absolute inset-0 transition-colors duration-300 ${isSelected ? 'bg-black/40' : 'bg-black/20 group-hover:bg-black/40'
                                    }`} />
                                <div className="absolute inset-0 flex items-center justify-center p-2">
                                    <span className="text-white font-bold text-sm drop-shadow-md tracking-wide text-center">{canton.label}</span>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-2 right-2 bg-brand-red text-white p-1 rounded-full shadow-sm">
                                        <CheckCircle2 size={14} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};


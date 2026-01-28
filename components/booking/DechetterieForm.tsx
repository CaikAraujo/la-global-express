'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    Recycle,
    Leaf,
    Hammer,
    Truck,
    BoxSelect,
    AlertTriangle,
    CheckCircle2,
    Info,
    ArrowRight
} from 'lucide-react';
import { PremiumSlider } from './ui/PremiumSlider';

interface DechetterieFormProps {
    onUpdate: (data: any) => void;
}

type WasteType = 'construction' | 'furniture' | 'green' | 'general';
type AccessType = 'easy' | 'hard';

export const DechetterieForm: React.FC<DechetterieFormProps> = ({ onUpdate }) => {
    const [state, setState] = useState({
        wasteType: 'general' as WasteType,
        volume: 3, // m3
        access: 'easy' as AccessType,
        heavyItems: false,
    });

    const updateState = (field: string, value: any) => {
        setState(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        let total = 80;
        let ratePerM3 = 0;
        switch (state.wasteType) {
            case 'construction': ratePerM3 = 90; break;
            case 'furniture': ratePerM3 = 60; break;
            case 'green': ratePerM3 = 45; break;
            case 'general': ratePerM3 = 70; break;
        }

        total += (ratePerM3 * state.volume);
        if (state.access === 'hard') total += 50;
        if (state.heavyItems) total += 80;

        const getDescription = () => {
            switch (state.wasteType) {
                case 'construction': return 'Gravats de Chantier';
                case 'furniture': return 'Meubles & Encombrants';
                case 'green': return 'Déchets Verts';
                default: return 'Déchets Généraux';
            }
        };

        let details = `Déchetterie - ${getDescription()}`;
        details += `\nVolume: ${state.volume}m³`;
        details += `\nAccès: ${state.access === 'easy' ? 'Facile' : 'Difficile'}`;

        onUpdate({
            price: total,
            duration: Math.max(1, Math.ceil(state.volume / 2)),
            serviceDetails: details,
            isValid: true
        });

    }, [state]); // onUpdate excluded to avoid loop

    // Helpers for visual feedback
    const getVehicleIcon = (vol: number) => {
        if (vol <= 3) return { icon: Truck, label: 'Petite Camionnette' };
        if (vol <= 10) return { icon: Truck, label: 'Camion Moyen' };
        return { icon: Truck, label: 'Grand Camion / Benne' };
    };

    const volumeInfo = getVehicleIcon(state.volume);

    return (
        <div className="space-y-8 font-sans text-slate-800">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-red/5 to-white p-6 rounded-2xl border border-brand-red/10">
                <h1 className="text-2xl font-display font-bold text-brand-dark mb-2 flex items-center gap-3">
                    <Trash2 className="text-brand-red" size={28} />
                    Collecte et Déchetterie
                </h1>
                <p className="text-slate-600">
                    Sélectionnez le type de matériau et le volume estimé. Nous nous occupons du transport et de l'élimination certifiée.
                </p>
            </div>

            {/* 1. Waste Type Selection */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-brand-dark">1. Que devons-nous retirer ?</h2>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-500 font-medium">Obligatoire</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: 'general', label: 'Général / Mélangé', icon: Trash2, desc: 'Sacs noirs, nettoyage général, bureau', color: 'bg-blue-50 border-blue-200 text-blue-600' },
                        { id: 'furniture', label: 'Meubles Anciens', icon: BoxSelect, desc: 'Canapés, matelas, armoires démontées', color: 'bg-amber-50 border-amber-200 text-amber-600' },
                        { id: 'construction', label: 'Gravats / Chantier', icon: Hammer, desc: 'Briques, carrelage, bois, plâtre', color: 'bg-stone-100 border-stone-200 text-stone-600' },
                        { id: 'green', label: 'Vert / Jardin', icon: Leaf, desc: 'Tailles, gazon, petites branches', color: 'bg-green-50 border-green-200 text-green-600' },
                    ].map((item) => {
                        const isSelected = state.wasteType === item.id;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => updateState('wasteType', item.id)}
                                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 overflow-hidden group ${isSelected
                                    ? 'border-brand-red shadow-md ring-1 ring-brand-red bg-white'
                                    : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl transition-colors ${isSelected ? 'bg-brand-red text-white' : item.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-base mb-1 ${isSelected ? 'text-brand-dark' : 'text-slate-700'}`}>
                                            {item.label}
                                        </h3>
                                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
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



            {/* 2. Volume Slider (Visual) */}
            <PremiumSlider
                label="Estimation du Volume"
                description="Glissez pour ajuster la quantité"
                value={state.volume}
                min={1}
                max={30}
                step={0.5}
                unit="m³"
                onChange={(val) => updateState('volume', val)}
                secondaryLabel={`~ ${volumeInfo.label}`}
                minLabel="1 m³"
                maxLabel="30 m³"
            />

            {/* 3. Logistics & Warnings */}
            <section className="bg-slate-50 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-brand-dark mb-4">Détails de l'Accès</h2>

                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <button
                            onClick={() => updateState('access', 'easy')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold border transition-all ${state.access === 'easy'
                                ? 'bg-white border-brand-green text-brand-green shadow-sm ring-1 ring-brand-green'
                                : 'bg-transparent border-slate-300 text-slate-500 hover:bg-white'
                                }`}
                        >
                            Accès Facile / Rez-de-chaussée
                        </button>
                        <button
                            onClick={() => updateState('access', 'hard')}
                            className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold border transition-all ${state.access === 'hard'
                                ? 'bg-white border-brand-red text-brand-red shadow-sm ring-1 ring-brand-red'
                                : 'bg-transparent border-slate-300 text-slate-500 hover:bg-white'
                                }`}
                        >
                            Difficile / Escaliers
                        </button>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${state.heavyItems ? 'bg-brand-red border-brand-red' : 'border-slate-300 bg-white'
                            }`}>
                            {state.heavyItems && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={state.heavyItems}
                            onChange={(e) => updateState('heavyItems', e.target.checked)}
                        />
                        <div>
                            <span className={`block font-bold text-sm transition-colors ${state.heavyItems ? 'text-brand-dark' : 'text-slate-600'}`}>
                                Objets Lourds ou Spéciaux
                            </span>
                            <span className="text-xs text-slate-500">
                                Cochez si coffres-forts, pianos, serveurs ou machines lourdes.
                            </span>
                        </div>
                    </label>
                </div>
            </section>
        </div>
    );
};

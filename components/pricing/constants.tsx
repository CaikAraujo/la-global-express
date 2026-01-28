import { Plan } from './types';
import React from 'react';
import { Check, X, Star, Shield, Zap, Crown } from 'lucide-react';

export const PLANS: Plan[] = [
    {
        id: 'essential',
        name: 'Essential',
        description: 'Pour un entretien basique hebdomadaire de résidences compactes et studios.',
        priceMonthly: 500,
        priceYearly: 450,
        features: [
            { name: '4 Visites Mensuelles', included: true },
            { name: 'Nettoyage Standard', included: true },
            { name: 'Produits Inclus', included: true },
            { name: 'Repassage', included: false },
            { name: 'Gestionnaire Dédié', included: false },
        ],
        cta: 'Sélectionner',
        theme: 'light'
    },
    {
        id: 'premium',
        name: 'Premium Swiss',
        description: 'Soin complet pour résidences et bureaux de taille moyenne.',
        priceMonthly: 1200,
        priceYearly: 1080,
        isRecommended: true,
        features: [
            { name: '8 Visites Mensuelles', included: true },
            { name: 'Nettoyage en Profondeur', included: true, tooltip: 'Inclut vitres et tissus' },
            { name: 'Repassage Premium', included: true },
            { name: 'Produits Écologiques', included: true },
            { name: 'Maintenance Bâtiment Légère', included: true },
        ],
        cta: 'S\'abonner Maintenant',
        theme: 'dark'
    },
    {
        id: 'elite',
        name: 'Global Elite',
        description: 'Gestion totale de facilities avec concierge dédié 24/7.',
        priceMonthly: null, // "Sob Consulta"
        priceYearly: null,
        features: [
            { name: 'Visites Illimitées', included: true },
            { name: 'Équipe Fixe & Vérifiée', included: true },
            { name: 'Maintenance Bâtiment Complète', included: true },
            { name: 'Gestionnaire de Compte Exclusif', included: true },
            { name: 'Conciergerie Lifestyle', included: true },
        ],
        cta: 'Contacter',
        theme: 'gold'
    }
];

export const ICONS = {
    Check: <Check className="w-5 h-5 text-green-500" />,
    X: <X className="w-5 h-5 text-gray-300" />,
    Star: <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />,
    Shield: <Shield className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Crown: <Crown className="w-6 h-6" />
};

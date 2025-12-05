import { Plan } from './types';
import React from 'react';
import { Check, X, Star, Shield, Zap, Crown } from 'lucide-react';

export const PLANS: Plan[] = [
    {
        id: 'essential',
        name: 'Essential',
        description: 'Para manutenção básica semanal de residências compactas e estúdios.',
        priceMonthly: 500,
        priceYearly: 450,
        features: [
            { name: '4 Visitas Mensais', included: true },
            { name: 'Limpeza Padrão', included: true },
            { name: 'Produtos Inclusos', included: true },
            { name: 'Passadoria', included: false },
            { name: 'Gestor Dedicado', included: false },
        ],
        cta: 'Selecionar',
        theme: 'light'
    },
    {
        id: 'premium',
        name: 'Premium Swiss',
        description: 'Cuidado completo para residências e escritórios de médio porte.',
        priceMonthly: 1200,
        priceYearly: 1080,
        isRecommended: true,
        features: [
            { name: '8 Visitas Mensais', included: true },
            { name: 'Limpeza Profunda', included: true, tooltip: 'Inclui janelas e estofados' },
            { name: 'Passadoria Premium', included: true },
            { name: 'Produtos Ecológicos', included: true },
            { name: 'Manutenção Predial Leve', included: true },
        ],
        cta: 'Assinar Agora',
        theme: 'dark'
    },
    {
        id: 'elite',
        name: 'Global Elite',
        description: 'Gestão total de facilities com concierge dedicado 24/7.',
        priceMonthly: null, // "Sob Consulta"
        priceYearly: null,
        features: [
            { name: 'Visitas Ilimitadas', included: true },
            { name: 'Equipe Fixa & Verificada', included: true },
            { name: 'Manutenção Predial Completa', included: true },
            { name: 'Gestor de Conta Exclusive', included: true },
            { name: 'Concierge Lifestyle', included: true },
        ],
        cta: 'Contatar',
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

import React from 'react';
import { Plan } from './types';
import { ICONS } from './constants';

interface PricingCardProps {
    plan: Plan;
    isYearly: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly }) => {
    const isDark = plan.theme === 'dark';
    const isGold = plan.theme === 'gold';

    // Base classes for the card container
    const containerClasses = `
    relative flex flex-col p-8 rounded-2xl transition-all duration-500
    ${isDark
            ? 'bg-brand-dark text-white shadow-2xl scale-105 z-10 border border-white/10 ring-1 ring-white/5'
            : 'bg-white text-gray-800 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1'
        }
    ${isGold ? 'border-brand-gold/20 bg-gradient-to-br from-white to-orange-50/50' : ''}
  `;

    const price = isYearly && plan.priceYearly ? plan.priceYearly : plan.priceMonthly;

    return (
        <div className={containerClasses}>
            {plan.isRecommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-red text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Recommandé
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h3 className={`text-2xl font-serif font-semibold mb-2 ${isGold ? 'text-brand-dark' : 'inherit'}`}>
                    {plan.name}
                    {isGold && <span className="ml-2 inline-block text-brand-gold">✦</span>}
                </h3>
                <p className={`text-sm font-sans leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {plan.description}
                </p>
            </div>

            {/* Price */}
            <div className="mb-8 font-sans">
                {price !== null ? (
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm font-medium text-gray-400">CHF</span>
                        <span className={`text-5xl font-light tracking-tight ${isDark ? 'text-white' : 'text-brand-dark'}`}>
                            {price.toLocaleString('fr-CH')}
                        </span>
                        <span className="text-sm text-gray-400">/mois</span>
                    </div>
                ) : (
                    <div className="flex items-baseline gap-1">
                        <span className={`text-4xl font-light tracking-tight ${isDark ? 'text-white' : 'text-brand-dark'}`}>
                            Sur Devis
                        </span>
                    </div>
                )}
                {isYearly && price !== null && (
                    <p className="text-xs text-brand-red mt-2 font-medium">Facturé annuellement (Économie de 10%)</p>
                )}
            </div>

            {/* Divider */}
            <div className={`h-px w-full mb-8 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`} />

            {/* Features */}
            <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 flex-shrink-0 ${isDark ? 'text-brand-red' : 'text-brand-red'}`}>
                            {feature.included ? ICONS.Check : ICONS.X}
                        </div>
                        <span className={`text-sm font-sans ${!feature.included
                            ? 'text-gray-400 line-through decoration-gray-300 decoration-1'
                            : isDark ? 'text-gray-300' : 'text-gray-600'
                            }`}>
                            {feature.name}
                            {feature.tooltip && (
                                <span className="ml-1 text-xs text-gray-400 block sm:inline sm:ml-2">({feature.tooltip})</span>
                            )}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <button className={`
        w-full py-4 px-6 rounded-lg font-bold text-sm tracking-wider uppercase transition-all duration-300
        ${isDark
                    ? 'bg-brand-red hover:bg-red-700 text-white shadow-lg shadow-red-900/20'
                    : isGold
                        ? 'bg-brand-dark hover:bg-gray-800 text-white'
                        : 'bg-gray-50 hover:bg-gray-100 text-brand-dark border border-gray-200'
                }
      `}>
                {plan.cta}
            </button>
        </div>
    );
};

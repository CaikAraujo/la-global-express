import React from 'react';
import { useTranslations } from 'next-intl';

export const Stats: React.FC = () => {
    const t = useTranslations('Stats');

    return (
        <section className="bg-brand-dark text-white py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <p className="text-4xl font-display font-bold text-brand-red">14+</p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">{t('history')}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-display font-bold text-white">3</p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">{t('continents')}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-display font-bold text-white">200+</p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">{t('projects')}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl font-display font-bold text-brand-red">100%</p>
                        <p className="text-sm text-gray-400 uppercase tracking-widest">{t('precision')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

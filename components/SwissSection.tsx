'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import { FeatureCard } from './swiss/FeatureCard';
import { FEATURES } from './swiss/constants';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const SwissSection: React.FC = () => {
    const t = useTranslations('SwissSection');

    // We can map over the FEATURES constant but override titles/descriptions with translations
    // Or we can rebuild the features array from translations entirely.
    // Given FeatureCard expects a 'feature' object with specific props, let's map.

    // However, the FeatureCard likely renders feature.title directly. 
    // We should pass the translated Strings to FeatureCard or update FeatureCard to translate based on ID.
    // For now, let's map the existing features structure but inject translated text.

    const translatedFeatures = FEATURES.map(feature => {
        // Map feature.id to keys: '1' -> 'punctuality', '2' -> 'excellence', '3' -> 'discretion', '4' -> 'guarantee'
        let key = '';
        switch (feature.id) {
            case '1': key = 'punctuality'; break;
            case '2': key = 'excellence'; break;
            case '3': key = 'discretion'; break;
            case '4': key = 'guarantee'; break;
            default: key = '';
        }

        return {
            ...feature,
            title: key ? t(`features.${key}.title`) : feature.title,
            description: key ? t(`features.${key}.description`) : feature.description
        };
    });

    return (
        <section className="relative w-full bg-brand-dark py-32 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.07] pointer-events-none" />

            {/* Gradient Overlay for Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block py-1 px-3 border border-brand-red/30 bg-brand-red/10 text-brand-red text-[10px] font-bold tracking-[0.2em] uppercase mb-6 rounded-sm">
                                {t('badge')}
                            </span>
                            <h2 className="text-4xl md:text-6xl text-white font-display font-medium leading-[1.1] tracking-tight">
                                {t.rich('title', {
                                    muted: (chunks) => <span className="text-neutral-500">{chunks}</span>,
                                    br: () => <br />
                                })}
                            </h2>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="pl-8"
                        >
                            <p className="text-neutral-400 font-sans text-lg leading-relaxed mb-6">
                                {t('description')}
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-widest uppercase hover:text-brand-red transition-colors group">
                                {t('cta')}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {translatedFeatures.map((feature, index) => (
                        <FeatureCard key={feature.id} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SwissSection;

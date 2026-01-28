'use client';

import React, { useEffect, useRef } from 'react';
import { Users, UserCheck, Coffee, Globe } from 'lucide-react';

import { useTranslations } from 'next-intl';

const OfficeHospitality = () => {
    const t = useTranslations('Corporate.hospitality');
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.15 } // Trigger when 15% visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-brand-dark text-white relative overflow-hidden group-viewport">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red rounded-full opacity-5 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content */}
                    <div className="order-2 lg:order-1">
                        <div className="clip-path-reveal">
                            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-xs font-medium text-white/80 mb-6 bg-white/5 backdrop-blur-sm">
                                <Users className="w-3 h-3 text-brand-red" />
                                <span>{t('badge')}</span>
                            </div>

                            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6">
                                {t.rich('title', {
                                    highlight: (chunks) => <span className="text-brand-red">{chunks}</span>
                                })}
                            </h2>

                            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                                {t('description')}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Feature 1 */}
                            <div className="flex gap-4 group stagger-item">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                                    <UserCheck className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 group-hover:text-brand-red transition-colors duration-300">{t('features.concierge.title')}</h4>
                                    <p className="text-sm text-gray-500">{t('features.concierge.desc')}</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex gap-4 group stagger-item">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                                    <Coffee className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 group-hover:text-brand-red transition-colors duration-300">{t('features.pantry.title')}</h4>
                                    <p className="text-sm text-gray-500">{t('features.pantry.desc')}</p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex gap-4 group stagger-item">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-red group-hover:border-brand-red transition-all duration-300">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 group-hover:text-brand-red transition-colors duration-300">{t('features.events.title')}</h4>
                                    <p className="text-sm text-gray-500">{t('features.events.desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="order-1 lg:order-2 relative group overflow-hidden rounded-sm">
                        <div className="relative aspect-[4/5] lg:aspect-square overflow-hidden bg-gray-900">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                                alt="Premium Concierge Service"
                                loading="lazy"
                                className="w-full h-full object-cover scale-image-reveal group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out"
                            />

                            {/* Overlay Card - Also staggered */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 border border-white/20 shadow-2xl stagger-item transition-transform duration-300 group-hover:-translate-y-2" style={{ transitionDelay: '0.8s' }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex -space-x-3">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" loading="lazy" className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover" alt="Staff" />
                                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" loading="lazy" className="w-10 h-10 rounded-full border-2 border-brand-dark object-cover" alt="Staff" />
                                        <div className="w-10 h-10 rounded-full border-2 border-brand-dark bg-brand-red flex items-center justify-center text-xs font-bold text-white">+40</div>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-white">{t('card.team')}</div>
                                </div>
                                <p className="text-white italic text-sm">{t('card.quote')}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OfficeHospitality;

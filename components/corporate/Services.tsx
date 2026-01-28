'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

import { useTranslations } from 'next-intl';

const Services = () => {
    const t = useTranslations('Corporate.services');
    const [activeService, setActiveService] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const services = [
        {
            id: "01",
            titleKey: "concierge",
            image: "/concierge_service.png"
        },
        {
            id: "02",
            titleKey: "cleaning",
            image: "/corporate-cleaning.png"
        },
        {
            id: "03",
            titleKey: "waste",
            image: "/waste_management.png"
        },
        {
            id: "04",
            titleKey: "support",
            image: "/office_support.png"
        }
    ];

    useEffect(() => {
        let interval: any;

        if (!isPaused) {
            interval = setInterval(() => {
                setActiveService((prev) => (prev + 1) % services.length);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [isPaused, services.length]);

    return (
        <section className="py-24 lg:py-32 bg-white relative">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                    {/* Left: Interactive Service List */}
                    <div
                        className="lg:w-1/2 flex flex-col justify-center"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-brand-red"></div>
                                <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">{t('badge')}</span>
                            </div>
                            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-dark">{t('title')}</h2>
                        </div>

                        <div className="space-y-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group cursor-pointer"
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className={`font-mono text-sm transition-colors duration-300 ${activeService === index ? 'text-brand-red' : 'text-gray-300'}`}>
                                            {service.id}
                                        </span>
                                        <h3 className={`font-display text-2xl lg:text-3xl font-bold transition-colors duration-300 ${activeService === index ? 'text-brand-dark' : 'text-gray-300 group-hover:text-gray-400'}`}>
                                            {t(`items.${service.titleKey}.title`)}
                                        </h3>
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-500 ease-out ${activeService === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-500 pl-10 max-w-md border-l-2 border-gray-100 ml-2 py-2">
                                            {t(`items.${service.titleKey}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#" className="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-red transition-colors group w-max">
                            {t('cta')}
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right: Dynamic Image Display */}
                    <div className="lg:w-1/2 relative h-[500px] lg:h-[600px] bg-gray-100 hidden lg:block overflow-hidden rounded-2xl">
                        <div className="absolute inset-0 z-10">
                            <img
                                src={services[activeService].image}
                                alt={t(`items.${services[activeService].titleKey}.title`)}
                                className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                                key={activeService} // Force re-render on change
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60"></div>

                            {/* Indicator Box */}
                            <div className="absolute bottom-0 right-0 bg-white p-6 lg:p-8">
                                <ArrowRight className="w-8 h-8 text-brand-red" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;

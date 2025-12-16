'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const Services = () => {
    const [activeService, setActiveService] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const services = [
        {
            id: "01",
            title: "Concierge",
            desc: "Serviços de recepção executiva, gestão de acessos e suporte administrativo premium para seu escritório.",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: "02",
            title: "Limpeza Industrial",
            desc: "Equipes especializadas para grandes áreas, galpões e escritórios de grande porte com maquinário específico.",
            image: "/corporate-cleaning.png"
        },
        {
            id: "03",
            title: "Déchetterie",
            desc: "Gestão sustentável de resíduos, coleta seletiva e descarte certificado de materiais corporativos.",
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: "04",
            title: "Profissionais para Escritório",
            desc: "Suporte diário para copa, organização de mesas, limpeza de banheiros e manutenção da ordem no ambiente de trabalho.",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
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
                                <div className="w-12 h-[2px] bg-brand-red"></div>
                                <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">Nossos Serviços</span>
                            </div>
                            <h2 className="font-display text-4xl lg:text-5xl font-bold text-brand-dark">Soluções 360º</h2>
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
                                            {service.title}
                                        </h3>
                                    </div>
                                    <div className={`overflow-hidden transition-all duration-500 ease-out ${activeService === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-gray-500 pl-10 max-w-md border-l-2 border-gray-100 ml-2 py-2">
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a href="#" className="mt-12 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-red transition-colors group w-max">
                            Ver catálogo completo
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Right: Dynamic Image Display */}
                    <div className="lg:w-1/2 relative h-[500px] lg:h-[600px] bg-gray-100 hidden lg:block overflow-hidden rounded-2xl">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-opacity duration-700 ease-out ${activeService === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            >
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale transition-transform duration-1000 scale-105"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60"></div>

                                {/* Indicator Box */}
                                <div className="absolute bottom-0 right-0 bg-white p-6 lg:p-8">
                                    <ArrowRight className="w-8 h-8 text-brand-red" />
                                </div>

                                {/* Progress Bar for Auto Play */}
                                {!isPaused && activeService === index && (
                                    <div className="absolute bottom-0 left-0 h-1 bg-brand-red animate-[width_5s_linear_forwards] w-full origin-left"></div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;

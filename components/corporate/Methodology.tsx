'use client';

import React, { useEffect, useRef } from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

const Methodology = () => {
    const parallaxRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const offset = window.scrollY * 0.15;
                parallaxRef.current.style.transform = `translateY(${offset}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-24 bg-brand-gray overflow-hidden relative">
            {/* Parallax Background - Changed to IMG for lazy loading */}
            <img
                ref={parallaxRef}
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Architecture Background"
                loading="lazy"
                className="absolute -top-[20%] left-0 w-full h-[140%] object-cover opacity-[0.05] pointer-events-none mix-blend-multiply"
                style={{ willChange: 'transform' }}
            />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Image Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                        <img
                            src="/quality-standard-1.png"
                            loading="lazy"
                            className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl"
                            alt="Team meeting"
                        />
                        <div className="bg-brand-red p-8 flex flex-col justify-center text-white relative overflow-hidden group rounded-2xl">
                            <Briefcase className="w-12 h-12 mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300" />
                            <h4 className="font-display text-2xl font-bold mb-2">Processos Certificados</h4>
                            <p className="text-sm opacity-80">ISO 9001 e 14001 em todas as operações.</p>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        </div>
                        <div className="bg-white p-8 flex flex-col justify-center border border-gray-200 hover:border-brand-dark transition-colors duration-300 rounded-2xl">
                            <h4 className="font-display text-4xl font-bold text-brand-dark mb-1">0%</h4>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Tolerância a falhas</p>
                        </div>
                        <img
                            src="/quality-standard-2.png"
                            loading="lazy"
                            className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl"
                            alt="Technical inspection"
                        />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-5">
                        <div className="border-l-4 border-brand-red pl-6 py-2 mb-8">
                            <h2 className="font-display text-4xl font-bold text-white">Padrão Suíço de Qualidade</h2>
                        </div>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Não entregamos apenas serviços, entregamos tranquilidade. Nossa metodologia proprietária combina rigorosos protocolos de execução com uma cultura de hospitalidade.
                        </p>

                        <ul className="space-y-6">
                            {[
                                "Gerentes de conta dedicados para cada contrato",
                                "KPIs personalizados e Dashboard em tempo real",
                                "Equipe uniformizada, treinada e background-checked",
                                "Seguro de responsabilidade civil abrangente"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4 group">
                                    <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-brand-red group-hover:scale-110 transition-all duration-300">
                                        <CheckCircle2 className="w-3 h-3 text-brand-red" />
                                    </div>
                                    <span className="text-gray-200 font-medium group-hover:text-brand-red transition-colors">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Methodology;

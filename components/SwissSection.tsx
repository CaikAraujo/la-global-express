'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FeatureCard } from './swiss/FeatureCard';
import { FEATURES } from './swiss/constants';
import { motion } from 'framer-motion';

const SwissSection: React.FC = () => {
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
                                Por que a La Global?
                            </span>
                            <h2 className="text-4xl md:text-6xl text-white font-display font-medium leading-[1.1] tracking-tight">
                                O Padrão Suíço de <br />
                                <span className="text-neutral-500">Prestação de Serviços</span>
                            </h2>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="border-l border-neutral-800 pl-8"
                        >
                            <p className="text-neutral-400 font-sans text-lg leading-relaxed mb-6">
                                Não apenas limpamos ou consertamos. Cuidamos do seu patrimônio com a máxima discrição e precisão técnica.
                            </p>
                            <Link href="/about" className="inline-flex items-center gap-2 text-white text-sm font-semibold tracking-widest uppercase hover:text-brand-red transition-colors group">
                                Conheça nosso método
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard key={feature.id} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SwissSection;

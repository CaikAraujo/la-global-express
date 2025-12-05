'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Mail, Send } from 'lucide-react';

const CTA: React.FC = () => {
    return (
        <section className="relative w-full py-24 bg-brand-dark overflow-hidden font-sans">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-brand-red/[0.04] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/[0.03] rounded-full blur-[128px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Content */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
                        >
                            Pronto para elevar o nível da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-400">infraestrutura?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed"
                        >
                            Solicite uma auditoria gratuita das suas instalações atuais e descubra onde você pode economizar com nossas soluções de alta performance.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            {/* Phone Widget */}
                            <div className="flex items-center gap-4 px-6 py-4 bg-white/5 rounded-lg border border-white/10 hover:border-brand-red/30 transition-colors group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Ligue agora</p>
                                    <p className="text-white font-bold text-lg tracking-wide">+55 11 9999-9999</p>
                                </div>
                            </div>

                            {/* Main CTA Button */}
                            <button className="flex-1 sm:flex-none px-8 py-4 bg-brand-red text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-brand-red/25 flex items-center justify-center gap-2 group">
                                SOLICITAR ORÇAMENTO
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Content - Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gray-100 rounded-md">
                                    <Mail className="w-5 h-5 text-brand-dark" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark">Contato Rápido</h3>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Seu Email Corporativo
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="nome@empresa.com.br"
                                        className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-lg text-brand-dark placeholder-gray-400 focus:bg-white focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 outline-none transition-all"
                                    />
                                </div>

                                <button type="button" className="w-full py-4 bg-brand-dark text-white font-bold rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 group">
                                    INICIAR CONVERSA
                                    <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span>Especialistas online agora</span>
                            </div>
                        </div>

                        {/* Decorative Card Element */}
                        <div className="absolute -z-10 top-6 -right-6 w-full h-full bg-white/5 rounded-2xl border border-white/10 hidden md:block" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default CTA;

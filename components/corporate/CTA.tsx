import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

const CTA = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="bg-brand-dark rounded-none p-12 lg:p-24 relative overflow-hidden group">
                    {/* Decorative lines */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20 group-hover:translate-x-10 transition-transform duration-1000"></div>

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">Pronto para elevar o nível da sua infraestrutura?</h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-md">
                                Solicite uma auditoria gratuita das suas instalações atuais e descubra onde você pode economizar.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-4 text-white border border-white/20 px-6 py-4 hover:bg-white/5 hover:border-white transition-all duration-300 cursor-pointer">
                                    <Phone className="text-brand-red" />
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-400">Ligue Agora</div>
                                        <div className="font-display font-bold">+55 11 9999-9999</div>
                                    </div>
                                </div>
                                <button className="bg-brand-red text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-brand-red transition-colors duration-300">
                                    Solicitar Orçamento
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            {/* Minimalist Form Representation */}
                            <div className="bg-white p-8 shadow-2xl">
                                <div className="mb-6">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Seu Email Corporativo</label>
                                    <input type="text" placeholder="Insira seu email corporativo" className="w-full border-b-2 border-gray-200 py-3 text-brand-dark outline-none focus:border-brand-red transition-colors placeholder-gray-300 font-display text-lg" />
                                </div>
                                <button className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 text-brand-dark font-bold hover:bg-brand-red hover:text-white transition-all duration-300 group/btn">
                                    <span>INICIAR CONVERSA</span>
                                    <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;

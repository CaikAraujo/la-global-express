import React from 'react';
import { Target, Globe, Layers } from 'lucide-react';
import Image from 'next/image';

const ValueItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
    <div className="group p-8 bg-white border border-gray-100 hover:border-brand-red hover:shadow-lg transition-all duration-300">
        <div className="mb-6 text-brand-red opacity-80 group-hover:opacity-100 transition-opacity">
            {icon}
        </div>
        <h3 className="font-display font-bold text-xl mb-3 text-brand-dark">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export const ContentSection: React.FC = () => {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6">

                {/* Top Section: Quote & Intro */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    <div className="md:col-span-5 relative">
                        <span className="absolute -top-10 -left-6 text-9xl text-gray-100 font-display font-bold select-none z-0">"</span>
                        <blockquote className="relative z-10 font-display font-bold text-3xl md:text-4xl leading-tight text-brand-dark">
                            A precisão não é apenas um detalhe. É a fundação de tudo o que construímos.
                        </blockquote>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                                <Image
                                    src="https://picsum.photos/100/100"
                                    alt="CEO"
                                    fill
                                    className="object-cover grayscale"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-dark uppercase">Hans Muller</p>
                                <p className="text-xs text-gray-500">Fundador, Zurique</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 hidden md:block border-r border-gray-100"></div>

                    <div className="md:col-span-6 flex flex-col justify-center space-y-6">
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Fundada em <strong className="text-brand-dark">Zurique em 2010</strong>, a LA Global Express nasceu com um propósito claro: exportar o padrão suíço de Facility Management para o mundo.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            O que começou como uma pequena consultoria de eficiência operacional para bancos privados, rapidamente se transformou em uma referência global em serviços integrados. Hoje, operamos na intersecção entre tecnologia, logística e excelência humana.
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Values Grid */}
                <div className="border-t border-gray-100 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <h2 className="font-display font-bold text-3xl text-brand-dark">NOSSO PADRÃO</h2>
                        <a href="#" className="text-brand-red font-bold text-sm tracking-widest uppercase hover:underline mt-4 md:mt-0">Ver portfolio completo</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ValueItem
                            icon={<Target size={32} strokeWidth={1.5} />}
                            title="Precisão Suíça"
                            desc="Metodologias rigorosas aplicadas a cada processo, garantindo zero desperdício e máxima performance."
                        />
                        <ValueItem
                            icon={<Globe size={32} strokeWidth={1.5} />}
                            title="Alcance Global"
                            desc="Presente em 3 continentes, conectando necessidades locais com expertise internacional."
                        />
                        <ValueItem
                            icon={<Layers size={32} strokeWidth={1.5} />}
                            title="Serviços Integrados"
                            desc="Uma solução única para desafios complexos. Do planejamento à execução final."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

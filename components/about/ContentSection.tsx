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
                            Vous ne devriez pas avoir à gérer ceux qui travaillent pour vous. Le luxe, c'est l'absence de soucis.
                        </blockquote>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden relative">
                                <Image
                                    src="https://picsum.photos/100/100"
                                    alt="Fondateur"
                                    fill
                                    className="object-cover grayscale"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-dark uppercase">LA Global</p>
                                <p className="text-xs text-gray-500">Philosophie d'Entreprise</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 hidden md:block border-r border-gray-100"></div>

                    <div className="md:col-span-6 flex flex-col justify-center space-y-6">
                        <h3 className="font-bold text-xl text-brand-dark">L'Anti-agence.</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Tout a commencé par une observation silencieuse entre le Brésil et la Suisse. Le marché du luxe avait accès aux meilleurs biens immobiliers, mais la gestion quotidienne était chaotique.
                            Le directeur d'une multinationale perdait des heures à coordonner un déménagement. Les familles se heurtaient à des barrières pour engager un nettoyage fiable.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            LA Global Express est née pour éliminer cette friction. Nous centralisons la logistique, les déménagements, la conciergerie et le nettoyage technique sous un même toit.
                            <strong> Pas de tickets de support, juste des solutions.</strong>
                        </p>
                    </div>
                </div>

                {/* Bottom Section: Values Grid */}
                <div className="border-t border-gray-100 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <h2 className="font-display font-bold text-3xl text-brand-dark">NOTRE STANDARD</h2>
                        <a href="/contact" className="text-brand-red font-bold text-sm tracking-widest uppercase hover:underline mt-4 md:mt-0">Parlez à un consultant</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ValueItem
                            icon={<Target size={32} strokeWidth={1.5} />}
                            title="Zéro Friction"
                            desc="Nous ne vendons pas des heures, nous vendons des résultats. Vous demandez, nous exécutons. Tout simplement."
                        />
                        <ValueItem
                            icon={<Globe size={32} strokeWidth={1.5} />}
                            title="Vision 360º"
                            desc="Du déménagement international au nettoyage final de la propriété. Un point de contact unique pour tout."
                        />
                        <ValueItem
                            icon={<Layers size={32} strokeWidth={1.5} />}
                            title="Approche Humaine"
                            desc="Technologie suisse pour les processus, chaleur humaine pour le service. Nous connaissons nos clients par leur nom."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

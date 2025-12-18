
import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const ContactInfo: React.FC = () => {
    return (
        <div className="flex flex-col justify-between h-full py-8 md:py-0">
            <div>
                <h1 className="font-display font-bold text-5xl md:text-7xl leading-tight text-brand-navy mb-6">
                    Vamos elevar <br />
                    <span className="text-brand-red">o padrão.</span>
                </h1>
                <p className="text-brand-gray text-lg md:max-w-md leading-relaxed mb-12">
                    Estamos prontos para otimizar a logística da sua empresa com soluções globais personalizadas.
                </p>
            </div>

            <div className="space-y-10">
                <div className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:border-brand-red transition-colors">
                            <MapPin className="w-5 h-5 text-brand-red" />
                        </div>
                        <div>

                            <p className="text-brand-gray text-sm leading-relaxed">
                                Avenue des Communes-Réunies 43<br />
                                1212 Grand-Lancy
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:border-brand-red transition-colors">
                            <Phone className="w-5 h-5 text-brand-red" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xs uppercase tracking-widest text-brand-navy mb-1">Telefone</h3>
                            <p className="text-brand-navy font-medium font-display text-lg">
                                +55 11 3000-0000
                            </p>
                        </div>
                    </div>
                </div>

                <div className="group cursor-pointer">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100 group-hover:border-brand-red transition-colors">
                            <Mail className="w-5 h-5 text-brand-red" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xs uppercase tracking-widest text-brand-navy mb-1">Email Corporativo</h3>
                            <a href="mailto:corporate@laglobal.com" className="text-brand-navy font-medium hover:text-brand-red transition-colors flex items-center gap-2">
                                corporate@laglobal.com
                                <ArrowRight className="w-3 h-3 -rotate-45" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Map Placeholder */}
            <div className="mt-12 hidden lg:block relative h-40 w-full rounded-none overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100">
                <img
                    src="https://picsum.photos/600/200?grayscale"
                    alt="Map location"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-cream to-transparent pointer-events-none"></div>
            </div>
        </div>
    );
};

export default ContactInfo;

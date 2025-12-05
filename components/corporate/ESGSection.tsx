import React from 'react';
import { Leaf } from 'lucide-react';

const ESGSection = () => {
    return (
        <section className="py-20 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-6 hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="font-display text-3xl font-bold text-brand-dark mb-4">Compromisso ESG</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-12">
                    Alinhamos nossas operações às metas de sustentabilidade da sua empresa. Utilizamos produtos biodegradáveis e equipamentos de baixo consumo energético.
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[
                        { title: "Eco-Friendly", desc: "Produtos com selo verde e redução de uso de água." },
                        { title: "Social", desc: "Programas de capacitação e ascensão social para colaboradores." },
                        { title: "Governança", desc: "Auditorias trimestrais e compliance rigoroso." }
                    ].map((item, i) => (
                        <div key={i} className="bg-brand-gray p-6 rounded-lg border border-transparent hover:border-brand-red hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out cursor-default">
                            <h3 className="font-bold text-brand-dark mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ESGSection;

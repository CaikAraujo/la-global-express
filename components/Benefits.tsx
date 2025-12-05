import React from 'react';
import { Clock, ShieldCheck, Award, EyeOff } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section className="py-24 bg-brand-dark text-white relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/20 pb-8">
                <div className="max-w-2xl">
                    <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">Por que LA Global?</span>
                    <h2 className="text-4xl font-bold text-white tracking-tight">
                        O Padrão Suíço de <br/>Prestação de Serviços
                    </h2>
                </div>
                <div className="mt-8 md:mt-0">
                    <p className="text-gray-400 max-w-sm text-right">
                        Não apenas limpamos ou consertamos. Cuidamos do seu patrimônio com a máxima discrição.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-12">
                {/* Benefit 1 */}
                <div className="group">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors">
                        <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Pontualidade Absoluta</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Respeito irrestrito ao seu tempo. Nossos profissionais seguem cronogramas precisos.</p>
                </div>

                {/* Benefit 2 */}
                <div className="group">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors">
                        <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Excelência Técnica</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Profissionais treinados nos mais altos padrões globais de facilities.</p>
                </div>

                {/* Benefit 3 */}
                <div className="group">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors">
                        <EyeOff className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Discrição Total</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Sigilo e respeito à sua privacidade são pilares fundamentais da nossa atuação.</p>
                </div>

                {/* Benefit 4 */}
                <div className="group">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:border-brand-600 transition-colors">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Garantia LA Global</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Seguro de responsabilidade civil e garantia de satisfação em todos os serviços.</p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Benefits;
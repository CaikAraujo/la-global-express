import React, { useState } from 'react';
import { PLANS } from './pricing/constants';
import { PricingCard } from './pricing/PricingCard';
import { Switch } from './pricing/Switch';
import { ArrowRight } from 'lucide-react';

const Plans: React.FC = () => {
   const [isYearly, setIsYearly] = useState(false);

   return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white">
         <div className="max-w-7xl mx-auto">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-brand-red font-bold text-xs tracking-[0.2em] uppercase mb-4">
                  Assinaturas Exclusivas
               </h2>
               <h1 className="text-4xl md:text-5xl font-serif font-medium text-brand-dark mb-6 leading-tight">
                  Planos de Manutenção Continuada <br className="hidden md:block" /> para quem exige excelência.
               </h1>
               <p className="text-gray-500 text-lg font-light leading-relaxed">
                  Garanta a valorização do seu patrimônio com a nossa gestão de facilities.
                  Escolha o nível de cuidado que sua residência ou empresa merece.
               </p>
            </div>

            {/* Controls */}
            <Switch
               checked={isYearly}
               onChange={setIsYearly}
               leftLabel="Mensal"
               rightLabel="Anual"
            />

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start relative">
               {/* Decorative background blob */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-r from-red-50/50 via-blue-50/30 to-gray-50/50 blur-3xl rounded-full -z-10 pointer-events-none opacity-60" />

               {PLANS.map((plan) => (
                  <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
               ))}
            </div>

            {/* Enterprise Banner / Footer of section */}
            <div className="mt-24 bg-brand-dark rounded-2xl p-8 md:p-12 relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-red/20 transition-colors duration-500"></div>

               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                     <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">Precisa de uma solução para grandes corporações?</h3>
                     <p className="text-gray-400 font-sans">Desenvolvemos projetos personalizados para indústrias, condomínios e redes de varejo.</p>
                  </div>
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-brand-dark px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-sm border border-white/20">
                     Falar com Consultor Corporativo
                     <ArrowRight size={16} />
                  </button>
               </div>
            </div>

         </div>
      </section>
   );
};

export default Plans;
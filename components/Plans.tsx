import React from 'react';
import { Check, Star } from 'lucide-react';

const Plans: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-xs">Assinaturas</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Planos de Manutenção Continuada</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           
           {/* Plan 1 */}
           <div className="bg-white p-10 border border-gray-200 hover:border-brand-600 transition-colors group">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Essential</h3>
              <p className="text-gray-500 text-sm mb-6 h-10">Para manutenção básica semanal de residências compactas.</p>
              <div className="text-3xl font-bold text-gray-900 mb-8">R$ 500<span className="text-sm font-normal text-gray-400">/mês</span></div>
              
              <ul className="space-y-4 text-sm text-gray-600 mb-8">
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> 4 Visitas Mensais</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Limpeza Padrão</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Produtos Inclusos</li>
                 <li className="flex gap-3 text-gray-400 line-through"><Check size={16} className="text-gray-300 mt-0.5"/> Passadoria</li>
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-900 font-bold py-3 text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Selecionar
              </button>
           </div>

           {/* Plan 2 - Featured */}
           <div className="bg-gray-900 p-10 text-white transform md:-translate-y-4 shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  Mais Escolhido
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Swiss</h3>
              <p className="text-gray-400 text-sm mb-6 h-10">Cuidado completo para residências e escritórios de médio porte.</p>
              <div className="text-3xl font-bold text-white mb-8">R$ 1.200<span className="text-sm font-normal text-gray-500">/mês</span></div>
              
              <ul className="space-y-4 text-sm text-gray-300 mb-8">
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> 8 Visitas Mensais</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Limpeza Profunda</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Passadoria Premium</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Produtos Ecológicos</li>
              </ul>
              
              <button className="w-full bg-brand-600 text-white font-bold py-3 text-xs uppercase tracking-widest hover:bg-brand-500 transition-colors">
                  Assinar Agora
              </button>
           </div>

           {/* Plan 3 */}
           <div className="bg-white p-10 border border-gray-200 hover:border-brand-600 transition-colors group">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Elite</h3>
              <p className="text-gray-500 text-sm mb-6 h-10">Gestão total de facilities com concierge dedicado.</p>
              <div className="text-3xl font-bold text-gray-900 mb-8">Sob Consulta</div>
              
              <ul className="space-y-4 text-sm text-gray-600 mb-8">
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Visitas Ilimitadas</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Equipe Fixa</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Manutenção Predial</li>
                 <li className="flex gap-3"><Check size={16} className="text-brand-600 mt-0.5"/> Gestor de Conta</li>
              </ul>
              
              <button className="w-full bg-gray-100 text-gray-900 font-bold py-3 text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Contatar
              </button>
           </div>

        </div>
      </div>
    </section>
  );
};

export default Plans;
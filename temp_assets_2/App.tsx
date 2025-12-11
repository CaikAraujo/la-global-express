import React, { useState } from 'react';
import { BookingSection } from './components/BookingSection';
import { ChevronLeft, ShieldCheck, Star, Clock } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans pb-32 md:pb-12">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button className="flex items-center text-gray-500 hover:text-gray-900 transition-colors gap-1 text-sm font-medium">
            <ChevronLeft size={18} />
            <span>Voltar</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-600"></div>
            <span className="text-sm font-semibold text-gray-900">Agendamento</span>
          </div>

          <div className="text-sm text-gray-400">
            Passo 2 de 4
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
            Personalize sua limpeza
          </h1>
          <p className="text-gray-500 text-lg">
            Escolha a frequência ideal e garanta descontos exclusivos na assinatura.
          </p>
        </div>

        {/* Trust Indicators Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <TrustItem icon={ShieldCheck} title="Profissionais Verificados" desc="Identidade e antecedentes checados" />
          <TrustItem icon={Star} title="Satisfação Garantida" desc="Se não gostar, refazemos de graça" />
          <TrustItem icon={Clock} title="Cancelamento Flexível" desc="Até 24h antes sem custo" />
        </div>

        <BookingSection />
      </main>
    </div>
  );
};

const TrustItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg shrink-0">
      <Icon size={20} />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default App;
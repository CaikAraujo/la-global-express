import React, { useState } from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { parseBookingIntent } from '../services/geminiService';
import { BookingIntent } from '../types';
import manutencaoImg from '../assets/manutencao_predial.png';
import enxovalImg from '../assets/gestao_enxoval.png';

const services = [
  {
    id: 1,
    title: "Limpeza Executiva",
    desc: "Higienização profunda para residências de alto padrão e escritórios.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    badge: "Disponível 24/7"
  },
  {
    id: 2,
    title: "Manutenção Predial",
    desc: "Reparos elétricos, hidráulicos e estruturais com laudo técnico.",
    img: manutencaoImg,
    badge: "Técnicos Certificados"
  },
  {
    id: 3,
    title: "Gestão de Enxoval",
    desc: "Passadoria e organização de rouparia com técnicas de hotelaria.",
    img: enxovalImg,
    badge: "Delivery Incluso"
  },
  {
    id: 4,
    title: "Montagem Técnica",
    desc: "Especialistas em mobiliário de design e instalações complexas.",
    img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=600&q=80",
    badge: "Garantia Total"
  }
];

const ServicesGrid: React.FC = () => {
  const [showAI, setShowAI] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<BookingIntent | null>(null);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput) return;
    setAiLoading(true);
    const res = await parseBookingIntent(aiInput);
    setAiResult(res);
    setAiLoading(false);
  }

  return (
    <section id="servicos" className="py-20 bg-gray-50 relative">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">SOLUÇÕES INTEGRADAS</h2>
        <div className="w-16 h-1 bg-brand-600 mx-auto mb-8"></div>

        {/* Toggle Categories */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 shadow-sm inline-flex border border-gray-200">
            <button className="px-8 py-3 bg-gray-900 text-white font-bold text-sm uppercase tracking-wider">Residencial</button>
            <button className="px-8 py-3 text-gray-500 font-bold text-sm uppercase tracking-wider hover:text-brand-600 transition-colors">Corporativo</button>
          </div>
        </div>

        {/* AI Concierge */}
        <div className="max-w-2xl mx-auto">
          {!showAI ? (
            <button
              onClick={() => setShowAI(true)}
              className="group inline-flex items-center gap-3 text-gray-900 font-medium border-b border-gray-300 pb-1 hover:border-brand-600 hover:text-brand-600 transition-all"
            >
              <Sparkles size={16} className="text-brand-600" />
              <span>Busca Inteligente por IA</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="bg-white p-8 shadow-2xl border-t-4 border-brand-600 animate-fade-in-up text-left relative">
              <button onClick={() => setShowAI(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900">×</button>
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4 uppercase tracking-wider text-sm">
                <Sparkles className="text-brand-600" size={16} /> Concierge Digital
              </h3>
              {!aiResult ? (
                <form onSubmit={handleAISearch} className="flex gap-0">
                  <input
                    type="text"
                    placeholder="Descreva sua necessidade..."
                    className="flex-1 bg-gray-50 border border-gray-300 px-6 py-4 focus:border-brand-600 focus:ring-0 outline-none text-gray-900"
                    value={aiInput}
                    onChange={e => setAiInput(e.target.value)}
                  />
                  <button disabled={aiLoading} className="bg-brand-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-black transition-colors">
                    {aiLoading ? "..." : "Consultar"}
                  </button>
                </form>
              ) : (
                <div className="bg-gray-50 p-6 border-l-4 border-gray-900 mt-2 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{aiResult.serviceType}</p>
                    <p className="text-brand-600 font-bold mt-1">{aiResult.estimatedPrice}</p>
                    <p className="text-sm text-gray-500 mt-2 max-w-xs">{aiResult.details}</p>
                  </div>
                  <button className="bg-gray-900 text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-brand-600 transition-colors">
                    Confirmar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={service.id} className="group bg-white border border-gray-100 hover:border-brand-600 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
                <img src={service.img} alt={service.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" />
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 border border-brand-200 px-2 py-1 bg-brand-50">
                    {service.badge}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed flex-1">{service.desc}</p>

                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-brand-600 transition-colors mt-auto">
                  Solicitar <ArrowRight size={14} />
                </a>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ServicesGrid;
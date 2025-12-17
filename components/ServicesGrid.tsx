'use client';

import React, { useState, useMemo } from 'react';
import { Category } from './services/types';
import Link from 'next/link';
import { SERVICES } from './services/data';
import { ServiceCard } from './services/ServiceCard';


const ServicesGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.RESIDENCIAL);
  const [highlightedServiceId, setHighlightedServiceId] = useState<string | null>(null);

  // Filter services based on active tab
  const filteredServices = useMemo(() => {
    return SERVICES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleServiceFound = (serviceId: string) => {
    // Find the category of the recommended service to switch tabs if necessary
    const service = SERVICES.find(s => s.id === serviceId);
    if (service) {
      setActiveCategory(service.category);
      setHighlightedServiceId(serviceId);

      // Scroll to service
      setTimeout(() => {
        const el = document.getElementById(`service-${serviceId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  return (
    <section id="servicos" className="min-h-screen bg-white text-brand-dark font-sans selection:bg-brand-red selection:text-white relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-gray-50 to-transparent opacity-50 rounded-bl-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-gradient-to-t from-gray-50 to-transparent opacity-50 rounded-tr-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">

        {/* Header Section */}
        <header className="text-center mb-16 space-y-8">
          <div className="space-y-4">
            <h2 className="text-brand-red font-bold tracking-[0.2em] text-xs uppercase animate-[fadeInDown_1s_ease-out]">
              Excelência em Cada Detalhe
            </h2>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-dark leading-tight">
              Soluções Integradas
            </h1>
            <div className="w-24 h-1 bg-brand-red mx-auto mt-6 rounded-full"></div>
          </div>


        </header>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white p-1.5 rounded-full shadow-lg border border-gray-100 relative">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setHighlightedServiceId(null); }}
                className={`
                  relative px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 z-10
                  ${activeCategory === cat ? 'text-white' : 'text-gray-400 hover:text-brand-dark'}
                `}
              >
                {activeCategory === cat && (
                  <div className="absolute inset-0 bg-brand-dark rounded-full shadow-md -z-10 animate-[fadeIn_0.3s_ease-out]"></div>
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              id={`service-${service.id}`}
              className="h-full"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                service={service}
                isHighlighted={highlightedServiceId === service.id}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 text-sm mb-4">Não encontrou o que procura?</p>
          <Link href="/contact" className="text-brand-dark font-display text-xl border-b border-brand-red/30 hover:border-brand-red pb-1 transition-colors">
            Falar com um consultor humano
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;
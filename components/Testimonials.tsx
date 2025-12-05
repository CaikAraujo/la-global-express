import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "A LA Global trouxe um nível de profissionalismo que eu não encontrava no mercado. A equipe chega uniformizada, trabalha em silêncio e entrega resultados impecáveis.",
    author: "Roberto Justus",
    role: "Empresário",
  },
  {
    id: 2,
    content: "Contratei para meu escritório de advocacia. A discrição e a segurança que eles oferecem são fundamentais para o nosso negócio. Recomendo de olhos fechados.",
    author: "Dra. Ana Paula",
    role: "Sócia-Diretora",
  },
  {
    id: 3,
    content: "Serviço de primeira classe. O sistema de agendamento é preciso e o atendimento ao cliente funciona como um relógio suíço.",
    author: "Carlos Dumont",
    role: "Arquiteto",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-24 bg-gray-50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">O que dizem nossos clientes</h2>
          <div className="w-12 h-1 bg-brand-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-8 shadow-sm border-t-4 border-transparent hover:border-brand-600 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-brand-600 text-brand-600" />)}
              </div>
              <p className="text-gray-600 leading-relaxed mb-8 italic font-serif text-lg">"{t.content}"</p>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                    {t.author.charAt(0)}
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{t.author}</h4>
                    <p className="text-xs text-gray-500">{t.role}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
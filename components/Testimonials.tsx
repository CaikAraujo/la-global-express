import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Museli a apporté un niveau de professionnalisme que je ne trouvais pas sur le marché. L'équipe arrive en uniforme, travaille en silence et livre des résultats impeccables.",
    author: "Roberto Justus",
    role: "Entrepreneur",
  },
  {
    id: 2,
    content: "Je les ai engagés pour mon cabinet d'avocats. La discrétion et la sécurité qu'ils offrent sont fondamentales pour notre entreprise. Je recommande les yeux fermés.",
    author: "Dra. Ana Paula",
    role: "Associée Directrice",
  },
  {
    id: 3,
    content: "Service de première classe. Le système de réservation est précis et le service client fonctionne comme une horloge suisse.",
    author: "Carlos Dumont",
    role: "Architecte",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-24 bg-gray-50 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ce que disent nos clients</h2>
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
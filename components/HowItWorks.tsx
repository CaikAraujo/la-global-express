import React from 'react';
import { Calendar, UserCheck, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: "Planification Précise",
    desc: "Sélectionnez le service et l'horaire exact. Notre plateforme garantit une disponibilité immédiate."
  },
  {
    icon: UserCheck,
    title: "Exécution Certifiée",
    desc: "Un professionnel en uniforme et identifié arrive sur place avec tout l'équipement nécessaire."
  },
  {
    icon: CreditCard,
    title: "Paiement Corporatif",
    desc: "Facturation facilitée pour les entreprises et gestion transparente via tableau de bord."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-xs">Processus</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Simplicité et Efficacité</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 z-0"></div>

          {steps.map((s, i) => (
            <div key={i} className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-8 shadow-sm group hover:border-brand-600 transition-colors">
                <s.icon size={32} className="text-gray-400 group-hover:text-brand-600 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                {s.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
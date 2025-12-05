import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      
      {/* Header Image */}
      <div className="h-[60vh] w-full relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" 
          className="w-full h-full object-cover grayscale brightness-75"
          alt="Zurich Architecture"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter text-center">
                NOSSA<br/><span className="text-brand-600">ORIGEM</span>
            </h1>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24 max-w-4xl mx-auto px-6">
         <p className="text-2xl md:text-3xl font-serif italic text-gray-900 leading-relaxed mb-12 text-center">
           "A precisão não é apenas um detalhe. É a fundação de tudo o que construímos."
         </p>
         
         <div className="prose prose-lg text-gray-600 mx-auto">
            <p className="mb-6">
              Fundada em Zurique em 2010, a LA Global Express nasceu com um propósito claro: exportar o padrão suíço de Facility Management para o mundo. O que começou como uma pequena consultoria de eficiência operacional para bancos privados, rapidamente se transformou em uma referência global em serviços integrados.
            </p>
            <p className="mb-6">
              Em 2015, expandimos nossas operações para a América Latina, escolhendo o Brasil como nosso hub central. Trouxemos não apenas capital, mas uma cultura de trabalho baseada em três pilares inegociáveis: <strong>Pontualidade, Discrição e Excelência Técnica.</strong>
            </p>
            <p>
              Hoje, gerenciamos mais de 500 mil metros quadrados de propriedades de alto padrão, garantindo que nossos clientes possam focar no que realmente importa: seus negócios e suas famílias.
            </p>
         </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-widest">Nossa Trajetória</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
               <div className="relative pt-8 border-t-4 border-brand-600">
                  <span className="text-4xl font-black text-gray-200 absolute -top-14 left-0">2010</span>
                  <h3 className="font-bold text-xl mb-2">Fundação</h3>
                  <p className="text-sm text-gray-500">Início das operações em Zurique, atendendo setor bancário.</p>
               </div>
               <div className="relative pt-8 border-t-4 border-gray-300">
                  <span className="text-4xl font-black text-gray-200 absolute -top-14 left-0">2015</span>
                  <h3 className="font-bold text-xl mb-2">Expansão Brasil</h3>
                  <p className="text-sm text-gray-500">Abertura do HQ em São Paulo e início da divisão residencial.</p>
               </div>
               <div className="relative pt-8 border-t-4 border-gray-300">
                  <span className="text-4xl font-black text-gray-200 absolute -top-14 left-0">2020</span>
                  <h3 className="font-bold text-xl mb-2">Digitalização</h3>
                  <p className="text-sm text-gray-500">Lançamento do App exclusivo e sistema de monitoramento IoT.</p>
               </div>
               <div className="relative pt-8 border-t-4 border-brand-600">
                  <span className="text-4xl font-black text-gray-200 absolute -top-14 left-0">2024</span>
                  <h3 className="font-bold text-xl mb-2">Liderança</h3>
                  <p className="text-sm text-gray-500">Eleita melhor empresa de Facilities Premium da América Latina.</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default About;
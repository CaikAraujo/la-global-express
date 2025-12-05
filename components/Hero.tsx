import React from 'react';
import { ShieldCheck, CheckSquare, Clock, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-10 relative z-10">
            <div className="inline-block border-l-4 border-brand-600 pl-4">
              <span className="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">Padrão Suíço de Qualidade</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Excelência em <br />
              <span className="text-brand-600">Serviços Globais</span>.
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Soluções integradas de facilities para residências e empresas exigentes. Pontualidade, discrição e eficiência técnica.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 group">
                <div className="bg-brand-50 p-2 group-hover:bg-brand-600 transition-colors duration-300">
                  <CheckSquare className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                </div>
                <p className="font-medium text-gray-800">Protocolos rigorosos de execução</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="bg-brand-50 p-2 group-hover:bg-brand-600 transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                </div>
                <p className="font-medium text-gray-800">Profissionais certificados e segurados</p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="bg-brand-50 p-2 group-hover:bg-brand-600 transition-colors duration-300">
                  <Clock className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
                </div>
                <p className="font-medium text-gray-800">Pontualidade garantida ou reembolso</p>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#servicos"
                className="inline-flex justify-center items-center bg-brand-600 text-white font-bold py-4 px-10 text-sm uppercase tracking-widest hover:bg-black transition-all rounded-lg"
              >
                Nossos Serviços
              </a>
              <a
                href="#contato"
                className="inline-flex justify-center items-center bg-white text-gray-900 border-2 border-gray-900 font-bold py-4 px-10 text-sm uppercase tracking-widest hover:bg-gray-50 transition-all rounded-lg"
              >
                Fale Conosco
              </a>
            </div>
          </div>

          {/* Right Image - More Architectural/Clean */}
          <div className="relative h-[500px] lg:h-[600px] w-full">
            <div className="absolute right-0 top-0 bottom-0 w-[90%] bg-gray-100 -z-10"></div>
            <div className="absolute top-10 right-10 w-20 h-20 border-t-4 border-r-4 border-brand-600 z-20"></div>

            <img
              src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Interior Luxuoso"
              className="w-full h-full object-cover shadow-2xl relative z-10 grayscale-[20%] contrast-125 rounded-2xl"
            />

            {/* Swiss Badge */}
            <div className="absolute bottom-12 -left-6 bg-brand-600 text-white p-6 shadow-xl z-30 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <Star className="fill-white text-white" size={16} />
                <Star className="fill-white text-white" size={16} />
                <Star className="fill-white text-white" size={16} />
                <Star className="fill-white text-white" size={16} />
                <Star className="fill-white text-white" size={16} />
              </div>
              <p className="font-bold text-lg leading-tight">
                "Serviço impecável. A atenção aos detalhes é surpreendente."
              </p>
              <p className="text-xs uppercase tracking-wider mt-4 opacity-80">— Philippe G., CEO</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
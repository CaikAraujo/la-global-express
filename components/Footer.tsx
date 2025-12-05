import React from 'react';
import { Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-6">
              <span className="text-2xl font-black tracking-widest text-white">LA GLOBAL</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">EXPRESS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Excelência em serviços globais. Trazendo o padrão suíço de qualidade e precisão para a gestão do seu patrimônio.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="border border-gray-700 p-2 text-gray-400 hover:border-brand-600 hover:text-brand-600 transition-colors"><Instagram size={18}/></a>
              <a href="#" className="border border-gray-700 p-2 text-gray-400 hover:border-brand-600 hover:text-brand-600 transition-colors"><Linkedin size={18}/></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-l-2 border-brand-600 pl-3">Institucional</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Manifesto de Qualidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossa História</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Governança Corporativa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-l-2 border-brand-600 pl-3">Serviços</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Facilities Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Limpeza Técnica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Manutenção Predial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Concierge</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 border-l-2 border-brand-600 pl-3">Contato</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-600 mt-0.5" />
                <span>Headquarters<br/>Av. Brigadeiro Faria Lima, 3000<br/>São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-600" />
                <span>contact@laglobal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-600" />
                <span>+55 11 3000-0000</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>© 2024 LA Global Express. All rights reserved.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-white">Privacy Policy</a>
             <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
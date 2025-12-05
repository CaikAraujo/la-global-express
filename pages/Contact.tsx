import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-10 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid lg:grid-cols-2 gap-16">
           {/* Left Info */}
           <div className="space-y-12">
              <div>
                 <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-6">Fale Conosco.</h1>
                 <p className="text-xl text-gray-500 font-light">
                   Estamos prontos para elevar o padrão dos seus serviços. Entre em contato para uma consultoria personalizada.
                 </p>
              </div>

              <div className="space-y-8">
                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-600 transition-colors">
                       <MapPin className="text-brand-600"/>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Headquarters</h3>
                       <p className="text-gray-500">Av. Brigadeiro Faria Lima, 3000<br/>Itaim Bibi, São Paulo - SP</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-600 transition-colors">
                       <Phone className="text-brand-600"/>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Telefone</h3>
                       <p className="text-gray-500">+55 11 3000-0000<br/><span className="text-xs text-gray-400">Seg-Sex, 8h às 18h</span></p>
                    </div>
                 </div>

                 <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 bg-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-brand-600 transition-colors">
                       <Mail className="text-brand-600"/>
                    </div>
                    <div>
                       <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm mb-1">Email</h3>
                       <p className="text-gray-500">contato@laglobal.com<br/>corporate@laglobal.com</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right Form */}
           <div className="bg-gray-50 p-10 border-t-4 border-brand-600 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Envie uma mensagem</h3>
              <form className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Nome</label>
                       <input type="text" className="w-full bg-white border-none border-b-2 border-gray-200 p-3 focus:ring-0 focus:border-brand-600 transition-colors" placeholder="Seu nome"/>
                    </div>
                    <div>
                       <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Sobrenome</label>
                       <input type="text" className="w-full bg-white border-none border-b-2 border-gray-200 p-3 focus:ring-0 focus:border-brand-600 transition-colors" placeholder="Seu sobrenome"/>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Corporativo</label>
                    <input type="email" className="w-full bg-white border-none border-b-2 border-gray-200 p-3 focus:ring-0 focus:border-brand-600 transition-colors" placeholder="nome@empresa.com"/>
                 </div>

                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Interesse</label>
                    <select className="w-full bg-white border-none border-b-2 border-gray-200 p-3 focus:ring-0 focus:border-brand-600 transition-colors text-gray-700">
                       <option>Selecione um serviço</option>
                       <option>Facility Management</option>
                       <option>Limpeza Técnica</option>
                       <option>Manutenção Predial</option>
                       <option>Outros</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Mensagem</label>
                    <textarea rows={4} className="w-full bg-white border-none border-b-2 border-gray-200 p-3 focus:ring-0 focus:border-brand-600 transition-colors" placeholder="Como podemos ajudar?"></textarea>
                 </div>

                 <button className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-4 hover:bg-brand-600 transition-colors">
                    Enviar Solicitação
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = (page: string) =>
    `text-sm font-medium uppercase tracking-wide transition-colors cursor-pointer ${currentPage === page ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'
    }`;

  const handleNav = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="bg-white py-5 sticky top-0 z-50 border-b-2 border-brand-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">

          {/* Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-brand-600"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-brand-600"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-brand-600"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-brand-600"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-brand-600 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-widest text-gray-900">LA GLOBAL</span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">EXPRESS</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            <span onClick={() => handleNav('home')} className={navLinkClass('home')}>Soluções</span>
            <span onClick={() => handleNav('corporate')} className={navLinkClass('corporate')}>Corporativo</span>
            <span onClick={() => handleNav('about')} className={navLinkClass('about')}>Sobre Nós</span>
            <span onClick={() => handleNav('contact')} className={navLinkClass('contact')}>Contato</span>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-bold text-gray-900 hover:text-brand-600 transition-colors">
              Área do Cliente
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="px-6 py-2.5 bg-brand-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-black transition-all"
            >
              Orçamento
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden shadow-xl z-50">
          <div className="flex flex-col space-y-6">
            <span onClick={() => handleNav('home')} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Soluções</span>
            <span onClick={() => handleNav('corporate')} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Corporativo</span>
            <span onClick={() => handleNav('about')} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Sobre Nós</span>
            <span onClick={() => handleNav('contact')} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Contato</span>
            <hr className="border-gray-200" />
            <button onClick={() => handleNav('contact')} className="w-full text-center px-6 py-3 bg-brand-600 text-white font-bold uppercase">Solicitar Orçamento</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
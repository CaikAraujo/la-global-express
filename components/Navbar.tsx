'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `text-sm font-medium uppercase tracking-wide transition-colors cursor-pointer ${pathname === path ? 'text-brand-600 font-bold' : 'text-gray-600 hover:text-brand-600'
    }`;

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white py-5 sticky top-0 z-50 border-b-2 border-brand-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
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
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className={navLinkClass('/')}>Soluções</Link>
            <Link href="/corporate" className={navLinkClass('/corporate')}>Corporativo</Link>
            <Link href="/about" className={navLinkClass('/about')}>Sobre Nós</Link>
            <Link href="/contact" className={navLinkClass('/contact')}>Contato</Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-bold text-gray-900 hover:text-brand-600 transition-colors">
              Área do Cliente
            </a>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-brand-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-black transition-all rounded-lg"
            >
              Orçamento
            </Link>
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
            <Link href="/" onClick={closeMenu} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Soluções</Link>
            <Link href="/corporate" onClick={closeMenu} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Corporativo</Link>
            <Link href="/about" onClick={closeMenu} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Sobre Nós</Link>
            <Link href="/contact" onClick={closeMenu} className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer">Contato</Link>
            <hr className="border-gray-200" />
            <Link href="/contact" onClick={closeMenu} className="w-full text-center px-6 py-3 bg-brand-600 text-white font-bold uppercase rounded-lg">Solicitar Orçamento</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
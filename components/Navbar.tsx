'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants/navigation';

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
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/icon-express.svg"
                alt="La Global Express"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none justify-center">
              <span className="text-2xl font-black tracking-widest text-gray-900">LA GLOBAL</span>
              <span className="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">EXPRESS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-bold text-gray-900 hover:text-brand-600 transition-colors">
              Área do Cliente
            </a>
            <Link
              href="/#servicos"
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-bold text-gray-900 uppercase tracking-wider cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-200" />
            <Link href="/#servicos" onClick={closeMenu} className="w-full text-center px-6 py-3 bg-brand-600 text-white font-bold uppercase rounded-lg relative overflow-hidden flex items-center justify-center gap-2">
              <div className="relative w-5 h-5">
                <Image src="/icon-express.svg" alt="Icon" fill className="object-contain brightness-0 invert" />
              </div>
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
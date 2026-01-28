import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

const Hero = () => {
    const t = useTranslations('Corporate');
    return (
        <section className="relative pt-32 lg:pt-48 pb-20 overflow-hidden bg-white">
            {/* Background decoration - Swiss Grid */}
            <div className="absolute inset-0 bg-[size:40px_40px] bg-swiss-grid opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6 reveal-text" style={{ animationDelay: '0.1s' }}>
                            <div className="w-1 h-8 bg-brand-red"></div>
                            <span className="text-xs font-bold tracking-[0.2em] text-brand-red uppercase">{t('hero.badge')}</span>
                        </div>

                        <h1 className="font-display text-5xl lg:text-7xl font-bold text-brand-dark leading-[0.95] mb-8 reveal-text" style={{ animationDelay: '0.2s' }}>
                            {t.rich('hero.title', {
                                br: () => <br />,
                                gradient: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-800">{chunks}</span>
                            })}
                        </h1>

                        <p className="text-lg text-gray-500 leading-relaxed max-w-lg mb-10 reveal-text" style={{ animationDelay: '0.3s' }}>
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-wrap gap-4 reveal-text" style={{ animationDelay: '0.4s' }}>
                            <Link href="/contact" className="group bg-brand-dark text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-brand-red transition-all duration-300 flex items-center gap-2 rounded-lg">
                                {t('hero.cta')}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </div>
                    </div>

                    <div className="relative reveal-text" style={{ animationDelay: '0.5s' }}>
                        {/* Abstract composition representing structure/building */}
                        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group rounded-2xl">
                            {/* Decorative Red Line */}
                            <div className="absolute top-10 right-10 w-24 h-24 border-t-4 border-r-4 border-brand-red z-20"></div>

                            <img
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
                                alt="Corporate Office"
                                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                            />

                            <div className="absolute bottom-0 left-0 bg-white p-6 lg:p-10 max-w-xs shadow-2xl z-30">
                                <div className="flex gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2 bg-brand-red rounded-full"></div>)}
                                </div>
                                <p className="font-display font-bold text-xl leading-tight">
                                    {t('hero.testimonial')}
                                </p>
                                <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">— {t('hero.role')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

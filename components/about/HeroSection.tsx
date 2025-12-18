import React from 'react';
import Image from 'next/image';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative h-[90vh] w-full bg-brand-dark overflow-hidden flex flex-col justify-end">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                    alt="Modern Skyscraper Architecture"
                    fill
                    priority
                    className="object-cover opacity-40 grayscale"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/60"></div>
            </div>

            {/* Swiss Grid Overlay */}
            <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-4 pointer-events-none border-t border-white/10">
                <div className="border-r border-white/10 hidden md:block"></div>
                <div className="border-r border-white/10 hidden md:block"></div>
                <div className="border-r border-white/10 hidden md:block"></div>
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 pb-20 md:pb-32">
                <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-[1px] w-12 bg-brand-red"></div>
                        <span className="text-brand-red font-bold tracking-widest uppercase text-sm">Desde 2010</span>
                    </div>

                    <h1 className="font-display font-bold text-6xl md:text-8xl text-white leading-[0.9] mb-8">
                        PRECISION <br />
                        <span className="text-transparent stroke-white text-outline block md:inline" style={{ WebkitTextStroke: '1px white' }}>SWISS MADE.</span>
                    </h1>

                    <p className="text-gray-400 max-w-xl text-lg md:text-xl font-light leading-relaxed border-l-2 border-brand-red pl-6">
                        Não vendemos apenas serviços, entregamos tempo.
                        Unimos a precisão suíça ao calor humano para cuidar do invisível,
                        enquanto você aproveita o essencial.
                    </p>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-1/3 h-2 bg-brand-red z-30"></div>
        </section>
    );
};

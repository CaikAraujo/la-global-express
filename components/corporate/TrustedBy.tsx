import React from 'react';

const TrustedBy = () => {
    // Define logos component array to render them identically in both loops
    const Logos = () => (
        <>
            <div className="flex items-center justify-center min-w-[200px]">
                <span className="font-display font-bold text-3xl text-brand-dark tracking-tighter hover:text-brand-red cursor-default transition-colors">NORWEST</span>
            </div>
            <div className="flex items-center justify-center min-w-[200px]">
                <span className="font-display font-bold text-2xl text-brand-dark italic hover:text-brand-red cursor-default transition-colors">Vanguard.</span>
            </div>
            <div className="flex items-center justify-center min-w-[200px] group/logo">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-dark rounded-sm group-hover/logo:bg-brand-red transition-colors"></div>
                    <span className="font-display font-bold text-2xl text-brand-dark group-hover/logo:text-brand-red transition-colors">Architekt</span>
                </div>
            </div>
            <div className="flex items-center justify-center min-w-[200px]">
                <span className="font-display font-light text-3xl text-brand-dark tracking-[0.2em] hover:text-brand-red cursor-default transition-colors">SWISS<span className="font-bold">RE</span></span>
            </div>
            <div className="flex items-center justify-center min-w-[200px]">
                <span className="font-display font-bold text-2xl text-brand-dark hover:text-brand-red cursor-default transition-colors">OAK<span className="text-brand-red">mont</span></span>
            </div>
            <div className="flex items-center justify-center min-w-[200px]">
                <span className="font-display font-bold text-2xl text-brand-dark tracking-widest hover:text-brand-red cursor-default transition-colors border-2 border-brand-dark px-2 hover:border-brand-red">BLOC</span>
            </div>
            <div className="flex items-center justify-center min-w-[200px]">
                <div className="flex flex-col leading-none">
                    <span className="font-display font-black text-xl uppercase">Prime</span>
                    <span className="text-[10px] tracking-widest uppercase text-gray-400">Corp</span>
                </div>
            </div>
        </>
    );

    return (
        <section className="bg-white border-b border-gray-100 py-16 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 mb-20">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400">
                    Confiança de grandes líderes de mercado
                </p>
            </div>

            {/* Carousel Container with Gradient Masks for Fade Effect */}
            <div className="relative flex overflow-hidden">

                {/* Left Fade Gradient */}
                <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>

                {/* Right Fade Gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

                {/* The Scrolling Content - duplicated for seamless loop */}
                <div className="flex animate-infinite-scroll opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Set 1 */}
                    <div className="flex items-center gap-16 mx-8">
                        <Logos />
                    </div>
                    {/* Set 2 (Duplicate) */}
                    <div className="flex items-center gap-16 mx-8">
                        <Logos />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;

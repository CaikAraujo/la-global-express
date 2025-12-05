import React from 'react';
import Image from 'next/image';
import { ServiceItem } from './types';
import { ArrowRightIcon } from './Icons';

interface ServiceCardProps {
    service: ServiceItem;
    isHighlighted: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, isHighlighted }) => {
    return (
        <div
            className={`
        group relative flex flex-col h-full bg-white transition-all duration-500 overflow-hidden
        ${isHighlighted
                    ? 'ring-2 ring-brand-red shadow-2xl scale-[1.02] z-10 rounded-2xl'
                    : 'hover:-translate-y-2 hover:shadow-xl rounded-2xl border border-gray-100'
                }
      `}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <div className={`absolute inset-0 bg-brand-dark/20 transition-opacity duration-500 group-hover:opacity-0 z-10`}></div>
                <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Tag Overlay */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-brand-dark shadow-sm rounded-md">
                        {service.tag}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-6 pt-8 relative">
                {/* Decorative Line */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gray-100 group-hover:bg-brand-red transition-colors duration-500"></div>

                <h3 className="font-sans text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors duration-300">
                    {service.title}
                </h3>

                <p className="font-sans text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                    {service.description}
                </p>

                <div className="mt-auto">
                    <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-dark group-hover:text-brand-red transition-all duration-300 uppercase group/btn">
                        Solicitar Proposta
                        <ArrowRightIcon className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

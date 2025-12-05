import React from 'react';
import { Feature } from './types';
import { motion } from 'framer-motion';

interface Props {
    feature: Feature;
    index: number;
}

export const FeatureCard: React.FC<Props> = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group relative p-8 border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900/80 transition-all duration-500 overflow-hidden"
        >
            {/* Hover accent line */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="flex flex-col h-full gap-6">
                {/* Icon Container */}
                <div className="w-12 h-12 flex items-center justify-center border border-neutral-700 rounded-sm text-neutral-400 group-hover:text-brand-red group-hover:border-brand-red/50 transition-colors duration-300">
                    <feature.icon strokeWidth={1.5} size={24} />
                </div>

                {/* Text Content */}
                <div>
                    <h3 className="text-white font-display text-lg font-bold uppercase tracking-wide mb-3 group-hover:translate-x-1 transition-transform duration-300">
                        {feature.title}
                    </h3>
                    <p className="text-neutral-400 font-sans text-sm leading-relaxed text-justify group-hover:text-neutral-300 transition-colors duration-300">
                        {feature.description}
                    </p>
                </div>
            </div>

            {/* Background Glow on Hover */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-red/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};

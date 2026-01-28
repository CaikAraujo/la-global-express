'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Scale, ArrowUpRight, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

// --- Types ---
interface ESGItem {
    id: 'eco' | 'social' | 'gov';
    icon: LucideIcon;
    variant: 'eco' | 'social' | 'gov';
}

interface ESGCardProps {
    item: ESGItem;
    index: number;
}

// --- Constants ---
const ESG_DATA: ESGItem[] = [
    {
        id: 'eco',
        icon: Leaf,
        variant: 'eco',
    },
    {
        id: 'social',
        icon: Users,
        variant: 'social',
    },
    {
        id: 'gov',
        icon: Scale,
        variant: 'gov',
    },
];

// --- Components ---
const ESGCard: React.FC<ESGCardProps> = ({ item, index }) => {
    const t = useTranslations('Corporate.esg');
    const Icon = item.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative flex flex-col justify-between p-8 bg-brand-dark rounded-2xl border border-brand-dark hover:border-brand-red/50 shadow-xl shadow-brand-dark/10 transition-all duration-500 overflow-hidden"
        >
            {/* Decorative Red Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle top line accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-red transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    {/* Icon Container */}
                    <div className="relative">
                        <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                            <Icon className="w-7 h-7 text-white group-hover:text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="p-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                        <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                    </div>
                </div>

                <h3 className="text-2xl font-sans font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {t(`items.${item.id}.title`)}
                </h3>

                <p className="text-gray-400 leading-relaxed font-sans text-base group-hover:text-gray-200 transition-colors">
                    {t(`items.${item.id}.desc`)}
                </p>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
                <span className="text-xs font-bold tracking-widest uppercase text-brand-red">
                    {t('pillar')} 0{index + 1}
                </span>
            </div>
        </motion.div>
    );
};

const ESGSection: React.FC = () => {
    const t = useTranslations('Corporate.esg');

    return (
        <section className="relative w-full py-24 px-4 md:px-8 bg-white overflow-hidden">

            {/* Abstract Background Elements - Subtle Corporate Feel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Red accent blob */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-brand-red opacity-[0.03] blur-[120px]" />
                {/* Dark accent blob */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-brand-dark opacity-[0.02] blur-[100px]" />

                {/* Technical Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="mb-6 inline-flex items-center justify-center"
                    >
                        {/* Using Brand Red for the icon to match the site's accent color */}
                        <Leaf className="w-8 h-8 text-brand-red" strokeWidth={2} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-brand-dark mb-6 tracking-tight"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="max-w-3xl text-lg md:text-xl text-brand-slate font-sans leading-relaxed"
                    >
                        {t.rich('description', {
                            highlight: (chunks) => <span className="text-brand-red font-semibold">{chunks}</span>
                        })}
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {ESG_DATA.map((item, index) => (
                        <ESGCard key={item.id} item={item} index={index} />
                    ))}
                </div>

                {/* Bottom Call to Action / Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 flex justify-center"
                >
                    <button className="group relative px-8 py-3 bg-brand-red text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-brand-red/20 transition-transform hover:scale-105 active:scale-95">
                        <span className="relative z-10 flex items-center gap-2">
                            {t('cta')}
                            <span className="text-white/70 group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ESGSection;

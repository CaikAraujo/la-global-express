import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

interface PremiumSliderProps {
    label: string;
    description?: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit: string;
    onChange: (value: number) => void;
    secondaryLabel?: string;
    minLabel: string;
    maxLabel: string;
    accentColor?: string; // Class name suffix or hex? Let's use Tailwind classes for flexibility if possible, or simple prop.
    // For simplicity, let's assume brand-red is default, but allow overriding if needed, keeping it simple for now.
}

export const PremiumSlider: React.FC<PremiumSliderProps> = ({
    label,
    description,
    value,
    min,
    max,
    step = 1,
    unit,
    onChange,
    secondaryLabel,
    minLabel,
    maxLabel,
}) => {
    // Calculate percentage for width
    const range = max - min;
    const percentage = ((value - min) / range) * 100;

    return (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-red"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                        {label}
                    </h2>
                    {description && (
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                            <Info size={14} />
                            {description}
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-5xl font-display font-bold text-brand-dark tabular-nums tracking-tight">
                        {value}
                        <span className="text-xl text-slate-400 font-medium ml-1">{unit}</span>
                    </span>
                    {secondaryLabel && (
                        <span className="text-brand-red font-bold text-sm bg-red-50 px-2 py-1 rounded mt-1">
                            {secondaryLabel}
                        </span>
                    )}
                </div>
            </div>

            <div className="relative h-12 flex items-center">
                {/* Track Background */}
                <div className="absolute w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    {/* Fill */}
                    <motion.div
                        className="h-full bg-gradient-to-r from-brand-red to-brand-dark"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                    />
                </div>

                {/* Native Input (Invisible but interactive) */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-12 absolute z-10 opacity-0 cursor-ew-resize"
                />
            </div>

            <div className="flex justify-between mt-2 text-xs font-bold text-slate-300 uppercase tracking-widest px-1">
                <span>{minLabel}</span>
                <span>{maxLabel}</span>
            </div>
        </section>
    );
};

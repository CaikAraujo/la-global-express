import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface CounterProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min?: number;
    max?: number;
}

export const Counter: React.FC<CounterProps> = ({ label, value, onChange, min = 0, max = 10 }) => {
    const handleDecrease = () => {
        if (value > min) onChange(value - 1);
    };

    const handleIncrease = () => {
        if (value < max) onChange(value + 1);
    };

    return (
        <div className="flex items-center justify-between bg-slate-100 rounded-full p-1 pr-6 pl-2 w-full max-w-[280px]">
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleDecrease}
                disabled={value <= min}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${value <= min
                        ? 'bg-transparent text-slate-300'
                        : 'bg-white text-brand-dark shadow-sm border border-slate-200 hover:border-brand-red/30'
                    }`}
                type="button"
            >
                <Minus size={16} strokeWidth={3} />
            </motion.button>

            <span className="flex-1 text-center font-semibold text-slate-700 select-none">
                {value} <span className="font-normal text-slate-500">{label}</span>
            </span>

            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleIncrease}
                disabled={value >= max}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${value >= max
                        ? 'bg-transparent text-slate-300'
                        : 'bg-white text-brand-dark shadow-sm border border-slate-200 hover:border-brand-red/30'
                    }`}
                type="button"
            >
                <Plus size={16} strokeWidth={3} />
            </motion.button>
        </div>
    );
};

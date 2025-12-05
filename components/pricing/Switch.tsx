import React from 'react';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    leftLabel: string;
    rightLabel: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, leftLabel, rightLabel }) => {
    return (
        <div className="flex items-center justify-center gap-4 mb-12 font-sans">
            <span className={`text-sm font-medium transition-colors ${!checked ? 'text-brand-dark' : 'text-gray-400'}`}>
                {leftLabel}
            </span>
            <button
                onClick={() => onChange(!checked)}
                className="relative w-14 h-8 bg-gray-200 rounded-full p-1 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-red"
            >
                <div
                    className={`w-6 h-6 bg-brand-red rounded-full shadow-md transform transition-transform duration-300 ease-spring ${checked ? 'translate-x-6' : 'translate-x-0'
                        }`}
                />
            </button>
            <span className={`text-sm font-medium transition-colors ${checked ? 'text-brand-dark' : 'text-gray-400'}`}>
                {rightLabel}
                <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand-red bg-red-50 rounded-full border border-red-100 uppercase">
                    -10% OFF
                </span>
            </span>
        </div>
    );
};

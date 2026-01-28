'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { motion } from 'framer-motion';

export const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const languages = [
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
        { code: 'de', label: 'DE' },
    ];

    if (mobile) {
        return (
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full w-max">
                {languages.map((lang) => {
                    const isActive = locale === lang.code;
                    return (
                        <button
                            key={lang.code}
                            onClick={() => switchLocale(lang.code)}
                            className={`
                relative px-4 py-2 rounded-full text-xs font-bold transition-all duration-300
                ${isActive ? 'text-white' : 'text-gray-500 hover:text-brand-dark'}
              `}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeLangMobile"
                                    className="absolute inset-0 bg-brand-red rounded-full shadow-sm"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{lang.label}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
            {languages.map((lang) => {
                const isActive = locale === lang.code;
                return (
                    <button
                        key={lang.code}
                        onClick={() => switchLocale(lang.code)}
                        className={`
              relative px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all duration-300
              ${isActive ? 'text-white' : 'text-gray-500 hover:text-brand-dark hover:bg-gray-50'}
            `}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeLangDesktop"
                                className="absolute inset-0 bg-brand-red rounded-full shadow-sm"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{lang.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, SearchIcon, LoaderIcon, XIcon, ArrowRightIcon } from './Icons';
import { findBestService } from './geminiService';

interface AISearchProps {
    onServiceFound: (serviceId: string) => void;
    onReset: () => void;
}

export const AISearch: React.FC<AISearchProps> = ({ onServiceFound, onReset }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultMessage, setResultMessage] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setResultMessage(null);
        onReset();

        const result = await findBestService(query);

        setLoading(false);
        setResultMessage(result.message);

        if (result.serviceId) {
            onServiceFound(result.serviceId);
        }
    };

    const clear = () => {
        setQuery('');
        setResultMessage(null);
        onReset();
        if (inputRef.current) inputRef.current.focus();
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-dark rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500" />
                <SparklesIcon className="w-4 h-4 text-brand-red" />
                <span className="text-sm font-medium tracking-wide">Busca Inteligente por IA</span>
                <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </button>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto relative z-20">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-red to-yellow-500 rounded-full opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
                <div className="relative flex items-center bg-white rounded-full shadow-xl p-2 pl-6">
                    <SparklesIcon className={`w-5 h-5 text-brand-red mr-3 ${loading ? 'animate-pulse' : ''}`} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Como podemos ajudar? (ex: 'Preciso consertar uma infiltração')"
                        className="flex-grow bg-transparent border-none outline-none text-brand-dark placeholder-gray-400 text-base py-2"
                        disabled={loading}
                    />

                    {query && !loading && (
                        <button type="button" onClick={clear} className="p-2 text-gray-400 hover:text-gray-600">
                            <XIcon className="w-4 h-4" />
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !query}
                        className={`ml-2 px-6 py-2.5 rounded-full text-white font-medium text-sm transition-all duration-300 flex items-center gap-2
              ${loading || !query ? 'bg-gray-200 cursor-not-allowed text-gray-400' : 'bg-brand-dark hover:bg-brand-red shadow-lg hover:shadow-brand-red/30'}
            `}
                    >
                        {loading ? <LoaderIcon className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
                        {loading ? 'Pensando...' : 'Buscar'}
                    </button>
                </div>
            </form>

            {/* Result feedback bubble */}
            {resultMessage && (
                <div className="absolute top-full left-0 right-0 mt-4 p-4 bg-white/95 backdrop-blur-sm border border-brand-red/10 rounded-2xl shadow-xl animate-[fadeIn_0.3s_ease-out]">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-brand-red/10 rounded-full shrink-0">
                            <SparklesIcon className="w-4 h-4 text-brand-red" />
                        </div>
                        <div>
                            <p className="text-brand-dark text-sm leading-relaxed font-medium">
                                {resultMessage}
                            </p>
                            <button onClick={() => { setIsOpen(false); setResultMessage(null); }} className="text-xs text-gray-400 mt-2 hover:text-brand-dark underline decoration-dotted">
                                Fechar assistente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

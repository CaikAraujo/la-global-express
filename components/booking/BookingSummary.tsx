import React from 'react';
import { ArrowRight, Check, Clock, Calendar } from 'lucide-react';

import { ServiceItem } from '@/types/booking';

interface BookingSummaryProps {
    serviceName: string;
    frequency: string;
    duration: number;
    price: number;
    step: number;
    onNext: () => void;
    canProceed: boolean;
    items?: ServiceItem[];
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
    serviceName,
    frequency,
    duration,
    price,
    step,
    onNext,
    canProceed,
    items = []
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-red rounded-full"></span>
                Resumo do Pedido
            </h3>

            <div className="space-y-6 mb-8">
                {/* Services List */}
                <div className="space-y-4">
                    {items && items.length > 0 ? (
                        items.map((item, idx) => (
                            <div key={item.id + idx} className="flex flex-col gap-1 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="flex justify-between items-start">
                                    <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                                    <p className="font-bold text-gray-900 text-sm">CHF {item.price}</p>
                                </div>
                                {item.description && (
                                    <div className="text-xs text-gray-500 mt-1 space-y-1">
                                        {item.description.split(/(?:\n \+ |\n\+ | \+ )/g).map((part, i) => (
                                            <p key={i} className="leading-relaxed">
                                                {part.trim().startsWith('+') ? part.trim().substring(1).trim() : part.trim()}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                {item.duration > 0 && (
                                    <div className="flex items-center gap-1.5 text-xs text-brand-red font-medium mt-1">
                                        <Clock size={12} />
                                        <span>{item.duration}h estimado</span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Serviço</p>
                                <p className="font-medium text-gray-900">{serviceName || 'Selecione...'}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Totals Section */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    {duration > 0 && (
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Duração Total</span>
                            <span className="font-bold text-gray-900 flex items-center gap-1">
                                <Clock size={14} className="text-brand-red" />
                                {duration} horas
                            </span>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Frequência</span>
                        <span className="font-bold text-gray-900">{frequency}</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 mt-2">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-bold text-gray-600">Total Estimado</span>
                            <div className="text-right">
                                <p className="text-2xl font-display font-bold text-brand-dark">
                                    CHF {price.toFixed(2)}
                                </p>
                                {frequency !== 'Uma vez' && (
                                    <p className="text-[10px] text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">
                                        {frequency === 'Semanal' ? '20%' : frequency === 'Quinzenal' ? '15%' : '10%'} OFF
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!canProceed}
                className={`
                    w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                    ${canProceed
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20 hover:shadow-xl hover:-translate-y-0.5'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                `}
            >
                {step === 3 ? 'Finalizar Agendamento' : 'Avançar'}
                {step < 3 && <ArrowRight size={18} />}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Check size={12} />
                <span>Compra 100% Segura</span>
            </div>
        </div>
    );
};

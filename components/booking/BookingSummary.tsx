import React from 'react';
import { ArrowRight, Check, Clock, Calendar } from 'lucide-react';

interface BookingSummaryProps {
    serviceName: string;
    frequency: string;
    duration: number;
    price: number;
    step: number;
    onNext: () => void;
    canProceed: boolean;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
    serviceName,
    frequency,
    duration,
    price,
    step,
    onNext,
    canProceed
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-red rounded-full"></span>
                Resumo do Pedido
            </h3>

            <div className="space-y-4 mb-8">
                {/* Service */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Serviço</p>
                        <p className="font-medium text-gray-900">{serviceName || 'Selecione...'}</p>
                    </div>
                </div>

                {/* Duration/Frequency */}
                <div className="flex justify-between items-start pb-4 border-b border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Duração</p>
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock size={16} className="text-brand-red" />
                            <span>{duration} horas</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Frequência</p>
                        <div className="flex items-center gap-2 justify-end text-gray-700">
                            <Calendar size={16} className="text-brand-red" />
                            <span>{frequency}</span>
                        </div>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-2">
                    <div className="flex justify-between items-end mb-1">
                        <p className="text-sm font-bold text-gray-500">Total Estimado</p>
                        <div className="text-right">
                            <p className="text-3xl font-display font-bold text-brand-dark">
                                CHF {price.toFixed(2)}
                            </p>
                            {frequency !== 'Uma vez' && (
                                <p className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full inline-block mt-1">
                                    {frequency === 'Semanal' ? '20%' : frequency === 'Quinzenal' ? '15%' : '10%'} OFF aplicado
                                </p>
                            )}
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

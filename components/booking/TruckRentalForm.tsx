import React, { useState, useEffect } from 'react';
import { Truck, Box, Clock, Fuel, Info, CheckCircle2, User, Package, ShoppingCart } from 'lucide-react';

interface TruckOption {
    id: string;
    name: string;
    description: string;
    capacity: string;
    basePrice: number;
    hourlyRate: number;
}

const TRUCK_OPTIONS: TruckOption[] = [
    {
        id: 'small',
        name: 'Utilitário / Fiorino',
        description: 'Ideal para pequenas cargas e caixas.',
        capacity: 'Até 600kg • 3m³',
        basePrice: 150,
        hourlyRate: 80
    },
    {
        id: 'medium',
        name: 'VUC / Caminhão 3/4',
        description: 'Mudanças de apartamentos médios.',
        capacity: 'Até 3.500kg • 15m³',
        basePrice: 350,
        hourlyRate: 120
    },
    {
        id: 'large',
        name: 'Caminhão Toco',
        description: 'Grandes mudanças e móveis pesados.',
        capacity: 'Até 6.000kg • 35m³',
        basePrice: 600,
        hourlyRate: 180
    }
];

const TRUCK_EXTRAS_OPTIONS = [
    { id: 'helper', label: 'Ajudante Extra (Turno)', price: 150, icon: User, description: 'Profissional para carga e descarga' },
    { id: 'trolley', label: 'Carrinho de Mão', price: 50, icon: ShoppingCart, description: 'Facilita o transporte de caixas' },
    { id: 'bubble_wrap', label: 'Rolo de Plástico Bolha', price: 80, icon: Package, description: 'Proteção para móveis e eletrônicos' },
    { id: 'boxes', label: 'Kit 10 Caixas de Mudança', price: 120, icon: Box, description: 'Caixas reforçadas 60x40x40' },
];

interface TruckRentalFormProps {
    onUpdate: (data: any) => void;
    showExtras?: boolean;
}

export const TruckRentalForm: React.FC<TruckRentalFormProps> = ({ onUpdate, showExtras = false }) => {
    const [selectedTruck, setSelectedTruck] = useState<string>('medium');
    const [duration, setDuration] = useState<number>(4);
    const [extras, setExtras] = useState<string[]>([]);

    useEffect(() => {
        const truck = TRUCK_OPTIONS.find(t => t.id === selectedTruck);
        if (!truck) return;

        let totalPrice = truck.basePrice + (truck.hourlyRate * duration);

        // Add extras cost
        const selectedExtras = TRUCK_EXTRAS_OPTIONS.filter(e => extras.includes(e.id));
        const extrasCost = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
        totalPrice += extrasCost;

        let details = `Transporte: ${truck.name} - ${duration}h`;
        if (selectedExtras.length > 0) {
            details += ` + Extras: ${selectedExtras.map(e => e.label).join(', ')}`;
        }

        onUpdate({
            price: totalPrice,
            duration: duration,
            serviceDetails: {
                type: 'Truck Rental',
                truckName: truck.name,
                truckId: truck.id,
                description: details,
                extras: selectedExtras.map(e => e.label)
            }
        });
    }, [selectedTruck, duration, extras, onUpdate]);

    const toggleExtra = (id: string) => {
        setExtras(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    if (showExtras) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Itens Opcionais</h2>
                    <p className="text-gray-500 text-sm">Adicione facilidades para sua mudança ou transporte.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {TRUCK_EXTRAS_OPTIONS.map((extra) => {
                        const isSelected = extras.includes(extra.id);
                        const Icon = extra.icon;
                        return (
                            <button
                                key={extra.id}
                                onClick={() => toggleExtra(extra.id)}
                                className={`
                                    p-4 text-left rounded-xl border-2 flex items-start gap-4 transition-all duration-200
                                    ${isSelected
                                        ? 'bg-brand-cream border-brand-red text-brand-dark shadow-sm'
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'}
                                `}
                            >
                                <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-sm">{extra.label}</h3>
                                        <span className={`text-sm font-bold ${isSelected ? 'text-brand-red' : 'text-gray-400'}`}>
                                            +R$ {extra.price}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{extra.description}</p>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${isSelected ? 'border-brand-red bg-brand-red' : 'border-gray-200'
                                    }`}>
                                    {isSelected && <CheckCircle2 size={12} className="text-white" />}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Configure o Transporte</h2>
                <p className="text-gray-500 text-sm">Escolha o veículo ideal e o tempo necessário.</p>
            </div>

            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tipo de Veículo</label>
                <div className="grid grid-cols-1 gap-4">
                    {TRUCK_OPTIONS.map(truck => (
                        <div
                            key={truck.id}
                            onClick={() => setSelectedTruck(truck.id)}
                            className={`
                                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                ${selectedTruck === truck.id
                                    ? 'border-brand-red bg-red-50/50'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'}
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${selectedTruck === truck.id ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <Truck size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold ${selectedTruck === truck.id ? 'text-brand-dark' : 'text-gray-700'}`}>
                                            {truck.name}
                                        </h3>
                                        <span className="text-sm font-bold text-brand-red">
                                            R$ {truck.basePrice}
                                            <span className="text-gray-400 text-xs font-normal"> base</span>
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{truck.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Box size={14} /> {truck.capacity}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Fuel size={14} /> +R$ {truck.hourlyRate}/h
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tempo de Uso</label>
                    <span className="font-bold text-brand-red">{duration} horas</span>
                </div>
                <input
                    type="range"
                    min="2"
                    max="12"
                    step="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-red"
                />
                <div className="flex justify-between text-xs text-gray-400">
                    <span>2h (Mínimo)</span>
                    <span>12h (Turno)</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 text-blue-800 text-xs leading-relaxed">
                    <Info className="shrink-0 w-4 h-4 mt-0.5" />
                    <p>O tempo de uso começa a contar na chegada do veículo. Considere o tempo de carga, trânsito e descarga.</p>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { Truck, Box, Clock, Fuel, Info, CheckCircle2, User, Package, ShoppingCart, Car } from 'lucide-react';

interface TruckOption {
    id: string;
    name: string;
    description: string;
    capacity: string;
    basePrice: number;
    hourlyRate: number;
    icon: any;
    isFixedPrice?: boolean;
}

const TRUCK_OPTIONS = [
    {
        id: 'car',
        name: 'Carro',
        description: 'Pequenos volumes e caixas.',
        capacity: 'Até 400kg • 1.5m³',
        price4h: 80,
        price8h: 80,
        isFixedPrice: true,
        icon: Car
    },
    {
        id: 'van',
        name: 'Furgão',
        description: 'Ideal para pequenas cargas e caixas.',
        capacity: 'Até 600kg • 3m³',
        price4h: 120,
        price8h: 220,
        icon: Truck
    },
    {
        id: 'truck',
        name: 'Caminhão',
        description: 'Mudanças de apartamentos médios.',
        capacity: 'Até 3.500kg • 15m³',
        price4h: 150,
        price8h: 280,
        icon: Truck
    }
];

const TRUCK_EXTRAS_OPTIONS = [
    { id: 'driver', label: 'Motorista Profissional (8h)', price: 320, icon: User, description: 'Motorista especializado' },
    { id: 'assembler', label: 'Montador e Embalador (8h)', price: 270, icon: Package, description: 'Mão de obra para montagem' },
    { id: 'helper', label: 'Ajudante (8h)', price: 240, icon: User, description: 'Auxiliar para carga e descarga' },
    { id: 'trolley', label: 'Carrinho de Mão', price: 50, icon: ShoppingCart, description: 'Facilita o transporte' },
    { id: 'bubble_wrap', label: 'Plástico Bolha', price: 80, icon: Package, description: 'Proteção extra' },
    { id: 'boxes', label: 'Kit 10 Caixas', price: 120, icon: Box, description: 'Caixas 60x40x40' },
];

interface TruckRentalFormProps {
    onUpdate: (data: any) => void;
    showExtras?: boolean;
}

export const TruckRentalForm: React.FC<TruckRentalFormProps> = ({ onUpdate, showExtras = false }) => {
    const [selectedTruck, setSelectedTruck] = useState<string>('car');
    const [period, setPeriod] = useState<number>(8); // 4 or 8
    const [extraHours, setExtraHours] = useState<number>(0);
    const [extras, setExtras] = useState<string[]>([]);

    useEffect(() => {
        const truck = TRUCK_OPTIONS.find(t => t.id === selectedTruck);
        if (!truck) return;

        // Base price from pack
        let totalPrice = 0;
        if (truck.isFixedPrice) {
            totalPrice = truck.price4h; // Fixed price uses price4h field
        } else {
            totalPrice = period === 4 ? truck.price4h : truck.price8h;
        }

        // Extra hours (30 CHF)
        totalPrice += extraHours * 30;

        // Add extras cost
        const selectedExtras = TRUCK_EXTRAS_OPTIONS.filter(e => extras.includes(e.id));
        const extrasCost = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
        totalPrice += extrasCost;

        const totalDuration = truck.isFixedPrice ? 24 + extraHours : period + extraHours;

        let details = `Veículo: ${truck.name} (${truck.isFixedPrice ? '24h' : period + 'h'})`;
        if (extraHours > 0) details += ` + ${extraHours}h extras`;
        if (selectedExtras.length > 0) {
            details += `\nExtras: ${selectedExtras.map(e => e.label).join(', ')}`;
        }

        onUpdate({
            price: totalPrice,
            duration: totalDuration,
            serviceDetails: {
                type: 'Truck Rental',
                truckName: truck.name,
                truckId: truck.id,
                description: details,
                extras: selectedExtras.map(e => e.label)
            }
        });
    }, [selectedTruck, period, extraHours, extras, onUpdate]);

    const toggleExtra = (id: string) => {
        setExtras(prev =>
            prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Configure o Transporte</h2>
                <p className="text-gray-500 text-sm">Escolha o tamanho e o período.</p>
            </div>

            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">1. Escolha o Veículo</label>
                <div className="grid grid-cols-1 gap-4">
                    {TRUCK_OPTIONS.map(truck => (
                        <div
                            key={truck.id}
                            onClick={() => {
                                if (selectedTruck === truck.id && !truck.isFixedPrice) {
                                    setPeriod(prev => prev === 4 ? 8 : 4);
                                } else {
                                    setSelectedTruck(truck.id);
                                }
                            }}
                            className={`
                                relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                                ${selectedTruck === truck.id
                                    ? 'border-brand-red bg-red-50/50'
                                    : 'border-gray-100 hover:border-gray-200 bg-white'}
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${selectedTruck === truck.id ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <truck.icon size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold ${selectedTruck === truck.id ? 'text-brand-dark' : 'text-gray-700'}`}>
                                            {truck.name}
                                        </h3>
                                        <div className="text-right">
                                            {truck.isFixedPrice ? (
                                                <span className="block text-sm font-bold text-brand-red">
                                                    CHF {truck.price4h} <span className="text-xs font-normal text-gray-500">/ 24h</span>
                                                </span>
                                            ) : (
                                                <>
                                                    <span className={`block ${selectedTruck === truck.id ? (period === 4 ? 'text-sm font-bold text-brand-red' : 'text-xs text-gray-400') : 'text-sm font-bold text-brand-red'}`}>
                                                        CHF {truck.price4h} <span className={`text-xs font-normal ${selectedTruck === truck.id ? (period === 4 ? 'text-gray-500' : 'text-gray-400') : 'text-gray-500'}`}>/ 4h</span>
                                                    </span>
                                                    <span className={`block ${selectedTruck === truck.id ? (period === 8 ? 'text-sm font-bold text-brand-red' : 'text-xs text-gray-400') : 'text-xs text-gray-400'}`}>
                                                        CHF {truck.price8h} / 8h
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{truck.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 font-medium">
                                        <span className="flex items-center gap-1">
                                            <Box size={14} /> {truck.capacity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Extras Section */}
            <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">2. Mão de Obra e Equipamentos</label>
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
                                            +CHF {extra.price}
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

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">3. Horas Extras (+30 CHF/h)</label>
                        {extraHours > 0 && <span className="text-brand-red font-bold">+{extraHours}h</span>}
                    </div>
                    <div className="flex items-center gap-4 bg-white border border-gray-200 p-2 rounded-xl w-fit">
                        <button
                            onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-lg"
                        >
                            -
                        </button>
                        <span className="w-12 text-center font-bold text-lg">{extraHours}</span>
                        <button
                            onClick={() => setExtraHours(extraHours + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-red text-white font-bold text-lg shadow-sm hover:shadow-md transition-all"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 text-blue-800 text-xs leading-relaxed">
                    <Info className="shrink-0 w-4 h-4 mt-0.5" />
                    <p>O tempo começa a contar na chegada. Motorista e ajudantes (se contratados) cumprem o turno selecionado.</p>
                </div>
            </div>
        </div>
    );
};

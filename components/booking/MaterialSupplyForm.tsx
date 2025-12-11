import React, { useState, useEffect } from 'react';
import { Box, Package, Scroll, Scissors, ShoppingBag, ShoppingCart, Plus, Minus } from 'lucide-react';

interface MaterialOption {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: React.ElementType;
    badge?: string;
}

const MATERIAL_OPTIONS: MaterialOption[] = [
    {
        id: 'box-large',
        name: 'Cartão Grande',
        description: 'Caixa reforçada para itens volumosos',
        price: 4.99,
        icon: Box
    },
    {
        id: 'box-book',
        name: 'Cartão Livro',
        description: 'Ideal para livros e objetos pesados',
        price: 2.99,
        icon: Package
    },
    {
        id: 'tape-pvc',
        name: 'Scott PVC',
        description: 'Fita adesiva de alta fixação',
        price: 3.69,
        icon: Scissors
    },
    {
        id: 'film',
        name: 'Films',
        description: 'Filme stretch para proteção',
        price: 12.99,
        icon: Scroll
    },
    {
        id: 'wardrobe',
        name: 'Ponderie (Porta-Roupas)',
        description: 'Caixa com cabideiro para roupas',
        price: 11.99,
        icon: ShoppingBag,
        badge: 'Prático'
    },
    {
        id: 'cover-box',
        name: 'Cobertura Boxe',
        description: 'Proteção para colchões e móveis',
        price: 7.99,
        icon: ShoppingBag
    },
    {
        id: 'blanket',
        name: 'Cobertura Déménageur',
        description: 'Cobertor profissional de mudança',
        price: 11.99,
        icon: ShoppingBag
    },
    {
        id: 'bubble-10m',
        name: 'Bolha 10 Metros',
        description: 'Plástico bolha para proteção',
        price: 11.99,
        icon: Package
    },
    {
        id: 'trolley',
        name: 'Chariot Profissional',
        description: 'Carrinho para transporte de cargas',
        price: 79.99,
        icon: ShoppingCart,
        badge: 'Essencial'
    }
];

interface MaterialSupplyFormProps {
    onUpdate: (data: any) => void;
}

export const MaterialSupplyForm: React.FC<MaterialSupplyFormProps> = ({ onUpdate }) => {
    const [quantities, setQuantities] = useState<Record<string, number>>({});

    const updateQuantity = (id: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            const newQuantities = { ...prev, [id]: next };
            if (next === 0) delete newQuantities[id];
            return newQuantities;
        });
    };

    useEffect(() => {
        let totalPrice = 0;
        const selectedItems: string[] = [];

        Object.entries(quantities).forEach(([id, qty]) => {
            const item = MATERIAL_OPTIONS.find(opt => opt.id === id);
            if (item && qty > 0) {
                totalPrice += item.price * qty;
                selectedItems.push(`${qty}x ${item.name}`);
            }
        });

        // Enforce minimum order if needed, but for now just pass 0 if empty
        // Material supply usually requires delivery, so maybe a base fee? 
        // Let's assume price includes delivery if > X, or handle delivery in logic.
        // For simplicity, we just pass the material cost.

        onUpdate({
            price: totalPrice,
            duration: 1, // Placeholder duration for delivery window
            serviceDetails: {
                type: 'Material Supply',
                description: selectedItems.length > 0
                    ? selectedItems.join(', ')
                    : 'Nenhum item selecionado',
                items: quantities
            }
        });
    }, [quantities, onUpdate]);

    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Escolha seus Materiais</h2>
                <p className="text-gray-500 text-sm">Selecione os itens e quantidades que você precisa.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {MATERIAL_OPTIONS.map((item) => {
                    const quantity = quantities[item.id] || 0;
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className={`
                                relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4
                                ${quantity > 0
                                    ? 'border-brand-red bg-white shadow-sm'
                                    : 'border-gray-100 bg-white hover:border-gray-200'}
                            `}
                        >
                            {item.badge && (
                                <span className="absolute -top-3 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                    {item.badge}
                                </span>
                            )}

                            <div className="flex items-center gap-4 flex-1">
                                <div className={`p-3 rounded-lg ${quantity > 0 ? 'bg-red-50 text-brand-red' : 'bg-gray-100 text-gray-400'}`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                    </div>
                                    <p className="text-xs text-gray-500">{item.description}</p>
                                    <p className="text-sm font-bold text-brand-red mt-1">CHF {item.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-200">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    disabled={quantity === 0}
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:border-brand-red hover:text-brand-red transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-6 text-center font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-200 text-brand-red hover:bg-brand-red hover:text-white transition-all shadow-sm"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {totalItems === 0 && (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200 text-sm flex gap-3">
                    <ShoppingBag size={20} className="shrink-0" />
                    <p>Selecione pelo menos um item para continuar.</p>
                </div>
            )}
        </div>
    );
};

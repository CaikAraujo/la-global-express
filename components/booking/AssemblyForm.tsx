import React, { useState, useEffect } from 'react';
import { Bed, Sofa, Tv, Monitor, Utensils, Briefcase, Plus, Minus, ChevronDown, ChevronUp, Hammer } from 'lucide-react';

interface FurnitureItem {
    id: string;
    name: string;
    price: number;
    minutes: number;
}

interface FurnitureCategory {
    id: string;
    title: string;
    icon: React.ElementType;
    items: FurnitureItem[];
}

const FURNITURE_CATEGORIES: FurnitureCategory[] = [
    {
        id: 'bedroom',
        title: 'Chambre',
        icon: Bed,
        items: [
            { id: 'wardrobe-2', name: 'Armoire 2 Portes', price: 90, minutes: 90 },
            { id: 'wardrobe-3', name: 'Armoire 3 Portes', price: 120, minutes: 120 },
            { id: 'wardrobe-6', name: 'Armoire 6 Portes', price: 200, minutes: 180 },
            { id: 'bed-single', name: 'Lit Simple', price: 60, minutes: 45 },
            { id: 'bed-double', name: 'Lit Double', price: 80, minutes: 60 },
            { id: 'dresser', name: 'Commode', price: 70, minutes: 60 },
            { id: 'nightstand', name: 'Table de Chevet', price: 30, minutes: 30 },
        ]
    },
    {
        id: 'living',
        title: 'Salon',
        icon: Sofa,
        items: [
            { id: 'rack', name: 'Meuble TV simple', price: 60, minutes: 45 },
            { id: 'panel', name: 'Panneau TV', price: 80, minutes: 60 },
            { id: 'home-theater', name: 'Meuble Home Cinéma', price: 150, minutes: 120 },
            { id: 'sofa', name: 'Canapé (Montage)', price: 50, minutes: 30 },
            { id: 'buffet', name: 'Buffet / Commode', price: 70, minutes: 60 },
        ]
    },
    {
        id: 'kitchen',
        title: 'Cuisine',
        icon: Utensils,
        items: [
            { id: 'kitchen-cabinet-s', name: 'Armoire Murale (Petit)', price: 50, minutes: 45 },
            { id: 'kitchen-cabinet-l', name: 'Armoire Murale (Grand)', price: 90, minutes: 90 },
            { id: 'table-4', name: 'Table 4 Chaises', price: 80, minutes: 60 },
            { id: 'table-6', name: 'Table 6+ Chaises', price: 100, minutes: 90 },
            { id: 'chair', name: 'Chaise (unité)', price: 20, minutes: 15 },
        ]
    },
    {
        id: 'office',
        title: 'Bureau',
        icon: Briefcase,
        items: [
            { id: 'desk', name: 'Bureau', price: 60, minutes: 45 },
            { id: 'office-chair', name: 'Chaise de Bureau', price: 30, minutes: 20 },
            { id: 'bookshelf', name: 'Bibliothèque', price: 70, minutes: 60 },
            { id: 'cabinet', name: 'Armoire Basse', price: 50, minutes: 40 },
        ]
    }
];

interface AssemblyFormProps {
    onUpdate: (data: any) => void;
}

export const AssemblyForm: React.FC<AssemblyFormProps> = ({ onUpdate }) => {
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [expandedCategory, setExpandedCategory] = useState<string | null>('bedroom');

    const updateQuantity = (id: string, delta: number) => {
        setQuantities(prev => {
            const current = prev[id] || 0;
            const next = Math.max(0, current + delta);
            const newQuantities = { ...prev, [id]: next };
            if (next === 0) delete newQuantities[id];
            return newQuantities;
        });
    };

    const toggleCategory = (id: string) => {
        setExpandedCategory(curr => curr === id ? null : id);
    };

    useEffect(() => {
        let totalPrice = 0;
        let totalMinutes = 0;
        const selectedItems: string[] = [];

        Object.entries(quantities).forEach(([id, qty]) => {
            // Find item across all categories
            let item: FurnitureItem | undefined;
            for (const cat of FURNITURE_CATEGORIES) {
                const found = cat.items.find(i => i.id === id);
                if (found) {
                    item = found;
                    break;
                }
            }

            if (item && qty > 0) {
                totalPrice += item.price * qty;
                totalMinutes += item.minutes * qty;
                selectedItems.push(`${qty}x ${item.name}`);
            }
        });

        // Minimum call-out fee or 1 hour minimum?
        // Let's ensure duration is at least 1 hour (60 min)
        const durationHours = Math.max(1, Math.ceil(totalMinutes / 60));

        onUpdate({
            price: totalPrice,
            duration: durationHours,
            serviceDetails: {
                type: 'Montage Technique',
                description: selectedItems.length > 0
                    ? selectedItems.join(', ')
                    : 'Aucun article sélectionné',
                items: quantities
            }
        });
    }, [quantities, onUpdate]);

    const totalCount = Object.values(quantities).reduce((a, b) => a + b, 0);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-2">Que devons-nous monter ?</h2>
                <p className="text-gray-500 text-sm">Sélectionnez les meubles pour estimer le devis.</p>
            </div>

            <div className="space-y-4">
                {FURNITURE_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    const isExpanded = expandedCategory === category.id;
                    const activeCount = category.items.reduce((acc, item) => acc + (quantities[item.id] || 0), 0);

                    return (
                        <div key={category.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className={`w-full flex items-center justify-between p-4 transition-colors ${isExpanded ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${activeCount > 0 ? 'bg-brand-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-left">
                                        <span className="font-bold text-gray-900 block">{category.title}</span>
                                        {activeCount > 0 && <span className="text-xs text-brand-red font-medium">{activeCount} articles sélectionnés</span>}
                                    </div>
                                </div>
                                {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>

                            {isExpanded && (
                                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50">
                                    <div className="space-y-3 mt-3">
                                        {category.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                                    <p className="text-xs text-gray-400">Est. {item.minutes} min</p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="text-sm font-bold text-gray-500 mr-2">CHF {item.price}</div>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        disabled={!quantities[item.id]}
                                                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 disabled:opacity-30 hover:border-brand-red hover:text-brand-red transition-colors bg-white"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-5 text-center font-bold text-sm">{quantities[item.id] || 0}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-brand-red hover:bg-brand-red hover:text-white transition-all bg-white"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {totalCount === 0 && (
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 text-sm flex gap-3">
                    <Hammer size={20} className="shrink-0" />
                    <p>Sélectionnez les meubles pour voir le prix final.</p>
                </div>
            )}
        </div>
    );
};

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ConciergeForm } from './ConciergeForm';
import { CorporateCleaningForm } from './CorporateCleaningForm';
import { DechetterieForm } from './DechetterieForm';
import { OfficeSupportForm } from './OfficeSupportForm';

import { TruckRentalForm } from './TruckRentalForm';
import { MaterialSupplyForm } from './MaterialSupplyForm';
import { AssemblyForm } from './AssemblyForm';
import { CleaningForm } from './CleaningForm';
import { DateTimeSelection } from './DateTimeSelection';
import { BookingFormData } from '@/types/booking';
import { SERVICES } from '../services/data';
import { Category } from '../services/types';

interface BookingFormProps {
    onUpdate: (data: BookingFormData) => void;
    currentStep: number;
    showExtras?: boolean;
    initialUserData?: {
        name: string;
        email: string;
        phone: string; // Added phone just in case we have it later
    } | null;
}

const FREQUENCY_OPTIONS = [
    { id: 'once', label: 'Uma vez', discount: 0 },
    { id: 'weekly', label: 'Semanal', discount: 0.20 },
    { id: 'biweekly', label: 'Quinzenal', discount: 0.15 },
];

const SERVICE_OPTIONS = [
    { id: 'res-truck-rental', label: 'Veículos para Mudança', basePrice: 80, description: 'Carros, Furgões e Caminhões' },
    { id: 'res-material', label: 'Fornecimento de Material', basePrice: 10, description: 'Caixas, Fitas e Proteção' },
    { id: 'res-cleaning', label: 'Limpeza Executiva', basePrice: 180, description: 'Residencial e Comercial' },
    { id: 'res-assembly', label: 'Montagem Técnica', basePrice: 150, description: 'Móveis e Equipamentos' },
    { id: 'corp-concierge', label: 'Concierge & Recepção', basePrice: 200, description: 'Corporativo e Eventos' },
    { id: 'corp-cleaning', label: 'Limpeza Industrial', basePrice: 300, description: 'Grandes Áreas e Galpões' },
    { id: 'corp-waste', label: 'Déchetterie & Resíduos', basePrice: 80, description: 'Coleta e Descarte' },
    { id: 'corp-office-staff', label: 'Profissionais para Escritório', basePrice: 350, description: 'Copa, Limpeza e Apoio' },
];

// ... existing imports

export const BookingForm: React.FC<BookingFormProps> = ({ onUpdate, currentStep, showExtras, initialUserData }) => {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<BookingFormData>({
        serviceId: '',
        serviceName: '',
        frequency: 'once',
        duration: 4,
        date: '',
        time: '',
        address: '',
        name: '',
        email: '',
        phone: '',
        canton: '',
        observations: '',
        acceptedTerms: false,
        materialsTotal: 0,
        price: 0,
        serviceDetails: {},
        items: []
    });

    // ... existing constants

    // Pre-fill user data when available
    useEffect(() => {
        if (initialUserData) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || initialUserData.name || '',
                email: prev.email || initialUserData.email || '',
                // Only fill if empty to respect user input if they started typing (unlikely but safe)
                // Actually, user wants "simplificar". Overwriting is good, but let's be safe:
                // If it's the specific initial load, we overwrite.
            }));

            // Stronger enforcement: If we have userData, we set it.
            // The user can edit it afterwards because handleInputChange updates state.
            setFormData(prev => ({
                ...prev,
                name: initialUserData.name || prev.name,
                email: initialUserData.email || prev.email,
                phone: initialUserData.phone || prev.phone
            }));
        }
    }, [initialUserData]);

    const DELIVERY_FEES: Record<string, number> = {
        'GE': 30,
        'VD': 70,
        'VS': 100,
        'FR': 80,
        'NE': 100,
        'JU': 120
    };

    const [activeServices, setActiveServices] = useState<string[]>([]);
    const [servicesData, setServicesData] = useState<Record<string, any>>({});
    const [isAddingService, setIsAddingService] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // [FIX] Sync direct form fields to parent immediately
    // Separate effect for basic fields to ensure responsiveness and avoid circular deps with servicesData
    useEffect(() => {
        onUpdate(formData);
    }, [
        formData.date,
        formData.time,
        formData.address,
        formData.name,
        formData.email,
        formData.phone,
        formData.observations,
        formData.acceptedTerms,
        onUpdate
    ]);

    useEffect(() => {
        const serviceParam = searchParams?.get('service');
        if (serviceParam && activeServices.length === 0) {
            const found = SERVICE_OPTIONS.find(s => s.id === serviceParam)
                || SERVICE_OPTIONS.find(s => s.label.toLowerCase() === serviceParam.toLowerCase())
                || SERVICE_OPTIONS.find(s => serviceParam.toLowerCase().includes(s.label.toLowerCase()))
                || SERVICE_OPTIONS.find(s => s.label.toLowerCase().includes(serviceParam.toLowerCase()));

            if (found) {
                setActiveServices([found.id]);
                setFormData(prev => ({ ...prev, serviceId: found.id, serviceName: found.label }));
            }
        }
    }, [searchParams]);

    // Aggregate Data (Calculated Fields)
    useEffect(() => {
        let totalPrice = 0;
        let totalDuration = 0;
        let allDetails: any[] = [];
        let items: any[] = [];
        let primaryService = activeServices[0];

        activeServices.forEach(serviceId => {
            const data = servicesData[serviceId];
            if (!data) return;

            let servicePrice = data.price || 0;
            const originalPrice = servicePrice;

            // Apply specific logic (moved from previous useEffect)
            if (serviceId === 'res-cleaning') {
                const discount = FREQUENCY_OPTIONS.find(f => f.id === formData.frequency)?.discount || 0;
                servicePrice = servicePrice * (1 - discount);
            }

            if (serviceId === 'res-material') {
                const deliveryFee = DELIVERY_FEES[formData.canton] || 0;
                servicePrice = (data.price || 0) + deliveryFee;
            }

            totalPrice += servicePrice;

            // Exclude Truck Rental and Material Supply validation from main schedule duration
            if (serviceId !== 'res-truck-rental' && serviceId !== 'res-material') {
                const rawDuration = data.duration || 0;
                const numericDuration = typeof rawDuration === 'string'
                    ? parseFloat(rawDuration.replace(',', '.'))
                    : Number(rawDuration);

                totalDuration += isNaN(numericDuration) ? 0 : numericDuration;
            }

            if (data.serviceDetails) {
                // Format detail
                allDetails.push(data.serviceDetails);
            }

            // [NEW] Add to items list
            const serviceLabel = SERVICE_OPTIONS.find(s => s.id === serviceId)?.label || serviceId;
            items.push({
                id: serviceId,
                name: serviceLabel,
                price: servicePrice,
                duration: data.duration || 0,
                // Optional: add description from details if string
                description: typeof data.serviceDetails === 'string' ? data.serviceDetails : data.serviceDetails?.description
            });
        });

        // Ensure minimum duration of 1 hour if valid services are selected but duration is 0 (e.g. only Truck)
        if (activeServices.length > 0 && totalDuration === 0) {
            totalDuration = 1;
        }

        // Construct composite details string
        let compositeDetails = "";
        if (typeof allDetails[0] === 'string') {
            compositeDetails = allDetails.join('\n + ');
        } else {
            compositeDetails = allDetails.map(d => typeof d === 'string' ? d : (d.description || JSON.stringify(d))).join('\n + ');
        }

        // Only update if calculated values differ
        const newPayload = {
            ...formData,
            price: totalPrice,
            duration: totalDuration,
            serviceDetails: compositeDetails,
            serviceId: primaryService || '',
            serviceName: SERVICE_OPTIONS.find(s => s.id === primaryService)?.label || '',
            items: items
        };

        if (totalPrice !== formData.price || totalDuration !== formData.duration || JSON.stringify(items) !== JSON.stringify((formData as any).items)) {
            // Local Update first
            setFormData(prev => ({
                ...prev,
                price: totalPrice,
                duration: totalDuration,
                serviceDetails: compositeDetails,
                serviceId: primaryService || '',
                serviceName: SERVICE_OPTIONS.find(s => s.id === primaryService)?.label || '',
                items: items
            }));
            // Parent update will happen via the specific field effect ? 
            // NO, we need to explicitely sync these calculated fields too because they are not deps of the other effect.
            // Actually, if we update local state here, the OTHER effect will trigger? 
            // NO, the other effect depends on formData.date, time, etc. NOT price.

            // So we DO need to call onUpdate here for calculated values.
            onUpdate(newPayload);
        }

    }, [servicesData, activeServices, formData.frequency, formData.canton, onUpdate]);


    const handleChildUpdate = (serviceId: string, data: any) => {
        setServicesData(prev => {
            // Only update if different to avoid loop?
            // Deep compare or simple check
            if (JSON.stringify(prev[serviceId]) === JSON.stringify(data)) return prev;
            return { ...prev, [serviceId]: data };
        });
    };

    const handleAddService = (id: string) => {
        if (!activeServices.includes(id)) {
            setActiveServices(prev => [...prev, id]);
        }
        setIsAddingService(false);
    };

    const handleRemoveService = (id: string) => {
        setActiveServices(prev => prev.filter(s => s !== id));
        setServicesData(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });
    };

    return (
        <>
            {/* Step 1: Services */}
            <div className={currentStep === 1 ? 'space-y-8 animate-in fade-in slide-in-from-left-4 duration-500' : 'hidden'}>
                {activeServices.length === 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark mb-2">O que você precisa?</h2>
                        <p className="text-gray-500 text-sm">Personalize o serviço ideal para sua necessidade.</p>
                    </div>
                )}

                {/* Active Services Render */}
                <div className="space-y-8">
                    {activeServices.map((serviceId, index) => {
                        return (
                            <motion.div
                                key={serviceId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative bg-white/50 rounded-2xl"
                            >
                                {index > 0 && <div className="border-t border-gray-200 my-8"></div>}

                                <div className="flex justify-start mb-6">
                                    <button
                                        onClick={() => window.location.href = '/#servicos'}
                                        className="flex items-center gap-2 text-slate-500 hover:text-brand-dark transition-colors group"
                                    >
                                        <div className="p-2 rounded-full bg-slate-100 group-hover:bg-slate-200 transition-colors">
                                            <ArrowLeft size={20} className="text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                                        </div>
                                        <span className="font-bold text-sm">Voltar para serviços</span>
                                    </button>
                                </div>

                                {serviceId === 'res-cleaning' && (
                                    <CleaningForm showExtras={showExtras} onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'res-truck-rental' && (
                                    <TruckRentalForm showExtras={showExtras} onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'res-material' && (
                                    <MaterialSupplyForm onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'res-assembly' && (
                                    <AssemblyForm onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'corp-concierge' && (
                                    <ConciergeForm onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'corp-office-staff' && (
                                    <OfficeSupportForm
                                        frequency={formData.frequency}
                                        onUpdate={(d) => handleChildUpdate(serviceId, d)}
                                    />
                                )}
                                {serviceId === 'corp-cleaning' && (
                                    <CorporateCleaningForm onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                                {serviceId === 'corp-waste' && (
                                    <DechetterieForm onUpdate={(d) => handleChildUpdate(serviceId, d)} />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Service Picker */}
                {(activeServices.length === 0 || isAddingService) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3"
                    >
                        {activeServices.length > 0 && (
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-700">Adicionar mais serviços</h3>
                                <button onClick={() => setIsAddingService(false)} className="text-sm text-gray-500">Cancelar</button>
                            </div>
                        )}

                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            {activeServices.length === 0 ? 'Tipo de Serviço' : 'Serviços Disponíveis'}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {SERVICE_OPTIONS.filter(option => {
                                // Filter out already selected services
                                if (activeServices.includes(option.id)) return false;

                                // Filter by Category if a service is already selected
                                if (activeServices.length > 0) {
                                    const firstServiceId = activeServices[0];
                                    const firstService = SERVICES.find(s => s.id === firstServiceId);
                                    const currentService = SERVICES.find(s => s.id === option.id);

                                    if (firstService && currentService) {
                                        return firstService.category === currentService.category;
                                    }
                                }

                                return true;
                            }).map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => handleAddService(option.id)}
                                    className={`
                                        p-4 text-left rounded-xl border-2 transition-all duration-200 border-gray-100 hover:border-brand-red/50 hover:shadow-md bg-white
                                    `}
                                >
                                    <span className="font-bold block text-gray-700">{option.label}</span>
                                    {(option as any).description && (
                                        <span className="block text-xs text-gray-500 mb-1">{(option as any).description}</span>
                                    )}
                                    <span className="text-xs text-brand-red font-semibold">A partir de CHF {option.basePrice}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* "Add Another" Button */}
                {!isAddingService && activeServices.length > 0 && SERVICE_OPTIONS.length > activeServices.length && (
                    <button
                        onClick={() => setIsAddingService(true)}
                        className="text-sm text-brand-red font-bold hover:text-brand-dark underline block mx-auto py-4"
                    >
                        + Escolher outro serviço (Juntar ao pedido)
                    </button>
                )}
            </div>

            {/* Step 2: Date Time */}
            <div className={currentStep === 2 ? 'animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'}>
                <DateTimeSelection
                    date={formData.date}
                    time={formData.time}
                    frequency={formData.frequency}
                    duration={formData.duration}
                    address={formData.address}
                    canton={formData.canton}
                    serviceName={formData.serviceName}
                    onUpdate={handleInputChange}
                    hideFrequency={formData.serviceId === 'res-truck-rental' || formData.serviceId === 'res-material' || formData.serviceId === 'res-assembly'}
                />
            </div>

            {/* Step 3: Checkout */}
            <div className={currentStep === 3 ? 'space-y-8 animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden'}>
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Para finalizar</h2>
                    <p className="text-gray-500 text-sm">Informe seus dados para contato e confirmação.</p>
                </div>

                {/* Address Confirmation */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 overflow-hidden">
                        <MapPin className="text-brand-red shrink-0 mt-1" size={20} />
                        <div className="flex-1 w-full min-w-0">
                            <label className="font-bold text-gray-900 text-sm block mb-1">Endereço do Serviço</label>
                            {isEditingAddress ? (
                                <input
                                    type="text"
                                    autoFocus
                                    value={formData.address}
                                    onBlur={() => setIsEditingAddress(false)}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                                    placeholder="Endereço completo"
                                />
                            ) : (
                                <p
                                    onClick={() => setIsEditingAddress(true)}
                                    className="text-gray-600 text-sm leading-relaxed cursor-pointer hover:text-gray-900 truncate"
                                    title={formData.address}
                                >
                                    {formData.address || 'Clique para adicionar endereço'}
                                </p>
                            )}
                        </div>
                    </div>

                    {!isEditingAddress && (
                        <button
                            onClick={() => setIsEditingAddress(true)}
                            className="shrink-0 text-xs font-bold text-brand-red hover:text-brand-dark uppercase tracking-wider px-2 py-1"
                        >
                            Alterar
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Nome Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none"
                                placeholder="Geraldo da Silva"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                            <input
                                type="email"
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none"
                                placeholder="nome@email.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Celular / WhatsApp</label>
                            <input
                                type="tel"
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none"
                                placeholder="(11) 99999-9999"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Observações (Opcional)</label>
                        <textarea
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none min-h-[100px]"
                            placeholder="Ex: Chave na portaria, cuidado com o cachorro, etc."
                            value={formData.observations}
                            onChange={(e) => handleInputChange('observations', e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={formData.acceptedTerms}
                                onChange={(e) => handleInputChange('acceptedTerms', e.target.checked)}
                            />
                            <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-brand-red peer-checked:border-brand-red transition-all" />
                            <CheckCircle2 size={14} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors select-none">
                            Li e concordo com os <a href="#" className="text-brand-red underline hover:text-brand-dark">Termos de Uso</a> e <a href="#" className="text-brand-red underline hover:text-brand-dark">Política de Privacidade</a>.
                        </span>
                    </label>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">Pagamento Seguro</h4>
                            <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                                Você só será cobrado após a confirmação do profissional. Aceitamos cartão de crédito e PIX.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

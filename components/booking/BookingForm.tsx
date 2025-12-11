'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';
import { TruckRentalForm } from './TruckRentalForm';
import { CleaningForm } from './CleaningForm';
import { DateTimeSelection } from './DateTimeSelection';
interface BookingFormProps {
    onUpdate: (data: any) => void;
    currentStep: number;
    showExtras?: boolean;
}

const FREQUENCY_OPTIONS = [
    { id: 'once', label: 'Uma vez', discount: 0 },
    { id: 'weekly', label: 'Semanal', discount: 0.15 },
    { id: 'biweekly', label: 'Quinzenal', discount: 0.10 },
];

const SERVICE_OPTIONS = [
    { id: 'res-truck-rental', label: 'Aluguel de Caminhão', basePrice: 450 },
    { id: 'res-material', label: 'Fornecimento de Material', basePrice: 200 },
    { id: 'res-cleaning', label: 'Limpeza Executiva', basePrice: 180 },
    { id: 'res-maint', label: 'Manutenção Predial', basePrice: 150 },
];

export const BookingForm: React.FC<BookingFormProps> = ({ onUpdate, currentStep, showExtras }) => {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState({
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
        observations: '',
        acceptedTerms: false
    });

    const [isEditingAddress, setIsEditingAddress] = useState(false);

    useEffect(() => {
        const serviceParam = searchParams?.get('service');
        if (serviceParam) {
            // Simple match logic
            const found = SERVICE_OPTIONS.find(s => s.label.toLowerCase() === serviceParam.toLowerCase())
                || SERVICE_OPTIONS.find(s => serviceParam.toLowerCase().includes(s.label.toLowerCase()));

            if (found) {
                setFormData(prev => ({ ...prev, serviceId: found.id, serviceName: found.label }));
            } else {
                // Default fallback if param exists but no match
                setFormData(prev => ({ ...prev, serviceName: serviceParam }));
            }
        }
    }, [searchParams]);

    // Lift state up whenever it changes
    useEffect(() => {
        if (formData.serviceId === 'res-cleaning') {
            // For cleaning, we trust the price coming from CleaningForm (already in formData via setFormData)
            // We ensure we pass the data up, but carefully to not cause loops if onUpdate triggers re-renders that don't change data
            onUpdate(formData);
            return;
        }

        const selectedService = SERVICE_OPTIONS.find(s => s.id === formData.serviceId);
        const basePrice = selectedService ? selectedService.basePrice : 150;
        const discount = FREQUENCY_OPTIONS.find(f => f.id === formData.frequency)?.discount || 0;

        // Simple logic: Base + (Duration * Hourly Rate) - Discount
        const finalPrice = (basePrice + (formData.duration * 50)) * (1 - discount);

        onUpdate({
            ...formData,
            price: finalPrice
        });
    }, [formData, onUpdate]);

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (currentStep === 1) {
        // Exclusive view for Cleaning Service
        if (formData.serviceId === 'res-cleaning') {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <CleaningForm
                        showExtras={showExtras}
                        onUpdate={(data) => {
                            onUpdate({
                                ...formData,
                                serviceDetails: data.serviceDetails,
                                price: data.price,
                                duration: data.duration,
                                isIroning: data.isIroning
                            });
                        }}
                    />

                    {/* Option to switch service */}
                    <button
                        onClick={() => handleInputChange('serviceId', '')}
                        className="text-sm text-gray-400 hover:text-brand-dark underline block mx-auto pt-4"
                    >
                        Escolher outro serviço
                    </button>
                </motion.div>
            );
        }

        // Exclusive view for Truck Rental
        if (formData.serviceId === 'res-truck-rental') {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <TruckRentalForm
                        showExtras={showExtras}
                        onUpdate={(data) => {
                            onUpdate({
                                ...formData,
                                serviceDetails: data.serviceDetails,
                                price: data.price,
                                duration: data.duration
                            });
                        }}
                    />

                    {/* Option to switch service */}
                    <button
                        onClick={() => handleInputChange('serviceId', '')}
                        className="text-sm text-gray-400 hover:text-brand-dark underline block mx-auto pt-4"
                    >
                        Escolher outro serviço
                    </button>
                </motion.div>
            );
        }

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">O que você precisa?</h2>
                    <p className="text-gray-500 text-sm">Personalize o serviço ideal para sua necessidade.</p>
                </div>

                {/* Service Selection */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Tipo de Serviço</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICE_OPTIONS.map(option => (
                            <button
                                key={option.id}
                                onClick={() => handleInputChange('serviceId', option.id)}
                                className={`
                                    p-4 text-left rounded-xl border-2 transition-all duration-200
                                    ${formData.serviceId === option.id
                                        ? 'border-brand-red bg-red-50 text-brand-dark'
                                        : 'border-gray-100 hover:border-gray-200 text-gray-600'}
                                `}
                            >
                                <span className="font-bold block">{option.label}</span>
                                <span className="text-xs text-gray-400 mt-1">A partir de R$ {option.basePrice},00</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Duração Estimada</label>
                        <span className="font-bold text-brand-red">{formData.duration} horas</span>
                    </div>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        step="1"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-red"
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>2h (Mínimo)</span>
                        <span>10h (Máximo)</span>
                    </div>
                </div>
            </div>
        );
    }

    if (currentStep === 2) {
        return (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <DateTimeSelection
                    date={formData.date}
                    time={formData.time}
                    frequency={formData.frequency}
                    duration={formData.duration}
                    address={formData.address}
                    onUpdate={handleInputChange}
                    hideFrequency={formData.serviceId === 'res-truck-rental'}
                />
            </div>
        );
    }

    if (currentStep === 3) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
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
        );
    }

    return null;
};

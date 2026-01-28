'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
    { id: 'once', label: 'Une fois', discount: 0 },
    { id: 'weekly', label: 'Hebdomadaire', discount: 0.20 },
    { id: 'biweekly', label: 'Bimensuel', discount: 0.15 },
];

const SERVICE_OPTIONS = [
    { id: 'res-truck-rental', label: 'Véhicules de Déménagement', basePrice: 80, description: 'Voitures, Fourgons et Camions' },
    { id: 'res-material', label: 'Fourniture de Matériel', basePrice: 10, description: 'Boîtes, Rubans et Protection' },
    { id: 'res-cleaning', label: 'Nettoyage Exécutif', basePrice: 180, description: 'Résidentiel et Commercial' },
    { id: 'res-assembly', label: 'Montage Technique', basePrice: 150, description: 'Meubles et Équipements' },
    { id: 'corp-concierge', label: 'Conciergerie & Réception', basePrice: 200, description: 'Corporatif et Événements' },
    { id: 'corp-cleaning', label: 'Nettoyage Industriel', basePrice: 300, description: 'Grandes Surfaces et Entrepôts' },
    { id: 'corp-waste', label: 'Déchetterie & Déchets', basePrice: 80, description: 'Collecte et Élimination' },
    { id: 'corp-office-staff', label: 'Personnel de Bureau', basePrice: 350, description: 'Cafétéria, Nettoyage et Soutien' },
];

// ... existing imports

export const BookingForm: React.FC<BookingFormProps> = ({ onUpdate, currentStep, showExtras, initialUserData }) => {
    const searchParams = useSearchParams();
    const t = useTranslations('Booking');
    const tServices = useTranslations('Services.items');

    const [formData, setFormData] = useState<BookingFormData>({
        serviceId: '',
        serviceName: '',
        frequency: 'once',
        duration: 4,
        date: '',
        time: '',
        address: '',
        observations: '',
        name: initialUserData?.name || '',
        email: initialUserData?.email || '',
        phone: initialUserData?.phone || '',
        acceptedTerms: false,
        canton: '',
        items: [],
        materialsTotal: 0,
        price: 0,
        serviceDetails: ''
    });

    const [activeServices, setActiveServices] = useState<string[]>([]);
    const [isAddingService, setIsAddingService] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [servicesData, setServicesData] = useState<Record<string, any>>({});

    // Initialize from URL
    useEffect(() => {
        const serviceParam = searchParams?.get('service');
        if (serviceParam && activeServices.length === 0) {
            const service = SERVICES.find(s => s.id === serviceParam);
            if (service) {
                setActiveServices([service.id]);
                setFormData(prev => ({
                    ...prev,
                    serviceId: service.id,
                    serviceName: service.title // We might want to translate this too, but for internal state logic it's fine. 
                    // Displayed service name should come from tServices(id + '.title')
                }));
            }
        }
    }, [searchParams, activeServices.length]);

    // Aggregate Service Data
    useEffect(() => {
        const values = Object.values(servicesData);
        if (values.length === 0) return;

        const totalPrice = values.reduce((acc, curr) => acc + (curr.price || 0), 0);
        const maxDuration = values.reduce((acc, curr) => Math.max(acc, curr.duration || 0), 0);

        const items = Object.entries(servicesData).map(([id, data]) => {
            const svc = SERVICE_OPTIONS.find(o => o.id === id);
            // We can try to use the translated name here if available, but generating it inside useEffect usually requires t function which is available.
            return {
                id,
                name: svc?.label || id, // Ideally this should be translated effectively in the summary, maybe pass ID and let summary translate?
                // For now, let's keep it as is, or we can try to translate here?
                // next-intl useTranslations is stable.
                price: data.price || 0,
                duration: data.duration || 0,
                description: data.serviceDetails?.description || ''
            };
        });

        const newFormData = {
            ...formData,
            price: totalPrice,
            duration: maxDuration,
            items,
            ...(values.length === 1 ? {
                serviceDetails: values[0].serviceDetails,
                config: values[0].config
            } : {})
        };

        onUpdate(newFormData);
        setFormData(newFormData);

    }, [servicesData, onUpdate]);

    const handleInputChange = useCallback((field: keyof BookingFormData | string, value: any) => {
        setFormData(prev => {
            const next = { ...prev, [field]: value };
            onUpdate(next);
            return next;
        });
    }, [onUpdate]);

    const handleAddService = (id: string) => {
        if (!activeServices.includes(id)) {
            setActiveServices(prev => [...prev, id]);
            setIsAddingService(false);
        }
    };

    const handleServiceUpdate = (id: string, data: any) => {
        setServicesData(prev => {
            if (JSON.stringify(prev[id]) === JSON.stringify(data)) return prev;
            return { ...prev, [id]: data };
        });
    };

    return (
        <>
            {/* Step 1: Services */}
            <div className={currentStep === 1 ? 'space-y-8 animate-in fade-in slide-in-from-left-4 duration-500' : 'hidden'}>
                {
                    activeServices.length === 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-brand-dark mb-2">{t('steps.services')}</h2>
                            <p className="text-gray-500 text-sm">{t('steps.servicesDesc')}</p>
                        </div>
                    )
                }

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
                                        <span className="font-bold text-sm">{t('buttons.backToServices')}</span>
                                    </button>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-6">
                                    {(() => {
                                        switch (serviceId) {
                                            case 'res-truck-rental':
                                                return <TruckRentalForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'res-material':
                                                return <MaterialSupplyForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'res-cleaning':
                                                return <CleaningForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'res-assembly':
                                                return <AssemblyForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'corp-concierge':
                                                return <ConciergeForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'corp-cleaning':
                                                return <CorporateCleaningForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'corp-waste':
                                                return <DechetterieForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            case 'corp-office-staff':
                                                return <OfficeSupportForm onUpdate={(data) => handleServiceUpdate(serviceId, data)} />;
                                            default:
                                                return null;
                                        }
                                    })()}
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
                                                <h3 className="font-bold text-gray-700">{t('buttons.addService')}</h3>
                                                <button onClick={() => setIsAddingService(false)} className="text-sm text-gray-500">{t('buttons.cancel')}</button>
                                            </div>
                                        )}

                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                                            {activeServices.length === 0 ? t('labels.serviceType') : t('labels.availableServices')}
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
                                                    <span className="font-bold block text-gray-700">{tServices(`${option.id}.title`)}</span>
                                                    {(option as any).description && (
                                                        <span className="block text-xs text-gray-500 mb-1">{tServices(`${option.id}.description`)}</span>
                                                    )}
                                                    <span className="text-xs text-brand-red font-semibold">{t('labels.from')} CHF {option.basePrice}</span>
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
                                        {t('buttons.addAnother')}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
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
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">{t('steps.checkout')}</h2>
                    <p className="text-gray-500 text-sm">{t('steps.checkoutDesc')}</p>
                </div>

                {/* Address Confirmation */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 overflow-hidden">
                        <MapPin className="text-brand-red shrink-0 mt-1" size={20} />
                        <div className="flex-1 w-full min-w-0">
                            <label className="font-bold text-gray-900 text-sm block mb-1">{t('labels.address')}</label>
                            {isEditingAddress ? (
                                <input
                                    type="text"
                                    autoFocus
                                    value={formData.address}
                                    onBlur={() => setIsEditingAddress(false)}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                                    placeholder={t('labels.address')}
                                />
                            ) : (
                                <p
                                    onClick={() => setIsEditingAddress(true)}
                                    className="text-gray-600 text-sm leading-relaxed cursor-pointer hover:text-gray-900 truncate"
                                    title={formData.address}
                                >
                                    {formData.address || t('labels.address')}
                                </p>
                            )}
                        </div>
                    </div>

                    {!isEditingAddress && (
                        <button
                            onClick={() => setIsEditingAddress(true)}
                            className="shrink-0 text-xs font-bold text-brand-red hover:text-brand-dark uppercase tracking-wider px-2 py-1"
                        >
                            {t('buttons.modify')}
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('labels.fullName')}</label>
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
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('labels.email')}</label>
                            <input
                                type="email"
                                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none"
                                placeholder="nome@email.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('labels.phone')}</label>
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
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">{t('labels.observations')}</label>
                        <textarea
                            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-brand-red outline-none min-h-[100px]"
                            placeholder={t('labels.observationsPlaceholder')}
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
                            {t.rich('labels.terms', {
                                terms: (chunks) => <a href="#" className="text-brand-red underline hover:text-brand-dark">{chunks}</a>,
                                privacy: (chunks) => <a href="#" className="text-brand-red underline hover:text-brand-dark">{chunks}</a>
                            })}
                        </span>
                    </label>

                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-start">
                        <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm">{t('labels.securePayment')}</h4>
                            <p className="text-blue-700 text-xs mt-1 leading-relaxed">
                                {t('labels.securePaymentDesc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

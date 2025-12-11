'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BookingForm } from '@/components/booking/BookingForm';
import { BookingSummary } from '@/components/booking/BookingSummary';

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [subStep, setSubStep] = useState(1); // 1: Config, 2: Extras
    const [bookingData, setBookingData] = useState({
        serviceName: '',
        frequency: 'Uma vez',
        duration: 4,
        price: 0,
        date: '',
        time: '',
        address: '',
        name: '',
        email: '',
        phone: '',
        serviceId: '',
        isIroning: false,
        observations: '',
        acceptedTerms: false
    });

    const handleFormUpdate = useCallback((data: any) => {
        setBookingData(prev => {
            if (JSON.stringify(prev) === JSON.stringify({ ...prev, ...data })) return prev;
            return { ...prev, ...data }
        });
    }, []);

    const nextStep = () => {
        const isCleaning = bookingData.serviceId === 'res-cleaning';
        const isTruck = bookingData.serviceId === 'res-truck-rental';

        if (step === 1) {
            // Logic for Cleaning Service
            if (isCleaning) {
                if (bookingData.isIroning) {
                    setStep(step + 1);
                    return;
                }
                if (subStep === 1) {
                    setSubStep(2);
                    return;
                }
            }

            // Logic for Truck Rental
            if (isTruck) {
                if (subStep === 1) {
                    setSubStep(2);
                    return;
                }
            }

            // If subStep is 2 (or not applicable), proceed
            setStep(step + 1);
            return;
        }

        if (step < 3) setStep(step + 1);
        else {
            alert('Pedido enviado com sucesso! Nosso time entrará em contato.');
        }
    };

    const prevStep = () => {
        // Handle Sub-step Back
        if (step === 1 && subStep === 2) {
            setSubStep(1);
            return;
        }

        if (step > 1) {
            // Logic when going back to Step 1: determine if we land on Extras or Config
            const isCleaning = bookingData.serviceId === 'res-cleaning';
            const isTruck = bookingData.serviceId === 'res-truck-rental';

            if (step === 2) {
                if ((isCleaning && !bookingData.isIroning) || isTruck) {
                    setStep(1);
                    setSubStep(2); // Go back to Extras
                    return;
                }
            }

            setStep(step - 1);
        }
    };

    const canProceed = () => {
        if (step === 1) {
            return !!bookingData.serviceName;
        }
        if (step === 2) return !!bookingData.date && !!bookingData.time && !!bookingData.address;
        if (step === 3) return !!bookingData.name && !!bookingData.email && !!bookingData.phone && bookingData.acceptedTerms;
        return false;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans selection:bg-brand-red selection:text-white">
            <style jsx global>{`
                nav {
                    position: relative !important;
                    border-bottom: none !important;
                }
            `}</style>

            <header className="bg-white border-b-2 border-brand-red sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 relative">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-0 -translate-y-1/2 rounded-full" />
                            {[1, 2, 3].map(s => (
                                <div key={s} className={`
                                    w-3 h-3 rounded-full transition-all duration-500 relative z-10 box-content border-2 border-white
                                    ${s === step ? 'bg-brand-red scale-110' : s < step ? 'bg-green-500' : 'bg-gray-200'}
                                `} />
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl p-6 lg:p-12 shadow-sm border border-gray-100 min-h-[500px]">
                            {(step > 1 || subStep === 2) && (
                                <button onClick={prevStep} className="mb-6 text-gray-400 hover:text-brand-dark flex items-center gap-1 text-sm font-bold">
                                    <ArrowLeft className="w-4 h-4" /> Voltar etapa
                                </button>
                            )}

                            <BookingForm
                                currentStep={step}
                                onUpdate={handleFormUpdate}
                                showExtras={subStep === 2}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4 z-40">
                        <BookingSummary
                            serviceName={bookingData.serviceName}
                            frequency={
                                bookingData.frequency === 'once' ? 'Uma vez' :
                                    bookingData.frequency === 'weekly' ? 'Semanal' :
                                        bookingData.frequency === 'biweekly' ? 'Quinzenal' :
                                            bookingData.frequency === 'monthly' ? 'Mensal' : 'Uma vez'
                            }
                            duration={bookingData.duration}
                            price={bookingData.price}
                            step={step}
                            onNext={nextStep}
                            canProceed={canProceed()}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

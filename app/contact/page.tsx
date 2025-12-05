import React from 'react';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-brand-cream font-sans selection:bg-brand-red selection:text-white">

            <main className="pt-32 pb-12 px-6 lg:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                    {/* Left Column: Info & Context */}
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <ContactInfo />
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                        <ContactForm />
                    </div>

                </div>
            </main>
        </div>
    );
}

import React from 'react';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import Plans from '@/components/Plans';
import SwissSection from '@/components/SwissSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import AppDownload from '@/components/AppDownload';

export default function Home() {
    return (
        <>
            <Hero />
            <ServicesGrid />
            <HowItWorks />
            <Plans />
            <SwissSection />
            <Testimonials />
            <AppDownload />
        </>
    );
}

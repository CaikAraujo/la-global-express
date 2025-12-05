import React from 'react';
import { HeroSection } from '@/components/about/HeroSection';
import { ContentSection } from '@/components/about/ContentSection';
import { Stats } from '@/components/about/Stats';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <HeroSection />
            <ContentSection />
            <Stats />
        </main>
    );
}

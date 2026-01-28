import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../index.css';

// Metadata needs to be static or generated. For now, we can leave the exported metadata object 
// but note that next-intl usually requires generateMetadata for localized titles.
// We'll keep the static one for now, but update the lang attribute dynamically.

export const metadata = {
    metadataBase: new URL('https://laglobal.express'),
    title: {
        default: 'LA Global Express | Facility Management Premium',
        template: '%s | LA Global Express'
    },
    description: 'Solutions intégrées de facilities, gestion d\'entreprise et services résidentiels haut de gamme en Suisse et au Brésil.',
    keywords: ['facility management', 'nettoyage', 'conciergerie', 'déménagements', 'suisse', 'brésil'],
    openGraph: {
        type: 'website',
        // locale: 'fr_CH', // This should be dynamic ideally
        url: 'https://laglobal.express',
        title: 'LA Global Express | Excellence Suisse',
        description: 'Leader en Facility Management Premium. Solutions intégrées pour résidences et entreprises.',
        siteName: 'LA Global Express',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LA Global Express',
        description: 'Excellence Suisse en Facility Management.',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/icon-express.svg',
    }
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{ locale: string }>
}) {
    // Receive messages from the server
    const messages = await getMessages();
    const { locale } = await params;

    return (
        <html lang={locale}>
            <body className="font-sans antialiased bg-white text-neutral-900">
                <NextIntlClientProvider messages={messages}>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../index.css';

export const metadata = {
    metadataBase: new URL('https://laglobal.express'), // Replace with actual domain
    title: {
        default: 'LA Global Express | Facility Management Premium',
        template: '%s | LA Global Express'
    },
    description: 'Soluções integradas de facilities, gestão corporativa e serviços residenciais de alto padrão na Suíça e Brasil.',
    keywords: ['facility management', 'limpeza', 'concierge', 'mudanças', 'suíça', 'brasil'],
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://laglobal.express',
        title: 'LA Global Express | Excelência Suíça',
        description: 'Liderança em Facility Management Premium. Soluções integradas para residências e corporações.',
        siteName: 'LA Global Express',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LA Global Express',
        description: 'Excelência Suíça em Facility Management.',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/icon-express.svg',
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body className="font-sans antialiased bg-white text-neutral-900">
                <div className="min-h-screen flex flex-col">
                    {/* Navbar will need to be updated to be a Client Component or handle navigation differently */}
                    <Navbar />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    )
}

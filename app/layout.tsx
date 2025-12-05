import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../index.css';

export const metadata = {
    title: 'LA Global Express',
    description: 'Soluções integradas de facilities',
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

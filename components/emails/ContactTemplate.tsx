import React from 'react';
import { Tailwind } from '@react-email/tailwind';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';
import { Link } from '@react-email/link';

interface ContactEmailProps {
    data: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        interest: string;
        message: string;
    };
}

export const ContactEmailTemplate: React.FC<ContactEmailProps> = ({ data }) => {
    const fullName = `${data.firstName} ${data.lastName}`;
    const requestId = `LGX-${(Math.random() * 1000).toFixed(0)}-${new Date().getFullYear()}`;

    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-slate-50 font-sans">
                    <Container className="mx-auto py-5 px-5">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden max-w-[650px] mx-auto">

                            {/* HEADER */}
                            <Section className="bg-[#0f172a] p-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-black text-xl text-white">LA</div>
                                        <div>
                                            <Text className="text-xl font-bold m-0 text-white uppercase tracking-tight">LA Global Express</Text>
                                            <Text className="text-[10px] text-blue-400 font-bold uppercase tracking-widest m-0 mt-1">Logistics Solutions</Text>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest m-0 mb-1">Cotação ID</Text>
                                        <Text className="font-mono text-lg font-bold text-blue-400 m-0 uppercase">{requestId}</Text>
                                    </div>
                                </div>
                            </Section>

                            {/* STATUS */}
                            <Section className="bg-slate-50 border-b border-slate-100 px-8 py-3">
                                <div className="flex justify-between items-center">
                                    <Text className="text-[10px] font-bold text-slate-500 uppercase m-0 flex items-center gap-2">
                                        Status: <span className="text-green-600">Nova Solicitação</span>
                                    </Text>
                                    <Text className="text-[10px] font-medium text-slate-400 m-0">
                                        {new Date().toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </div>
                            </Section>

                            {/* CONTENT */}
                            <Section className="px-8 py-8">
                                {/* Client Info */}
                                <div className="mb-8 border-b border-slate-100 pb-8">
                                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Informações do Cliente</Text>
                                    <Text className="text-base font-bold text-slate-900 m-0">{fullName}</Text>
                                    <Text className="text-sm text-slate-600 m-0 mt-1">{data.email}</Text>
                                    {data.phone && <Text className="text-sm text-slate-600 m-0">{data.phone}</Text>}
                                </div>

                                {/* Service Info */}
                                <div className="mb-8">
                                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Interesse / Serviço</Text>
                                    <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs font-bold border border-blue-100">
                                        {data.interest}
                                    </div>
                                </div>

                                {/* Message */}
                                <div>
                                    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Mensagem</Text>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed italic">
                                        "{data.message}"
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="mt-8 text-center">
                                    <Link href={`mailto:${data.email}`} className="bg-[#0f172a] text-white font-bold py-4 px-8 rounded-xl block text-center no-underline text-sm uppercase tracking-wider">
                                        Responder Cliente
                                    </Link>
                                </div>
                            </Section>

                            {/* FOOTER */}
                            <Section className="bg-slate-50 border-t border-slate-100 p-8 text-center">
                                <Text className="text-[10px] text-slate-400 leading-relaxed max-w-[400px] mx-auto uppercase font-bold tracking-widest m-0">
                                    © {new Date().getFullYear()} LA Global Express. Todos os direitos reservados.
                                </Text>
                            </Section>

                        </div>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactEmailTemplate;

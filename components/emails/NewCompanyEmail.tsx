import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Link,
    Hr,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface NewCompanyEmailProps {
    companyName: string;
    email: string;
    companyUid: string;
    contactPerson: string;
}

export const NewCompanyEmailTemplate = ({
    companyName,
    email,
    companyUid,
    contactPerson,
}: NewCompanyEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Novo cadastro de Pessoa Jurídica: {companyName}</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans">
                    <Container className="mx-auto my-10 bg-white p-8 rounded-lg shadow-md max-w-lg">
                        <Heading className="text-2xl font-bold text-gray-800 mb-6">
                            Novo Cadastro de Empresa
                        </Heading>
                        <Text className="text-gray-700 mb-4">
                            Uma nova empresa solicitou cadastro na plataforma La Global Express.
                        </Text>

                        <Section className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
                            <Text className="font-semibold text-gray-800 m-0">Nome da Empresa:</Text>
                            <Text className="text-gray-600 mb-2">{companyName}</Text>

                            <Text className="font-semibold text-gray-800 m-0">Pessoa de Contato:</Text>
                            <Text className="text-gray-600 mb-2">{contactPerson}</Text>

                            <Text className="font-semibold text-gray-800 m-0">NIDE / UID:</Text>
                            <Text className="text-gray-600 mb-2">{companyUid}</Text>

                            <Text className="font-semibold text-gray-800 m-0">Email:</Text>
                            <Text className="text-blue-600 underline">{email}</Text>
                        </Section>

                        <Text className="text-gray-700 mb-6">
                            Por favor, verifique os dados e aprove o usuário no painel do Supabase se estiver tudo correto.
                        </Text>

                        <Link
                            href="https://supabase.com/dashboard/project/_/editor/profiles"
                            className="bg-brand-600 text-white px-6 py-3 rounded-md font-semibold text-center block w-full"
                        >
                            Acessar Painel Admin
                        </Link>

                        <Hr className="my-6 border-gray-200" />

                        <Text className="text-xs text-gray-500 text-center">
                            La Global Express - Sistema de Notificações
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NewCompanyEmailTemplate;

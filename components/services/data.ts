import { Category, ServiceItem } from './types';



export const SERVICES: ServiceItem[] = [
    // Residencial
    {
        id: 'res-cleaning',
        title: 'Limpeza Executiva',
        description: 'Higienização profunda para residências de alto padrão. Utilizamos produtos biodegradáveis e tecnologia de ponta.',
        tag: 'Disponível 24/7',
        imageUrl: '/luxury-cleaning.png',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-truck-rental',
        title: 'Aluguel de Caminhão',
        description: 'Frota moderna para transporte de cargas e mudanças. Motoristas habilitados e seguro total.',
        tag: 'Frota Própria',
        imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-material',
        title: 'Fornecimento de Material',
        description: 'Materiais de construção e acabamento de alta qualidade para sua obra. Entrega agendada.',
        tag: 'Pronta Entrega',
        imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-assembly',
        title: 'Montagem Técnica',
        description: 'Especialistas em mobiliário de design e instalações complexas. Cuidado absoluto com suas peças.',
        tag: 'Garantia Total',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },

    // Corporativo
    {
        id: 'corp-concierge',
        title: 'Concierge',
        description: 'Serviços de recepção executiva, gestão de acessos e suporte administrativo premium para seu escritório.',
        tag: 'Atendimento Premium',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-cleaning',
        title: 'Limpeza Industrial',
        description: 'Equipes especializadas para grandes áreas, galpões e escritórios de grande porte com maquinário específico.',
        tag: 'Equipes Dedicadas',
        imageUrl: '/corporate-cleaning.png',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-waste',
        title: 'Déchetterie',
        description: 'Gestão sustentável de resíduos, coleta seletiva e descarte certificado de materiais corporativos.',
        tag: 'Sustentabilidade',
        imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-office-staff',
        title: 'Profissionais para Escritório',
        description: 'Suporte diário para copa, organização de mesas, limpeza de banheiros e manutenção da ordem no ambiente de trabalho.',
        tag: 'Suporte Operacional',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    }
];

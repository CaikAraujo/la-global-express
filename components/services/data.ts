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
        id: 'corp-facilities',
        title: 'Facilities Management',
        description: 'Gestão completa de instalações corporativas, focada em eficiência operacional e redução de custos.',
        tag: 'B2B Exclusivo',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-security',
        title: 'Segurança Inteligente',
        description: 'Monitoramento 24h com inteligência artificial e controle de acesso biométrico avançado.',
        tag: 'Alta Tecnologia',
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-cleaning',
        title: 'Limpeza Industrial',
        description: 'Equipes especializadas para grandes áreas, galpões e escritórios de grande porte.',
        tag: 'Equipes Dedicadas',
        imageUrl: '/corporate-cleaning.png',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-catering',
        title: 'Corporate Catering',
        description: 'Soluções de alimentação para eventos corporativos e gestão de refeitórios executivos.',
        tag: 'Chef Assinado',
        imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    }
];

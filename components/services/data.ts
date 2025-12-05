import { Category, ServiceItem } from './types';
import manutencaoImg from '../../assets/manutencao_predial.png';
import enxovalImg from '../../assets/gestao_enxoval.png';

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
        id: 'res-maint',
        title: 'Manutenção Predial',
        description: 'Reparos elétricos, hidráulicos e estruturais com laudo técnico detalhado e garantia de serviço.',
        tag: 'Técnicos Certificados',
        imageUrl: manutencaoImg,
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-laundry',
        title: 'Gestão de Enxoval',
        description: 'Passadoria e organização de rouparia com técnicas de hotelaria 5 estrelas. Delivery incluso.',
        tag: 'Delivery Incluso',
        imageUrl: enxovalImg,
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

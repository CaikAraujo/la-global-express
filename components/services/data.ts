import { Category, ServiceItem } from './types';



export const SERVICES: ServiceItem[] = [
    // Résidentiel
    {
        id: 'res-cleaning',
        title: 'Nettoyage Exécutif',
        description: 'Assainissement en profondeur pour résidences de haut standing. Nous utilisons des produits biodégradables et une technologie de pointe.',
        tag: 'Disponible 24/7',
        imageUrl: '/luxury-cleaning.png',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-truck-rental',
        title: 'Location de Camion',
        description: 'Flotte moderne pour le transport de charges et déménagements. Chauffeurs qualifiés et assurance complète.',
        tag: 'Flotte Propre',
        imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-material',
        title: 'Fourniture de Matériel',
        description: 'Matériaux de construction et de finition de haute qualité pour votre chantier. Livraison programmée.',
        tag: 'Livraison Immédiate',
        imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },
    {
        id: 'res-assembly',
        title: 'Montage Technique',
        description: 'Spécialistes en mobilier design et installations complexes. Soin absolu pour vos pièces.',
        tag: 'Garantie Totale',
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        category: Category.RESIDENCIAL
    },

    // Corporatif
    {
        id: 'corp-concierge',
        title: 'Conciergerie',
        description: 'Services de réception exécutive, gestion des accès et support administratif premium pour votre bureau.',
        tag: 'Service Premium',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-cleaning',
        title: 'Nettoyage Industriel',
        description: 'Équipes spécialisées pour grandes surfaces, entrepôts et grands bureaux avec machinerie spécifique.',
        tag: 'Équipes Dédiées',
        imageUrl: '/corporate-cleaning.png',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-waste',
        title: 'Déchetterie',
        description: 'Gestion durable des déchets, tri sélectif et élimination certifiée des matériaux d\'entreprise.',
        tag: 'Durabilité',
        imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    },
    {
        id: 'corp-office-staff',
        title: 'Personnel de Bureau',
        description: 'Support quotidien pour cafétéria, organisation des bureaux, nettoyage des sanitaires et maintien de l\'ordre sur le lieu de travail.',
        tag: 'Support Opérationnel',
        imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop',
        category: Category.CORPORATIVO
    }
];

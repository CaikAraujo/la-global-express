import { Clock, Award, EyeOff, ShieldCheck } from 'lucide-react';
import { Feature } from './types';

export const FEATURES: Feature[] = [
    {
        id: '1',
        icon: Clock,
        title: 'Ponctualité Absolue',
        description: 'Respect strict de votre temps. Nos professionnels suivent des plannings précis, garantissant que chaque étape du service soit exécutée au moment exact.'
    },
    {
        id: '2',
        icon: Award,
        title: 'Excellence Technique',
        description: 'Professionnels formés aux plus hauts standards globaux de facilities. Nous utilisons des méthodologies suisses pour assurer une finition impeccable dans chaque détail.'
    },
    {
        id: '3',
        icon: EyeOff,
        title: 'Discrétion Totale',
        description: 'Confidentialité et respect de votre vie privée sont des piliers fondamentaux. Notre équipe est formée pour être invisible si nécessaire et présente si sollicitée.'
    },
    {
        id: '4',
        icon: ShieldCheck,
        title: 'Garantie La Global',
        description: 'Assurance responsabilité civile et garantie de satisfaction pour tous les services. Votre tranquillité est notre principal indicateur de succès.'
    }
];

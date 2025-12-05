import { Clock, Award, EyeOff, ShieldCheck } from 'lucide-react';
import { Feature } from './types';

export const FEATURES: Feature[] = [
    {
        id: '1',
        icon: Clock,
        title: 'Pontualidade Absoluta',
        description: 'Respeito irrestrito ao seu tempo. Nossos profissionais seguem cronogramas precisos, garantindo que cada etapa do serviço seja executada no momento exato.'
    },
    {
        id: '2',
        icon: Award,
        title: 'Excelência Técnica',
        description: 'Profissionais treinados nos mais altos padrões globais de facilities. Utilizamos metodologias suíças para assegurar um acabamento impecável em cada detalhe.'
    },
    {
        id: '3',
        icon: EyeOff,
        title: 'Discrição Total',
        description: 'Sigilo e respeito à sua privacidade são pilares fundamentais. Nossa equipe é treinada para ser invisível quando necessário e presente quando solicitada.'
    },
    {
        id: '4',
        icon: ShieldCheck,
        title: 'Garantia La Global',
        description: 'Seguro de responsabilidade civil e garantia de satisfação em todos os serviços. Sua tranquilidade é o nosso principal indicador de sucesso.'
    }
];

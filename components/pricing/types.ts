export interface Feature {
    name: string;
    included: boolean;
    tooltip?: string;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    priceMonthly: number | null; // null for "Sob Consulta"
    priceYearly: number | null;
    features: Feature[];
    isRecommended?: boolean;
    cta: string;
    theme: 'light' | 'dark' | 'gold';
}

export enum Category {
    RESIDENCIAL = 'RESIDENCIAL',
    CORPORATIVO = 'CORPORATIVO'
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    tag: string;
    imageUrl: string;
    category: Category;
}

export interface SearchResponse {
    recommendedServiceId: string | null;
    reasoning: string;
}

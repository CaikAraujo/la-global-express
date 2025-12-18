export interface ServiceItem {
    id: string;
    name: string;
    price: number;
    duration: number;
    description?: string;
}

export interface BookingFormData {
    // Service Selection
    serviceId: string;
    serviceName: string;
    frequency: 'once' | 'weekly' | 'biweekly';
    duration: number;

    // DateTime
    date: string;
    time: string;

    // Customer Info
    name: string;
    email: string;
    phone: string;

    // Location
    address: string;
    canton: string;

    // Details
    observations: string;
    serviceDetails: string | any; // Keep permissive for legacy compat, but prefer string

    // Financials
    price: number;
    materialsTotal: number;

    // Internal
    acceptedTerms: boolean;
    items?: ServiceItem[]; // List of sub-services selected
    isIroning?: boolean; // Specific to Cleaning service navigation logic

    // Legacy fields found in usage
    status?: string;
    created_at?: string;
}

// Server Action Response
export interface BookingResponse {
    success?: boolean;
    error?: string;
    bookingId?: number | string;
}

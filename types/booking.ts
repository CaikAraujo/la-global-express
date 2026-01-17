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
    config?: any; // Raw configuration for server-side validation
    isIroning?: boolean; // Specific to Cleaning service navigation logic

    // Legacy fields found in usage
    created_at?: string;
}

// Service Specific Data Structures
export interface OfficeSupportData {
    role: 'pantry' | 'cleaning' | 'organizer' | 'maintenance' | 'reception' | 'general';
    staffCount: number;
    uniform: boolean;
    hoursPerDay: number;
}

export interface ConciergeData {
    serviceType: 'reception' | 'security' | 'admin';
    serviceLevel: 'standard' | 'premium';
    staffCount: number;
    hoursPerDay: number;
    languages: string[];
    uniform: boolean;
}

export interface CorporateCleaningData {
    facilityType: 'office' | 'industrial' | 'retail';
    areaSize: number;
    frequency: 'daily' | 'weekly' | 'biweekly';
    shift: 'night' | 'day';
}

export interface WasteData {
    wasteType: 'construction' | 'furniture' | 'green' | 'general';
    volume: number;
    access: 'easy' | 'hard';
    heavyItems: boolean;
}

export interface TruckData {
    selectedTruck: 'car' | 'van' | 'truck' | 'lift';
    period: 4 | 8;
    extraHours: number;
    extras: string[]; // IDs
}

export interface CleaningData {
    serviceCategory: 'standard' | 'heavy' | 'ironing';
    heavyType?: 'routine' | 'move' | 'construction';
    propertyType: 'studio' | 'apartment' | 'house';
    bedrooms: number;
    bathrooms: number;
    ironingHours: number;
    canton: string;
    extras: string[]; // IDs
    manualDuration: number;
}

// Server Action Response
export interface BookingResponse {
    success?: boolean;
    error?: string;
    bookingId?: number | string;
}

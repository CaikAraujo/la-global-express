export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: number;
  icon: string; // Lucide icon name
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface BookingIntent {
  serviceType: string;
  date?: string;
  details?: string;
  estimatedPrice?: string;
  confidence: number;
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export interface ValidationErrors {
  firstName?: string;
  email?: string;
  message?: string;
}

export enum InterestType {
  CORPORATE = "Conseil d'Entreprise",
  LOGISTICS = "Solutions Logistiques",
  SUPPORT = "Support Technique",
  PARTNERSHIP = "Partenariats",
  OTHER = "Autres Sujets"
}

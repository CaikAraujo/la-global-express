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

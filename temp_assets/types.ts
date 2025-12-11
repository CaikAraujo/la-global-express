import { LucideIcon } from "lucide-react";

export enum FrequencyType {
  SINGLE = 'single',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
}

export interface PlanFeature {
  text: string;
  highlight?: boolean;
}

export interface FrequencyOption {
  id: FrequencyType;
  title: string;
  subtitle: string;
  discountBadge?: string;
  priceMultiplier: number;
  features: PlanFeature[];
  bestValue?: boolean;
}

export interface TimeSlot {
  id: string;
  label: string;
  range: string;
  demand?: 'high' | 'normal' | 'low';
  discount?: boolean;
}

export interface DateOption {
  date: Date;
  isAvailable: boolean;
}

import {
    OfficeSupportData,
    ConciergeData,
    CorporateCleaningData,
    WasteData,
    TruckData,
    CleaningData
} from "@/types/booking";

export const PRICING_CONSTANTS = {
    OFFICE_SUPPORT: {
        BASE_RATES: {
            pantry: 45,
            cleaning: 42,
            organizer: 48,
            maintenance: 55,
            reception: 50,
            general: 45
        } as Record<string, number>,
        UNIFORM_DAILY_COST: 15,
    },
    CONCIERGE: {
        BASE_RATES: {
            reception: 45,
            security: 55,
            admin: 50
        } as Record<string, number>,
        PREMIUM_MULTIPLIER: 1.4,
        LANGUAGE_BONUS: 5
    },
    CORP_CLEANING: {
        BASE_RATES: {
            office: 3.5,
            industrial: 4.5,
            retail: 4.0
        } as Record<string, number>,
        MIN_PRICE: 150
    },
    WASTE: {
        BASE_FEE: 80,
        RATES: {
            construction: 90,
            furniture: 60,
            green: 45,
            general: 70
        } as Record<string, number>,
        ACCESS_FEE: 50,
        HEAVY_FEE: 80
    },
    TRUCK: {
        OPTIONS: {
            car: { price4h: 80, price8h: 80, fixed: true },
            van: { price4h: 120, price8h: 220, fixed: false },
            truck: { price4h: 150, price8h: 280, fixed: false },
            lift: { price4h: 400, price8h: 400, fixed: true }
        } as Record<string, any>,
        EXTRA_HOUR_RATE: 30,
        EXTRAS: {
            driver: 320,
            assembler: 270,
            helper: 240,
            trolley: 50,
            bubble_wrap: 80,
            boxes: 120
        } as Record<string, number>
    },
    RES_CLEANING: {
        CANTON_FEES: {
            'geneve': 30, 'vaud': 70, 'fribourg': 80,
            'neuchatel': 100, 'valais': 100, 'jura': 120
        } as Record<string, number>,
        BASE_STD: 560,
        BASE_HEAVY: 640,
        IRONING_RATE: 60,
        EXTRA_HOUR_MANUAL: 50,
        EXTRAS: {
            fridge: 30, cupboard: 50, window: 50,
            carpet: 30, outdoor: 60, ironing2h: 100, laundry: 40
        } as Record<string, number>
    }
};

// --- Office Support ---
export const calculateOfficeSupportPrice = (data: OfficeSupportData, frequency: string = 'once'): number => {
    const { role, staffCount, hoursPerDay, uniform } = data;
    const safeStaff = Math.max(1, Math.floor(Math.abs(staffCount || 1)));
    const safeHours = Math.max(1, Math.min(24, Math.floor(Math.abs(hoursPerDay || 4))));
    const safeRole = PRICING_CONSTANTS.OFFICE_SUPPORT.BASE_RATES[role] ? role : 'general';

    const hourlyRate = PRICING_CONSTANTS.OFFICE_SUPPORT.BASE_RATES[safeRole];
    const dailyLabor = hourlyRate * safeHours * safeStaff;
    const dailyUniform = uniform ? (PRICING_CONSTANTS.OFFICE_SUPPORT.UNIFORM_DAILY_COST * safeStaff) : 0;

    // Frequency Logic
    // 'once' (Avulso) = 1 Day
    // Others (Weekly) = 5 Days (Legacy assumption: "Weekly" means full week coverage)

    const days = frequency === 'once' ? 1 : 5;

    return (dailyLabor + dailyUniform) * days;
};

export const getOfficeSupportDetails = (data: OfficeSupportData): string => {
    const roleLabels: Record<string, string> = {
        pantry: 'Copa & Café',
        cleaning: 'Limpeza Fina',
        organizer: 'Organização',
        maintenance: 'Manutenção',
        reception: 'Recepção',
        general: 'Serviços Gerais'
    };

    const label = roleLabels[data.role] || 'Profissional';

    let details = `Profissionais para Escritório - ${label}`;
    details += `\n + ${data.staffCount} Profissiona${data.staffCount > 1 ? 'is' : 'l'}`;
    details += `\n + ${data.hoursPerDay} Horas/dia`;
    if (data.uniform) details += `\n + Uniforme Completo incluído`;

    return details;
};


// --- Concierge ---
export const calculateConciergePrice = (data: ConciergeData): number => {
    const { serviceType, serviceLevel, staffCount, hoursPerDay, languages } = data;
    const safeStaff = Math.max(1, Math.floor(Math.abs(staffCount || 1)));
    const safeHours = Math.max(1, Math.min(24, Math.floor(Math.abs(hoursPerDay || 4))));

    let baseRate = PRICING_CONSTANTS.CONCIERGE.BASE_RATES[serviceType] || 45;

    if (serviceLevel === 'premium') {
        baseRate *= PRICING_CONSTANTS.CONCIERGE.PREMIUM_MULTIPLIER;
    }

    if (serviceLevel === 'standard' && languages && languages.length > 1) {
        baseRate += PRICING_CONSTANTS.CONCIERGE.LANGUAGE_BONUS;
    }

    return baseRate * safeStaff * safeHours; // Daily Price
};

// --- Corporate Cleaning ---
export const calculateCorporateCleaningPrice = (data: CorporateCleaningData): number => {
    const { facilityType, areaSize } = data;
    const safeArea = Math.max(0, Math.abs(areaSize));

    let baseRate = PRICING_CONSTANTS.CORP_CLEANING.BASE_RATES[facilityType] || 3.5;

    let multiplier = 1;
    if (safeArea > 500) multiplier = 0.9;
    if (safeArea > 2000) multiplier = 0.8;

    let total = baseRate * safeArea * multiplier;
    return Math.max(PRICING_CONSTANTS.CORP_CLEANING.MIN_PRICE, Math.round(total));
};

// --- Waste ---
export const calculateWastePrice = (data: WasteData): number => {
    const { wasteType, volume, access, heavyItems } = data;
    const safeVol = Math.max(0, Math.abs(volume));

    let total = PRICING_CONSTANTS.WASTE.BASE_FEE;
    total += (PRICING_CONSTANTS.WASTE.RATES[wasteType] || 70) * safeVol;

    if (access === 'hard') total += PRICING_CONSTANTS.WASTE.ACCESS_FEE;
    if (heavyItems) total += PRICING_CONSTANTS.WASTE.HEAVY_FEE;

    return total;
};

// --- Truck ---
export const calculateTruckPrice = (data: TruckData): number => {
    const { selectedTruck, period, extraHours, extras } = data;
    const safeExtraHours = Math.max(0, Math.abs(extraHours));

    const truck = PRICING_CONSTANTS.TRUCK.OPTIONS[selectedTruck];
    if (!truck) return 0; // Invalid

    let price = 0;
    if (truck.fixed) {
        price = truck.price4h;
    } else {
        price = period === 4 ? truck.price4h : truck.price8h;
    }

    price += safeExtraHours * PRICING_CONSTANTS.TRUCK.EXTRA_HOUR_RATE;

    if (extras) {
        extras.forEach(id => {
            price += (PRICING_CONSTANTS.TRUCK.EXTRAS[id] || 0);
        });
    }

    return price;
};

// --- Res Cleaning ---
export const calculateCleaningPrice = (data: CleaningData): number => {
    let total = 0;
    const { canton, serviceCategory, ironingHours, heavyType, propertyType, bedrooms, bathrooms, extras, manualDuration } = data;

    total += (PRICING_CONSTANTS.RES_CLEANING.CANTON_FEES[canton] || 0);

    let calculatedDuration = 0;

    if (serviceCategory === 'ironing') {
        const safeHours = Math.max(0, Math.abs(ironingHours));
        total += safeHours * PRICING_CONSTANTS.RES_CLEANING.IRONING_RATE;
        calculatedDuration = safeHours;
    } else {
        let base = serviceCategory === 'heavy' ? PRICING_CONSTANTS.RES_CLEANING.BASE_HEAVY : PRICING_CONSTANTS.RES_CLEANING.BASE_STD;

        if (serviceCategory === 'heavy') {
            if (heavyType === 'move') base += 100;
            if (heavyType === 'construction') base += 150;
        }

        if (propertyType === 'house') base *= 1.3;

        const safeBed = Math.max(1, bedrooms);
        const safeBath = Math.max(1, bathrooms);

        const extraBeds = Math.max(0, safeBed - 1);
        const extraBaths = Math.max(0, safeBath - 1);

        const roomCost = (extraBeds * 60) + (extraBaths * 70);
        total += base + roomCost;

        calculatedDuration = 4 + extraBeds + extraBaths;
    }

    if (extras) {
        extras.forEach(id => {
            total += (PRICING_CONSTANTS.RES_CLEANING.EXTRAS[id] || 0);
        });
    }

    const safeManual = Math.max(0, manualDuration);
    const addedHours = Math.max(0, safeManual - calculatedDuration);

    if (addedHours > 0) {
        total += addedHours * PRICING_CONSTANTS.RES_CLEANING.EXTRA_HOUR_MANUAL;
    }

    return total;
};

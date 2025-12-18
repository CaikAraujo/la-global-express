import React, { useMemo, useRef, useCallback } from 'react';
import {
    Check,
    MapPin,
    Calendar as CalendarIcon,
    Info,
    Zap,
    ArrowRight,
    Sparkles,
    Clock,
    CalendarDays,
} from 'lucide-react';
import { format, addDays, isSameDay, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateTimeSelectionProps {
    date: string;
    time: string;
    frequency: string;
    duration: number;
    address: string;
    serviceName: string; // [NEW] Availability Filter
    canton?: string;
    onUpdate: (field: string, value: any) => void;
    hideFrequency?: boolean;
}

// --- Types & Constants from Source ---

type Feature = {
    text: string;
    highlight?: boolean;
};

type FrequencyOption = {
    id: string;
    title: string;
    subtitle: string;
    discountBadge?: string;
    priceMultiplier: number;
    bestValue?: boolean;
    features: Feature[];
};

const FREQUENCY_OPTIONS: FrequencyOption[] = [
    {
        id: 'once',
        title: "Avulso",
        subtitle: "Diária única",
        priceMultiplier: 1,
        features: [
            { text: "Profissional verificado" },
            { text: "Seguro incluso" },
        ]
    },
    {
        id: 'weekly',
        title: "Semanal",
        subtitle: "Toda semana",
        discountBadge: "20% OFF",
        priceMultiplier: 0.8,
        features: [
            { text: "Mesmo profissional sempre", highlight: true },
            { text: "Prioridade na agenda", highlight: true },
            { text: "Atendimento VIP WhatsApp" },
        ]
    },
    {
        id: 'biweekly',
        title: "Quinzenal",
        subtitle: "A cada 2 semanas",
        discountBadge: "15% OFF",
        priceMultiplier: 0.85,
        features: [
            { text: "Mesmo profissional sempre", highlight: true },
            { text: "Prioridade na agenda" },
        ]
    },
    {
        id: 'monthly',
        title: "Mensal",
        subtitle: "Uma vez ao mês",
        discountBadge: "10% OFF",
        priceMultiplier: 0.9,
        features: [
            { text: "Profissional recorrente" },
            { text: "Seguro incluso" },
        ]
    }
];

const TIME_SLOTS = [
    { id: '08:00', label: '08:00', range: 'até 12:00', demand: 'high' },
    { id: '09:00', label: '09:00', range: 'até 13:00' },
    { id: '10:00', label: '10:00', range: 'até 14:00', demand: 'low', discount: true },
    { id: '13:00', label: '13:00', range: 'até 17:00' },
    { id: '14:00', label: '14:00', range: 'até 18:00', demand: 'low', discount: true },
    { id: '15:00', label: '15:00', range: 'até 19:00' },
];

const CANTONS = [
    { id: 'GE', name: 'Genève' },
    { id: 'VD', name: 'Vaud (Lausanne)' },
    { id: 'FR', name: 'Fribourg' },
    { id: 'NE', name: 'Neuchâtel' },
    { id: 'VS', name: 'Valais (Sion)' },
    { id: 'JU', name: 'Jura' }
];

import { getAvailability } from '@/app/actions/getAvailability'; // Import the action

// ... imports

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
    date,
    time,
    frequency,
    duration,
    address,
    onUpdate,
    hideFrequency = false,
    canton,
    serviceName // [NEW]
}) => {
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [busySlots, setBusySlots] = React.useState<{ start: number, end: number }[]>([]);
    const [isLoadingAvailability, setIsLoadingAvailability] = React.useState(false);

    // Parse current selected date or default to tomorrow
    const selectedDateObj = useMemo(() => {
        if (!date) return addDays(startOfToday(), 1);
        const [y, m, d] = date.split('-').map(Number);
        return new Date(y, m - 1, d);
    }, [date]);

    // Fetch availability when date OR service changes
    // Fetch availability when date OR service changes
    React.useEffect(() => {
        const fetchSlots = async () => {
            if (!date) return;
            setIsLoadingAvailability(true);
            const slots = await getAvailability(date, serviceName);
            setBusySlots(slots);
            setIsLoadingAvailability(false);
        };
        fetchSlots();
    }, [date, serviceName]);

    // Auto-scroll effect (Top level)
    React.useEffect(() => {
        if (!date) return;
        const dateId = `date-card-${date}`;
        // Small timeout to allow DOM to settle
        const timer = setTimeout(() => {
            const el = document.getElementById(dateId);
            if (el) {
                el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [date]);

    // Logic: "One team for each time slot".
    // This means bookings are independent. A 4h job at 08:00 blocks ONLY 08:00.
    // 09:00 remains open for the "09:00 Team".

    // Check if a specific slot (start hour) is blocked
    const isSlotBlocked = useCallback((slotTime: string) => {
        const [h, m] = slotTime.split(':').map(Number);
        const myStart = h + (m / 60);

        // Check if there is ALREADY a booking starting at this EXACT time.
        // We ignore duration/overlaps because other slots have their own teams.
        const bookingsStartingHere = busySlots.filter(busy => {
            return Math.abs(busy.start - myStart) < 0.01; // Float comparison
        }).length;

        // "One for each time slot" means Limit = 1 per slot.
        return bookingsStartingHere >= 1;
    }, [busySlots]);

    // Generate next 14 days
    // ... rest of code
    const next14Days = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => addDays(startOfToday(), i));
    }, []);

    const isSelectedDateInList = next14Days.some(d => isSameDay(d, selectedDateObj));
    const currentPlan = FREQUENCY_OPTIONS.find(f => f.id === frequency);

    const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val) return;

        // Prevent selecting past dates manually
        const [y, m, d] = val.split('-').map(Number);
        const selected = new Date(y, m - 1, d); // Construct Local Date
        const today = startOfToday();

        // Reset time parts for comparison just to be safe (though startOfToday is 00:00)
        // If selected is before today, do nothing or alert? 
        // Better to just not update or reset to today.
        if (selected < today) {
            // Optional: alert("Não é possível agendar para datas passadas.");
            return;
        }

        onUpdate('date', val);
    };

    const handleDateClick = (d: Date) => {
        onUpdate('date', format(d, 'yyyy-MM-dd'));
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">

            {/* 1. Frequency Selection */}
            {!hideFrequency && (
                <section>
                    <div className="flex items-baseline justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Frequência</h2>
                        <span className="text-sm text-gray-500 hidden md:block">
                            Mude ou cancele a qualquer momento
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {FREQUENCY_OPTIONS.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => onUpdate('frequency', option.id)}
                                className={`
                    relative group cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300
                    ${frequency === option.id
                                        ? 'border-brand-red bg-red-50/50 shadow-lg shadow-brand-red/5 ring-1 ring-brand-red/20'
                                        : 'border-gray-100 bg-white hover:border-brand-red/30 hover:shadow-md'
                                    }
                  `}
                            >
                                {/* Badges */}
                                <div className="flex gap-2 absolute -top-3 left-4 right-0">
                                    {option.discountBadge && (
                                        <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                                            {option.discountBadge}
                                        </span>
                                    )}
                                </div>

                                {/* Radio Indicator */}
                                <div className="flex justify-between items-start mt-2 mb-3">
                                    <div>
                                        <h3 className={`font-bold text-lg ${frequency === option.id ? 'text-brand-dark' : 'text-gray-900'}`}>
                                            {option.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-medium">{option.subtitle}</p>
                                    </div>
                                    <div className={`
                      w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                      ${frequency === option.id ? 'border-brand-red bg-brand-red' : 'border-gray-300'}
                    `}>
                                        {frequency === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                </div>

                                {/* Features List */}
                                <ul className="space-y-2 mt-4 pt-4 border-t border-gray-100/80">
                                    {option.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs">
                                            <Check
                                                size={14}
                                                className={`mt-0.5 shrink-0 ${feature.highlight ? 'text-brand-red' : 'text-gray-400'}`}
                                            />
                                            <span className={`${feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 2. Date & Time Selection */}
            <section className="grid md:grid-cols-12 gap-8">

                {/* Date Picker */}
                <div className="md:col-span-7 space-y-4">

                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="text-brand-red" size={20} />
                            <h2 className="text-xl font-semibold text-gray-900">
                                {format(selectedDateObj, "MMMM", { locale: ptBR })}
                                <span className="text-gray-400 font-normal ml-2">{format(selectedDateObj, "yyyy")}</span>
                            </h2>
                        </div>

                        {/* Custom Date Trigger */}
                        <div className="relative">
                            <input
                                ref={dateInputRef}
                                type="date"
                                min={format(startOfToday(), 'yyyy-MM-dd')}
                                className="absolute inset-0 opacity-0 pointer-events-none"
                                onChange={handleCustomDateChange}
                            />
                            <button
                                onClick={() => dateInputRef.current?.showPicker()}
                                className="text-sm font-medium text-brand-red hover:text-brand-dark flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <CalendarDays size={16} />
                                Calendário
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Scroll Shadows */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none md:hidden" />
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none md:hidden" />

                        <div
                            id="date-scroller"
                            className={`
                                ${hideFrequency
                                    ? 'grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3'
                                    : 'flex overflow-x-auto gap-3 pb-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent'
                                }
                            `}
                            style={hideFrequency ? {} : { scrollbarWidth: 'thin' }}
                        >
                            {/* Special Case: Render Custom Date if it's not in the visible list */}
                            {!isSelectedDateInList && (
                                <button
                                    onClick={() => handleDateClick(selectedDateObj)}
                                    className="shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl shadow-lg shadow-brand-red/20 bg-brand-red text-white transform scale-100 ring-2 ring-brand-red z-20"
                                >
                                    <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5 opacity-90">
                                        {format(selectedDateObj, 'EEE', { locale: ptBR })}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {format(selectedDateObj, 'd')}
                                    </span>
                                    <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full mt-1">
                                        Esc
                                    </span>
                                </button>
                            )}

                            {/* Standard List */}
                            {/* Standard List */}
                            {next14Days.map((d, index) => {
                                const isSelected = !!date && isSameDay(d, selectedDateObj);
                                const isToday = isSameDay(d, startOfToday());
                                const dateId = `date-card-${format(d, 'yyyy-MM-dd')}`;



                                return (
                                    <button
                                        key={index}
                                        id={dateId}
                                        onClick={() => handleDateClick(d)}
                                        className={`
                      shrink-0 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300
                      ${hideFrequency ? 'w-full h-24' : 'w-[72px] h-[88px]'}
                      ${isSelected
                                                ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20 transform scale-100 z-10'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-brand-red/30 hover:text-brand-red hover:shadow-md'
                                            }
                    `}
                                    >
                                        <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isSelected ? 'opacity-90' : 'opacity-60'}`}>
                                            {isToday ? 'Hoje' : format(d, 'EEE', { locale: ptBR })}
                                        </span>
                                        <span className={`text-3xl font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                            {format(d, 'd')}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>


                </div>

                {/* Time Picker */}
                <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Clock className="text-brand-red" size={20} />
                            <h2 className="text-xl font-semibold text-gray-900">Horário</h2>
                        </div>
                        {time && (
                            <span className="text-xs font-medium text-brand-red animate-in fade-in bg-red-50 px-2 py-1 rounded-md">
                                {(() => {
                                    const [h] = time.split(':').map(Number);
                                    const endTotal = h + duration;
                                    const endH = Math.floor(endTotal);
                                    const endM = Math.round((endTotal % 1) * 60);
                                    const endMStr = endM.toString().padStart(2, '0');
                                    return `até ${endH}:${endMStr}`;
                                })()}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {TIME_SLOTS.map((slot) => {
                            const isActive = time === slot.id;
                            const isBlocked = isSlotBlocked(slot.id); // Check availability
                            return (
                                <button
                                    key={slot.id}
                                    onClick={() => !isBlocked && onUpdate('time', slot.id)} // Prevent click
                                    disabled={isBlocked}
                                    className={`
                    relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 group
                    ${isActive
                                            ? 'bg-red-50 border-brand-red ring-1 ring-brand-red shadow-sm'
                                            : isBlocked
                                                ? 'bg-gray-100 border-gray-100 opacity-50 cursor-not-allowed' // Disabled style
                                                : 'bg-white border-gray-100 hover:border-green-500/50 hover:bg-green-500/10 hover:shadow-sm'
                                        }
                  `}
                                >
                                    <div className="flex justify-between w-full items-center">
                                        <span className={`text-lg font-bold ${isActive ? 'text-brand-dark' : 'text-gray-900'}`}>
                                            {slot.label}
                                        </span>
                                        {isActive
                                            ? <div className="w-2 h-2 rounded-full bg-brand-red transition-transform" />
                                            : <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-green-500/30 transition-colors" />
                                        }
                                    </div>

                                    {/* Dynamic Range based on duration? logic can be here, using static for now matching source */}
                                    <span className={`text-xs ${isActive ? 'text-brand-red' : 'text-gray-400'}`}>
                                        {/* Calculate end time based on duration prop if possible */}
                                        {(() => {
                                            const [h] = slot.id.split(':').map(Number);
                                            const endTotal = h + duration;
                                            const endH = Math.floor(endTotal);
                                            const endM = Math.round((endTotal % 1) * 60);
                                            const endMStr = endM.toString().padStart(2, '0');
                                            return `até ${endH}:${endMStr}`;
                                        })()}
                                    </span>

                                    {isBlocked && (
                                        <span className="text-[10px] font-bold text-red-500 mt-1">
                                            Indisponível
                                        </span>
                                    )}

                                    {/* Tags */}
                                    <div className="flex gap-1 mt-1">
                                        {slot.demand === 'high' && (
                                            <span className="text-[9px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                <Zap size={8} fill="currentColor" /> Alta
                                            </span>
                                        )}
                                        {slot.discount && (
                                            <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                                % OFF
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. Address Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Onde será o serviço?</h2>

                <div className="grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-12 relative group">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-red transition-colors" size={20} />
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => onUpdate('address', e.target.value)}
                            placeholder="Digite o CEP ou endereço completo"
                            className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all shadow-sm hover:border-gray-300"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

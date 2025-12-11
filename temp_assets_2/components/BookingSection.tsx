import React, { useState, useMemo, useRef } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { FrequencyType, FrequencyOption, TimeSlot } from '../types';
import { format, addDays, isSameDay, startOfToday, isBefore, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// --- Mock Data ---

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    id: FrequencyType.SINGLE,
    title: "Avulso",
    subtitle: "Diária única",
    priceMultiplier: 1,
    features: [
      { text: "Profissional verificado" },
      { text: "Seguro incluso" },
    ]
  },
  {
    id: FrequencyType.WEEKLY,
    title: "Semanal",
    subtitle: "Toda semana",
    discountBadge: "20% OFF",
    priceMultiplier: 0.8,
    bestValue: true,
    features: [
      { text: "Mesmo profissional sempre", highlight: true },
      { text: "Prioridade na agenda", highlight: true },
      { text: "Atendimento VIP WhatsApp" },
    ]
  },
  {
    id: FrequencyType.BIWEEKLY,
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
    id: FrequencyType.MONTHLY,
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

const TIME_SLOTS: TimeSlot[] = [
  { id: 't1', label: '08:00', range: 'até 12:00', demand: 'high' },
  { id: 't2', label: '09:00', range: 'até 13:00' },
  { id: 't3', label: '10:00', range: 'até 14:00', demand: 'low', discount: true },
  { id: 't4', label: '13:00', range: 'até 17:00' },
  { id: 't5', label: '14:00', range: 'até 18:00', demand: 'low', discount: true },
];

export const BookingSection: React.FC = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<FrequencyType>(FrequencyType.WEEKLY);
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(startOfToday(), 1));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Generate next 14 days
  const next14Days = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => addDays(startOfToday(), i));
  }, []);

  // Determine if the selected date is within the standard list
  const isSelectedDateInList = next14Days.some(d => isSameDay(d, selectedDate));

  const currentPlan = FREQUENCY_OPTIONS.find(f => f.id === selectedFrequency);

  const handleDateScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('date-scroller');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      // Create date at noon to avoid timezone offset issues
      const dateParts = e.target.value.split('-');
      const newDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      setSelectedDate(newDate);
    }
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Frequency Selection */}
      <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-display font-semibold text-gray-900">Frequência</h2>
          <span className="text-sm text-gray-500 hidden md:block">
            Mude ou cancele a qualquer momento
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FREQUENCY_OPTIONS.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedFrequency(option.id)}
              className={`
                relative group cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300
                ${selectedFrequency === option.id 
                  ? 'border-primary-600 bg-primary-50/30 shadow-lg shadow-primary-900/5 ring-1 ring-primary-600/20' 
                  : 'border-gray-100 bg-white hover:border-primary-200 hover:shadow-md'
                }
              `}
            >
              {/* Badges */}
              <div className="flex gap-2 absolute -top-3 left-4 right-0">
                {option.discountBadge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
                    {option.discountBadge}
                  </span>
                )}
                {option.bestValue && (
                  <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={10} /> Popular
                  </span>
                )}
              </div>

              {/* Radio Indicator */}
              <div className="flex justify-between items-start mt-2 mb-3">
                <div>
                  <h3 className={`font-display font-bold text-lg ${selectedFrequency === option.id ? 'text-primary-800' : 'text-gray-900'}`}>
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{option.subtitle}</p>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                  ${selectedFrequency === option.id ? 'border-primary-600 bg-primary-600' : 'border-gray-300'}
                `}>
                  {selectedFrequency === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-2 mt-4 pt-4 border-t border-gray-100/80">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs">
                    <Check 
                      size={14} 
                      className={`mt-0.5 shrink-0 ${feature.highlight ? 'text-primary-600' : 'text-gray-400'}`} 
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

      {/* 2. Date & Time Selection */}
      <section className="grid md:grid-cols-12 gap-8 animate-slide-up" style={{ animationDelay: '300ms' }}>
        
        {/* Date Picker */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-primary-600" size={20} />
              <h2 className="text-xl font-display font-semibold text-gray-900">
                {format(selectedDate, "MMMM", { locale: ptBR })}
                <span className="text-gray-400 font-normal ml-2">{format(selectedDate, "yyyy")}</span>
              </h2>
            </div>
            
            {/* Custom Date Trigger (Hidden Input) */}
            <div className="relative">
              <input 
                ref={dateInputRef}
                type="date" 
                min={format(new Date(), 'yyyy-MM-dd')}
                className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                onChange={handleCustomDateChange}
              />
              <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors">
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
              className="flex overflow-x-auto hide-scrollbar snap-x p-1 gap-3 pb-4"
            >
              {/* Special Case: Render Custom Date if it's not in the visible list */}
              {!isSelectedDateInList && (
                 <button
                 onClick={() => setSelectedDate(selectedDate)}
                 className="snap-start shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl shadow-lg shadow-primary-900/20 bg-primary-600 text-white transform scale-100 ring-2 ring-primary-600 z-20"
               >
                 <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5 opacity-90">
                   {format(selectedDate, 'EEE', { locale: ptBR })}
                 </span>
                 <span className="text-2xl font-display font-bold">
                   {format(selectedDate, 'd')}
                 </span>
                 <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full mt-1">
                   Esc
                 </span>
               </button>
              )}

              {/* Standard List */}
              {next14Days.map((date, index) => {
                const isSelected = isSameDay(date, selectedDate);
                const isToday = isSameDay(date, startOfToday());
                
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      snap-start shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl border transition-all duration-300
                      ${isSelected 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-900/20 transform scale-100 z-10' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:shadow-md'
                      }
                    `}
                  >
                    <span className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isSelected ? 'opacity-90' : 'opacity-60'}`}>
                      {isToday ? 'Hoje' : format(date, 'EEE', { locale: ptBR })}
                    </span>
                    <span className={`text-3xl font-display font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                      {format(date, 'd')}
                    </span>
                  </button>
                );
              })}

              {/* "More Dates" Card at the end of the list */}
              <button
                onClick={() => dateInputRef.current?.showPicker()}
                className="snap-start shrink-0 flex flex-col items-center justify-center w-[72px] h-[88px] rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all gap-1 group"
              >
                <CalendarDays size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-center leading-tight">
                  Outra<br/>Data
                </span>
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex gap-3 items-start border border-blue-100">
            <Info size={18} className="shrink-0 mt-0.5 text-blue-600" />
            <p>
              Agendamentos para <strong>{format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}</strong> 
              {isSameDay(selectedDate, startOfToday()) 
                ? ' possuem taxa de urgência.'
                : ' estão com preço normal.'
              }
              <span className="block mt-1 text-blue-600 underline cursor-pointer font-bold hover:text-blue-800 text-xs uppercase tracking-wide">
                Ver política de reagendamento
              </span>
            </p>
          </div>
        </div>

        {/* Time Picker */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="text-primary-600" size={20} />
              <h2 className="text-xl font-display font-semibold text-gray-900">Horário</h2>
            </div>
            {selectedTime && (
              <span className="text-xs font-medium text-primary-600 animate-fade-in bg-primary-50 px-2 py-1 rounded-md">
                {TIME_SLOTS.find(t => t.id === selectedTime)?.range}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
            {TIME_SLOTS.map((slot) => {
              const isActive = selectedTime === slot.id;
              return (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTime(slot.id)}
                  className={`
                    relative p-3 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 group
                    ${isActive 
                      ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500 shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-primary-200 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex justify-between w-full items-center">
                    <span className={`text-lg font-bold font-display ${isActive ? 'text-primary-900' : 'text-gray-900'}`}>
                      {slot.label}
                    </span>
                    {isActive 
                      ? <div className="w-2 h-2 rounded-full bg-primary-500 animate-scale-in" />
                      : <div className="w-2 h-2 rounded-full bg-gray-200 group-hover:bg-primary-200 transition-colors" />
                    }
                  </div>
                  
                  <span className={`text-xs ${isActive ? 'text-primary-700' : 'text-gray-400'}`}>
                    {slot.range}
                  </span>

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
      <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">Onde será o serviço?</h2>
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-600 transition-colors" size={20} />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Digite o CEP ou endereço completo"
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm hover:border-gray-300"
          />
        </div>
      </section>

      {/* Sticky Bottom Bar / Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-8 md:pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Total estimado</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-gray-400 line-through">R$ 200</span>
              <span className="text-2xl font-display font-bold text-gray-900">R$ 160</span>
            </div>
            {currentPlan?.discountBadge && (
              <span className="text-xs text-rose-500 font-medium">
                Economia aplicada de {currentPlan.discountBadge}
              </span>
            )}
          </div>

          <button 
            disabled={!selectedTime || !address}
            className={`
              flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary-500/30
              ${(!selectedTime || !address)
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-primary-600 hover:bg-primary-700 text-white transform hover:-translate-y-1'
              }
            `}
          >
            Avançar
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
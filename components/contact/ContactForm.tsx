"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Loader2, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { ContactFormState, InterestType } from '../../types';
import { analyzeIntent } from '@/app/actions/contact';
import { CustomSelect } from '../ui/CustomSelect';
import { contactSchema } from '../../lib/schemas/contact';
import { ZodError } from 'zod';
import { useTranslations } from 'next-intl';

// Lightweight Confetti Component
const ConfettiExplosion: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full parent size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const particles: any[] = [];
        const colors = ['#FF1F1F', '#F5F5F0', '#ffffff']; // Brand colors

        // Create particles
        for (let i = 0; i < 80; i++) {
            const angle = (Math.random() * Math.PI) + Math.PI; // Upward explosion
            const velocity = Math.random() * 15 + 5;
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2 + 50,
                vx: Math.cos(angle) * velocity + (Math.random() - 0.5) * 5,
                vy: Math.sin(angle) * velocity,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 3 + 1,
                decay: 0.02,
                life: 1
            });
        }

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let activeParticles = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    activeParticles = true;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.4; // Gravity
                    p.vx *= 0.95; // Air resistance
                    p.life -= p.decay;

                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (activeParticles) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />;
};

const ContactForm: React.FC = () => {
    const t = useTranslations('Contact.form');
    // Using keys for InterestType mapping
    // We assume backend handles the Enum values or we send the localized label? 
    // Ideally we send the Enum KEY (e.g. CORPORATE) and display the localized label.
    // The current state uses 'InterestType' values which are French strings.
    // We should probably change the select to hold the Enum KEYS (CORPORATE, etc) as value.

    const [formData, setFormData] = useState<ContactFormState>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isTyping, setIsTyping] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Debounce logic for AI analysis
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (formData.message.length > 15 && !formData.interest) {
                setIsAnalyzing(true);
                const suggestedCategory = await analyzeIntent(formData.message);
                if (suggestedCategory) {
                    setAiSuggestion(suggestedCategory);
                    // Assuming analyzeIntent returns the Enum Value or Key. 
                    // If it returns the French string, we might need to map it if we switch to Keys.
                    setFormData(prev => ({ ...prev, interest: suggestedCategory }));
                }
                setIsAnalyzing(false);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [formData.message, formData.interest]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'message') setIsTyping(true);
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate with Zod
        const result = contactSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                formattedErrors[String(issue.path[0])] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        setSubmitted(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Idk error');
            }

            setIsSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' });
            setAiSuggestion(null);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Error sending message');
        } finally {
            setSubmitted(false);
        }
    };

    const handleReset = () => {
        setIsSuccess(false);
    };

    const interestOptions = Object.keys(InterestType).map(key => {
        return {
            value: InterestType[key as keyof typeof InterestType], // Keeps original values for backend compatibility
            label: t(`interests.${key}`) // Uses translated label for display
        };
    });

    if (isSuccess) {
        return (
            <div className="relative bg-brand-navy p-8 md:p-12 text-white overflow-hidden shadow-2xl h-full min-h-[640px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                {/* Decorative branding line */}
                <div className="absolute top-0 left-0 w-24 h-1 bg-brand-red"></div>

                <ConfettiExplosion />

                <div className="relative mb-8 z-10">
                    {/* Animated Check Circle */}
                    <div className="w-24 h-24 rounded-full border-2 border-brand-red flex items-center justify-center mb-6 relative">
                        <div className="absolute inset-0 bg-brand-red/20 rounded-full animate-ping duration-1000"></div>
                        <Check className="w-10 h-10 text-brand-red" strokeWidth={3} />
                    </div>
                </div>

                <div className="z-10 relative">
                    <h2 className="font-display font-bold text-4xl mb-4 text-white tracking-tight">{t('success.received')}</h2>
                    <p className="text-gray-400 max-w-sm mx-auto mb-12 leading-relaxed text-sm tracking-wide">
                        {t('success.message')}
                    </p>

                    <button
                        onClick={handleReset}
                        className="group flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-brand-red transition-colors mx-auto"
                    >
                        <span>{t('success.newMessage')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Background decorative elements */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/2 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        )
    }

    return (
        <div className="relative bg-brand-navy p-8 md:p-12 text-white overflow-hidden shadow-2xl transition-all duration-500 min-h-[640px]">
            {/* Decorative branding line */}
            <div className="absolute top-0 left-0 w-24 h-1 bg-brand-red"></div>

            <div className="mb-10">
                <h2 className="font-display font-bold text-3xl mb-2">{t('title')}</h2>
                <p className="text-gray-400 text-sm">
                    {t('description')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                            {t('labels.firstName')}
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all placeholder-gray-500 focus:placeholder-transparent font-display ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
                            placeholder={t('placeholders.firstName')}
                        />
                        {errors.firstName && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.firstName}</span>}
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                            {t('labels.lastName')}
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all placeholder-gray-500 focus:placeholder-transparent font-display ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
                            placeholder={t('placeholders.lastName')}
                        />
                        {errors.lastName && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.lastName}</span>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                            {t('labels.email')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all placeholder-gray-500 focus:placeholder-transparent font-display ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                            placeholder={t('placeholders.email')}
                        />
                        {errors.email && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</span>}
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                            {t('labels.phone')} <span className="text-[10px] normal-case tracking-normal opacity-60">({t('labels.optional')})</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all placeholder-gray-500 focus:placeholder-transparent font-display ${errors.phone ? 'ring-2 ring-red-500' : ''}`}
                            placeholder={t('placeholders.phone')}
                        />
                        {errors.phone && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</span>}
                    </div>
                </div>

                <div className="group relative">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                        {t('labels.interest')}
                        {isAnalyzing && <Loader2 className="w-3 h-3 animate-spin text-brand-red" />}
                        {aiSuggestion && !isAnalyzing && (
                            <span className="flex items-center gap-1 text-[10px] bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full normal-case tracking-normal border border-brand-red/20 animate-pulse">
                                <Sparkles className="w-3 h-3" />
                                {t('labels.suggested')}
                            </span>
                        )}
                    </label>
                    <div className="relative z-50">
                        <CustomSelect
                            value={formData.interest}
                            onChange={(value) => {
                                setFormData(prev => ({ ...prev, interest: value }));
                                if (errors.interest) {
                                    setErrors(prev => { const n = { ...prev }; delete n.interest; return n; })
                                }
                            }}
                            options={interestOptions}
                            placeholder={t('placeholders.interest')}
                            className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-red transition-all font-display ${errors.interest ? 'ring-2 ring-red-500' : ''}`}
                        />
                        {errors.interest && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.interest}</span>}
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase group-focus-within:text-brand-red transition-colors">
                        {t('labels.message')}
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full bg-brand-cream border-none rounded-lg px-4 py-3 text-lg text-black focus:outline-none focus:ring-2 focus:ring-brand-red transition-all placeholder-gray-500 resize-none focus:placeholder-transparent font-display ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                        placeholder={t('placeholders.message')}
                    />
                    {errors.message && <span className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={submitted}
                    className="w-full bg-brand-red text-white py-4 px-6 flex items-center justify-between group hover:bg-white hover:text-brand-red transition-all duration-300 mt-8"
                >
                    <span className="font-bold uppercase tracking-widest text-sm">
                        {submitted ? t('submit.sending') : t('submit.default')}
                    </span>
                    {submitted ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                </button>
            </form>

            {/* Background decorative elements */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};

export default ContactForm;

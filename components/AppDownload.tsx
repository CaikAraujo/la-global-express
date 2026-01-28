import React from 'react';
import { Bell, CheckCircle, Smartphone, MapPin, ChevronRight } from 'lucide-react';

const AppDownload: React.FC = () => {
    return (
        <section className="bg-brand-600 py-24 overflow-hidden relative">
            {/* Background Decor - Abstract Swiss Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-20%] w-[800px] h-[800px] bg-black/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">

                    {/* Text Content */}
                    <div className="flex-1 max-w-lg text-white space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10 text-white shadow-lg">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
                                App Exclusive
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                                Gestion totale <br />au creux de la main.
                            </h2>
                        </div>

                        <p className="text-white/90 text-lg leading-relaxed font-light">
                            Contrôlez les plannings en temps réel, approuvez des devis complexes et accédez à des rapports techniques détaillés avec une sécurité de niveau bancaire.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-6">
                            {/* Apple Button */}
                            <button className="group bg-black text-white px-6 py-3 rounded-xl flex items-center gap-4 hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300 border border-white/10">
                                <div className="w-6 h-6 fill-current">
                                    <svg viewBox="0 0 384 512" className="fill-white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" /></svg>
                                </div>
                                <div className="text-left leading-none">
                                    <div className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Download on the</div>
                                    <div className="font-bold text-lg font-sans">App Store</div>
                                </div>
                            </button>

                            {/* Google Button */}
                            <button className="group bg-black text-white px-6 py-3 rounded-xl flex items-center gap-4 hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 duration-300 border border-white/10">
                                <div className="w-6 h-6 fill-current">
                                    <svg viewBox="0 0 512 512" className="fill-white"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.2-60.1-60.1L47 499z" /></svg>
                                </div>
                                <div className="text-left leading-none">
                                    <div className="text-[9px] uppercase tracking-widest opacity-60 mb-1">Get it on</div>
                                    <div className="font-bold text-lg font-sans">Google Play</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Realistic iPhone Mockup */}
                    <div className="flex-1 flex justify-center perspective-[1000px] relative mt-16 md:mt-0">

                        {/* Dynamic Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[600px] bg-brand-500 blur-[80px] opacity-40 animate-pulse"></div>

                        {/* Phone Chassis */}
                        <div className="relative w-[320px] h-[650px] bg-[#121212] rounded-[60px] animate-float z-10 shadow-[0_0_0_4px_#3a3a3a,0_0_0_8px_#1a1a1a,0_20px_50px_-10px_rgba(0,0,0,0.5)] border-[6px] border-[#2a2a2a]">

                            {/* Steel Frame Gradient Effect */}
                            <div className="absolute inset-0 rounded-[52px] border-[2px] border-white/10 pointer-events-none z-50 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>

                            {/* Glass Reflection Overlay */}
                            <div className="absolute inset-0 rounded-[52px] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-40 opacity-50"></div>

                            {/* Dynamic Island */}
                            <div className="absolute top-7 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-30 flex items-center justify-center shadow-lg">
                                {/* Sensors */}
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] opacity-50 absolute right-2 blur-[1px]"></div> {/* Camera Reflection */}
                                    <div className="w-2 h-2 rounded-full bg-[#0d0d0d] shadow-inner"></div> {/* Lens */}
                                </div>
                            </div>

                            {/* Silent Switch */}
                            <div className="absolute top-28 -left-[10px] w-[4px] h-6 bg-[#2a2a2a] rounded-l-md shadow-[-2px_0_2px_rgba(0,0,0,0.5)]"></div>
                            {/* Volume Up */}
                            <div className="absolute top-44 -left-[10px] w-[4px] h-12 bg-[#2a2a2a] rounded-l-md shadow-[-2px_0_2px_rgba(0,0,0,0.5)]"></div>
                            {/* Volume Down */}
                            <div className="absolute top-60 -left-[10px] w-[4px] h-12 bg-[#2a2a2a] rounded-l-md shadow-[-2px_0_2px_rgba(0,0,0,0.5)]"></div>
                            {/* Power Button */}
                            <div className="absolute top-48 -right-[10px] w-[4px] h-20 bg-[#2a2a2a] rounded-r-md shadow-[2px_0_2px_rgba(0,0,0,0.5)]"></div>

                            {/* Screen Content */}
                            <div className="w-full h-full bg-[#F2F2F7] rounded-[52px] overflow-hidden flex flex-col relative">

                                {/* Status Bar */}
                                <div className="pt-5 px-8 flex justify-between items-end pb-2 z-20">
                                    <span className="text-[14px] font-semibold text-gray-900 tracking-wide pl-2">9:41</span>
                                    <div className="flex gap-1.5 items-center pr-2">
                                        <div className="w-4 h-2.5 bg-gray-900 rounded-[2px]"></div>
                                        <div className="w-4 h-2.5 bg-gray-900 rounded-[2px]"></div>
                                        <div className="w-6 h-3 border-[1.5px] border-gray-900 rounded-[4px] p-[1px] relative flex items-center">
                                            <div className="bg-gray-900 w-full h-full rounded-[1px]"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* App Content */}
                                <div className="flex-1 flex flex-col pt-4 relative overflow-hidden">

                                    {/* Header */}
                                    <div className="px-6 mb-8 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Bienvenue</h3>
                                            <h2 className="text-2xl font-bold text-gray-900">LA Global</h2>
                                        </div>
                                        <div className="w-10 h-10 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-brand-600/30">
                                            P
                                        </div>
                                    </div>

                                    {/* Search Bar Fake */}
                                    <div className="px-6 mb-8">
                                        <div className="bg-white p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-100">
                                            <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                                            <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Featured Widget - Live Activity */}
                                    <div className="mx-6 p-6 bg-brand-600 rounded-[32px] shadow-xl shadow-brand-600/30 text-white mb-8 transform transition-all duration-1000 animate-slide-up relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Smartphone size={80} />
                                        </div>

                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                                Maintenant
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold mb-1">Nettoyage Exécutif</h4>
                                        <div className="flex items-center gap-2 text-white/80 text-sm mb-6">
                                            <MapPin size={12} />
                                            <span>Av. Paulista, 1000</span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden mb-2">
                                            <div className="h-full bg-white w-[75%] rounded-full relative shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] text-white/70 font-bold uppercase tracking-wider">
                                            <span>Statut : Finalisation</span>
                                            <span>14:30</span>
                                        </div>
                                    </div>

                                    {/* Scrollable List */}
                                    <div className="flex-1 bg-white rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-8 animate-slide-up-delayed">
                                        <h5 className="font-bold text-gray-900 text-sm mb-6">Services Récents</h5>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                                        <CheckCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <h6 className="font-bold text-gray-900">Maintenance Électrique</h6>
                                                        <p className="text-xs text-gray-500">Hier, 15:00</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </div>

                                            <div className="flex items-center justify-between group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                                        <CheckCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <h6 className="font-bold text-gray-900">Gestion de Linge</h6>
                                                        <p className="text-xs text-gray-500">10 Fév</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </div>

                                            <div className="flex items-center justify-between group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                                                        <CheckCircle size={20} />
                                                    </div>
                                                    <div>
                                                        <h6 className="font-bold text-gray-900">Gestão de Enxoval</h6>
                                                        <p className="text-xs text-gray-500">10 Fev</p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={16} className="text-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gray-900 rounded-full opacity-90 z-30"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        .animate-float {
            animation: float 8s ease-in-out infinite;
        }
        @keyframes slide-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
            animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-slide-up-delayed {
            animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards;
            opacity: 0;
        }
      `}</style>
        </section>
    );
};

export default AppDownload;
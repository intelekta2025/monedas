import React, { useState, useEffect } from 'react';
import {
    Activity, Gavel
} from 'lucide-react';

const NumisVaultDashboard = ({ isDarkMode }) => {
    // Simulación de datos en tiempo real para la subasta
    const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s === 0) return { m: prev.m - 1, s: 59 };
                return { ...prev, s: prev.s - 1 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Theme Config
    const theme = {
        bg: isDarkMode ? 'bg-black' : 'bg-gray-100',
        textMain: isDarkMode ? 'text-slate-300' : 'text-slate-600',
        cardBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
        cardBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
        headerBg: isDarkMode ? 'bg-slate-900/80' : 'bg-white/80',
        title: isDarkMode ? 'text-white' : 'text-slate-900',
        subtitle: isDarkMode ? 'text-slate-400' : 'text-slate-500',
        leaderboard1: isDarkMode ? 'from-slate-800 to-slate-900' : 'from-gray-50 to-white',
        leaderboardItem: isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50 border-gray-100',
        input: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200',
    };

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-amber-500/30 flex items-center justify-center p-6`}>

            {/* SALA DE SUBASTA */}
            <div className={`w-full max-w-5xl ${theme.cardBg} border ${theme.cardBorder} rounded-2xl overflow-hidden shadow-2xl relative group transition-colors duration-300`}>
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className={`p-6 border-b ${theme.cardBorder} flex justify-between items-center ${theme.headerBg} backdrop-blur relative z-10`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Gavel className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold ${theme.title}`}>Sala de Cierre Privada #01</h3>
                            <p className="text-xs text-amber-500 font-mono">LOTE ACTIVO: 8 REALES 1740 (POTOSÍ)</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs uppercase ${theme.subtitle}`}>Tiempo Restante</p>
                        <div className="text-3xl font-mono font-bold text-red-500">
                            00:{timeLeft.m}:{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}
                        </div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {/* Info de la Pieza */}
                    <div className="space-y-4">
                        <div className={`aspect-square ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'} rounded-xl border ${theme.cardBorder} flex items-center justify-center relative overflow-hidden transition-colors`}>
                            <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/80' : 'from-gray-900/10'} to-transparent z-10 transition-colors`}></div>
                            {/* Imagen de Moneda Real */}
                            <div className="w-64 h-64 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.5)] z-0 transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src="/coin_8_reales.png"
                                    alt="8 Reales 1740 Potosí"
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                            <div className="absolute bottom-4 left-4 z-20">
                                <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm font-bold`}>Oferta Actual</p>
                                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>$22,500 MXN</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-red-900/20">
                                DETENER SUBASTA
                            </button>
                            <button className={`flex-1 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white' : 'bg-white hover:bg-gray-50 border-gray-300 text-slate-700'} py-2 rounded-lg font-bold text-sm border transition-colors`}>
                                PAUSAR
                            </button>
                        </div>
                    </div>

                    {/* Leaderboard en Vivo */}
                    <div className="space-y-3">
                        <h4 className={`text-sm font-semibold mb-2 ${theme.subtitle}`}>TABLA DE LÍDERES (ANÓNIMA)</h4>

                        {/* Líder */}
                        <div className={`bg-gradient-to-r ${theme.leaderboard1} p-4 rounded-xl border border-amber-500/50 flex justify-between items-center shadow-lg transform scale-105 transition-all`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-sm">1</div>
                                <div>
                                    <p className={`font-bold ${theme.title}`}>Cliente VIP #882</p>
                                    <p className="text-xs text-amber-500 animate-pulse font-bold">● Ganando</p>
                                </div>
                            </div>
                            <span className={`text-xl font-mono font-bold ${theme.title}`}>$22,500</span>
                        </div>

                        {/* 2do Lugar */}
                        <div className={`${theme.leaderboardItem} p-3 rounded-xl border ${theme.cardBorder} flex justify-between items-center opacity-70`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 ${isDarkMode ? 'bg-slate-600 text-white' : 'bg-slate-200 text-slate-600'} rounded-full flex items-center justify-center text-xs font-bold`}>2</div>
                                <div>
                                    <p className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Cliente #104</p>
                                    <p className={`text-xs ${theme.subtitle}`}>Hace 2 min</p>
                                </div>
                            </div>
                            <span className={`text-lg font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>$21,000</span>
                        </div>

                        {/* 3er Lugar */}
                        <div className={`${theme.leaderboardItem} p-3 rounded-xl border ${theme.cardBorder} flex justify-between items-center opacity-50`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'} rounded-full flex items-center justify-center text-xs font-bold`}>3</div>
                                <div>
                                    <p className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Cliente #005</p>
                                    <p className={`text-xs ${theme.subtitle}`}>Hace 5 min</p>
                                </div>
                            </div>
                            <span className={`text-lg font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>$18,500</span>
                        </div>

                        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-800/50 flex items-start gap-2">
                            <Activity className="w-4 h-4 text-blue-400 mt-1" />
                            <p className="text-xs text-blue-200">
                                <span className="font-bold">IA Action:</span> Se envió notificación de "Contraoferta sugerida" a los clientes #104 y #005. Tasa de apertura: 100%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NumisVaultDashboard;

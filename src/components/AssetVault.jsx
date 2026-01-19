import React, { useState } from 'react';
import {
    Search, Filter, Plus, Flame, Clock,
    CheckCircle2, Tag, Lock, MoreVertical,
    TrendingUp, Send, DollarSign, Camera
} from 'lucide-react';

const AssetVault = ({ isDarkMode }) => {
    const [filter, setFilter] = useState('all');

    // Theme Configuration
    const theme = {
        bg: isDarkMode ? 'bg-slate-950' : 'bg-gray-100',
        textMain: isDarkMode ? 'text-white' : 'text-slate-900',
        textSecondary: isDarkMode ? 'text-slate-200' : 'text-slate-700',
        textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-500',
        cardBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
        cardBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
        inputBg: isDarkMode ? 'bg-slate-900' : 'bg-white',
        inputBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
        buttonSecondary: isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-gray-300 text-slate-600 hover:bg-gray-50',
        tabActive: isDarkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-gray-300 shadow-sm',
        tabInactive: isDarkMode ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' : 'bg-gray-100 text-slate-500 hover:bg-gray-200',
        placeholderIcon: isDarkMode ? 'bg-slate-900 text-slate-600' : 'bg-gray-200 text-slate-400',
        placeholderText: isDarkMode ? 'text-slate-500' : 'text-slate-400',
        cardHover: isDarkMode ? 'hover:border-slate-600' : 'hover:border-gray-300',
        footerBg: isDarkMode ? 'bg-slate-900' : 'bg-gray-50',
        footerBorder: isDarkMode ? 'border-slate-800' : 'border-gray-200',
    };

    // Datos simulados del Inventario
    const coins = [
        {
            id: 882,
            title: "8 Reales Carlos IV",
            year: 1805,
            ceca: "Mo (México)",
            grade: "AU-55",
            price: "$18,500",
            image: "/coin_8_reales_carlos.png",
            status: "available", // available, reserved, consignment, sold
            hotMatch: 3, // Cantidad de clientes interesados
            added: "Hace 2h"
        },
        {
            id: 885,
            title: "Centenario 50 Pesos",
            year: 1947,
            ceca: "-",
            grade: "MS-63",
            price: "$48,200",
            image: "/coin_centenario.png",
            status: "reserved",
            expiry: "1h 45m",
            hotMatch: 0,
            added: "Hace 1d"
        },
        {
            id: 890,
            title: "Peso 'Caballito'",
            year: 1910,
            ceca: "Mo",
            grade: "XF-40",
            price: "$4,500",
            image: "/coin_caballito.png",
            status: "consignment",
            owner: "Cliente #402",
            hotMatch: 1,
            added: "Hace 3d"
        },
        {
            id: 812,
            title: "Onza Troy Libertad",
            year: 1998,
            ceca: "Mo",
            grade: "Proof",
            price: "$2,800",
            image: "/coin_libertad.png",
            status: "sold",
            soldTo: "Dr. Pérez",
            hotMatch: 0,
            added: "Hace 1 sem"
        },
        {
            id: 899,
            title: "Escudo de Oro",
            year: 1750,
            ceca: "Mx",
            grade: "VF-20",
            price: "$32,000",
            image: "/coin_escudo.png",
            status: "available",
            hotMatch: 5, // ¡Muy caliente!
            added: "Hace 10 min"
        },
        {
            id: 901,
            title: "20 Pesos Azteca",
            year: 1918,
            ceca: "-",
            grade: "UNC",
            price: "$21,500",
            image: "/coin_azteca.png",
            status: "available",
            hotMatch: 0,
            added: "Hace 4h"
        }
    ];

    const getStatusBadge = (coin) => {
        switch (coin.status) {
            case 'available':
                return (
                    <div className="absolute top-3 left-3 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                        <CheckCircle2 size={12} /> Disponible
                    </div>
                );
            case 'reserved':
                return (
                    <div className="absolute top-3 left-3 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 text-amber-600 dark:text-amber-500 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse z-20">
                        <Clock size={12} /> Apartada ({coin.expiry})
                    </div>
                );
            case 'consignment':
                return (
                    <div className="absolute top-3 left-3 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                        <Tag size={12} /> Consignación
                    </div>
                );
            case 'sold':
                return (
                    <div className="absolute top-3 left-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-600 dark:text-red-500 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-20">
                        <Lock size={12} /> Vendida
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.textSecondary} font-sans p-6 transition-colors duration-300`}>

            {/* HEADER: VALUACIÓN Y ACCIONES */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className={`text-2xl font-bold ${theme.textMain} flex items-center gap-2`}>
                        <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>
                        Bóveda de Activos
                    </h1>
                    <p className={`${theme.textMuted} text-sm mt-1 flex items-center gap-2`}>
                        Valuación Total: <span className={`${theme.textMain} font-mono font-bold`}>$1,240,500 MXN</span>
                        <span className="text-emerald-500 text-xs bg-emerald-500/10 px-1 rounded flex items-center">
                            <TrendingUp size={10} className="mr-1" /> Oro +1.2%
                        </span>
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className={`${theme.buttonSecondary} border px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}>
                        <Filter size={18} /> Filtrar
                    </button>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-lg font-bold shadow-lg shadow-amber-900/20 flex items-center gap-2 transition-transform active:scale-95">
                        <Camera size={18} /> Ingesta con IA
                    </button>
                </div>
            </header>


            {/* BARRA DE BÚSQUEDA Y FILTROS RÁPIDOS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textMuted} w-5 h-5`} />
                    <input
                        type="text"
                        placeholder="Buscar por año, metal o ceca..."
                        className={`w-full ${theme.inputBg} border ${theme.inputBorder} rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-amber-500/50 ${theme.textMain} transition-colors placeholder:${theme.textMuted}`}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {['Todos', 'Disponibles', 'Apartados', 'Hot Match 🔥'].map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${tab === 'Todos'
                                ? theme.tabActive
                                : `${theme.tabInactive} border-transparent`
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRID DE GALERÍA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {coins.map((coin) => (
                    <CoinCard key={coin.id} coin={coin} getBadge={getStatusBadge} theme={theme} isDarkMode={isDarkMode} />
                ))}

                {/* Placeholder para agregar nuevo (Visual) */}
                <div className={`border-2 border-dashed ${theme.cardBorder} rounded-2xl flex flex-col items-center justify-center min-h-[300px] group hover:border-amber-500/50 ${isDarkMode ? 'hover:bg-slate-900/50' : 'hover:bg-gray-50'} transition-all cursor-pointer`}>
                    <div className={`w-16 h-16 ${theme.placeholderIcon} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Plus size={32} className={`${isDarkMode ? 'text-slate-600' : 'text-slate-400'} group-hover:text-amber-500`} />
                    </div>
                    <p className={`${theme.placeholderText} font-medium`}>Agregar Manualmente</p>
                </div>
            </div>

        </div >
    );
};

// COMPONENTE TARJETA DE MONEDA
const CoinCard = ({ coin, getBadge, theme, isDarkMode }) => {
    const [showOffer, setShowOffer] = useState(false);

    return (
        <div className={`relative ${theme.cardBg} rounded-2xl border ${theme.cardBorder} overflow-hidden group ${theme.cardHover} transition-all duration-300 hover:shadow-2xl hover:shadow-black/50 ${coin.status === 'sold' ? 'opacity-75' : ''}`}>

            {/* BADGE DE ESTADO */}
            {getBadge(coin)}

            {/* INDICADOR HOT MATCH (Solo si hay matches y no está vendida) */}
            {coin.hotMatch > 0 && coin.status === 'available' && (
                <div className="absolute top-3 right-3 z-20">
                    <button
                        onClick={() => setShowOffer(!showOffer)}
                        className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-amber-500/20 animate-bounce-slow hover:bg-amber-400 transition-colors"
                    >
                        <Flame size={12} fill="black" /> {coin.hotMatch} Match
                    </button>

                    {/* Tooltip Interactivo */}
                    {showOffer && (
                        <div className={`absolute top-8 right-0 w-48 ${theme.cardBg} border ${theme.cardBorder} p-3 rounded-xl shadow-xl z-20 animate-in fade-in zoom-in-95 duration-200`}>
                            <p className={`text-xs ${theme.textSecondary} mb-2`}>
                                <strong className={theme.textMain}>{coin.hotMatch} Clientes</strong> buscan esta pieza en su Wishlist.
                            </p>
                            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 font-bold">
                                <Send size={10} /> Enviar Oferta
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* ÁREA DE IMAGEN (REAL) */}
            <div className={`h-48 flex items-center justify-center relative ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                {/* Fondo radial sutil detrás de la moneda */}
                <div className={`absolute inset-0 bg-radial-gradient from-transparent to-${isDarkMode ? 'slate-950' : 'gray-200'}/50 pointer-events-none`}></div>

                <div className={`w-36 h-36 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500 relative z-10 filter drop-shadow-xl`}>
                    <img
                        src={coin.image}
                        alt={coin.title}
                        className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                    />

                    {/* Brillo metálico overlay */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>
            </div>

            {/* INFORMACIÓN */}
            <div className={`p-4 border-t ${theme.cardBorder} ${theme.footerBg} transition-colors`}>
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className={`${theme.textMain} font-bold text-sm tracking-wide`}>{coin.title}</h3>
                        <p className={`${theme.textMuted} text-xs`}>{coin.year} • {coin.ceca}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-amber-600 dark:text-amber-500 font-mono font-bold">{coin.price}</p>
                        <span className={`text-[10px] ${theme.textMuted} ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} px-1.5 py-0.5 rounded border`}>
                            {coin.grade}
                        </span>
                    </div>
                </div>

                {/* Footer de la tarjeta con info extra según estado */}
                <div className={`mt-3 pt-3 border-t ${isDarkMode ? 'border-slate-800/50' : 'border-gray-200'} flex justify-between items-center`}>
                    <span className={`text-[10px] ${theme.textMuted} flex items-center gap-1`}>
                        <Clock size={10} /> {coin.added}
                    </span>

                    {coin.status === 'consignment' && (
                        <span className="text-[10px] text-blue-500 flex items-center gap-1">
                            <UsersIcon size={10} /> De: {coin.owner}
                        </span>
                    )}

                    <button className={`${theme.textMuted} hover:${theme.textMain} transition-colors`}>
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Icono auxiliar
const UsersIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default AssetVault;

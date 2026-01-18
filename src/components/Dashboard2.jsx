import React, { useState, useEffect } from 'react';
import {
    Radar,
    MessageSquare,
    Users,
    Settings,
    Bell,
    Search,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Clock,
    Gem,
    Menu,
    ChevronRight,
    Database,
    Send
} from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('radar');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
            {/* Sidebar - Navegación */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-20 flex items-center justify-start px-6 border-b border-slate-800">
                    <div className="w-8 h-8 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/20">
                        <Gem className="text-slate-900 w-5 h-5" />
                    </div>
                    <span className="ml-3 font-bold text-lg tracking-wide text-amber-500">NUMISMATIC<span className="text-slate-100">AI</span></span>
                </div>

                <nav className="flex-1 py-6 space-y-2 px-3">
                    <NavItem icon={<Radar />} label="Radar de Oportunidades" active={activeTab === 'radar'} onClick={() => setActiveTab('radar')} />
                    <NavItem icon={<MessageSquare />} label="Centro de Mensajes" badge="2" onClick={() => setActiveTab('messages')} />
                    <NavItem icon={<Database />} label="Bóveda de Clientes" onClick={() => setActiveTab('vault')} />
                    <NavItem icon={<TrendingUp />} label="Analítica Financiera" onClick={() => setActiveTab('analytics')} />
                    <div className="pt-6 pb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sistema</div>
                    <NavItem icon={<Settings />} label="Configuración IA" onClick={() => setActiveTab('settings')} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center">
                            <span className="text-xs font-bold">AG</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Admin General</p>
                            <p className="text-xs text-amber-500">Modo Dios Activo</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay para cerrar sidebar en móvil */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Mobile Header (Solo visible en móviles) */}
            <div className="md:hidden fixed top-0 w-full bg-slate-900 z-30 p-4 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Gem className="text-amber-500 w-5 h-5" />
                    <span className="font-bold text-amber-500">NUMISMATIC AI</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu className="text-slate-400" />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8 relative custom-scrollbar">
                {/* Header Superior */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Torre de Control Comercial</h1>
                        <p className="text-slate-400 text-sm mt-1">Sincronización en tiempo real: <span className="text-emerald-400 font-mono">EN LÍNEA</span></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <input type="text" placeholder="Buscar moneda, cliente..." className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-amber-500 w-64" />
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        </button>
                    </div>
                </header>

                {/* KPIs Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <KpiCard
                        title="Ventas Cerradas (Mes)"
                        value="$124,500 MXN"
                        trend="+12%"
                        icon={<TrendingUp className="text-emerald-400" />}
                    />
                    {/* Este KPI vende la Opción B - Wishlist */}
                    <KpiCard
                        title="Dinero Potencial en Radar"
                        value="$45,000 MXN"
                        subtitle="3 Coincidencias hoy"
                        isHighlighted
                        icon={<Radar className="text-amber-900" />}
                    />
                    <KpiCard
                        title="Interacciones IA Hoy"
                        value="142 Chats"
                        subtitle="92% Automático"
                        icon={<MessageSquare className="text-blue-400" />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* COLUMNA IZQUIERDA (2/3) - EL RADAR (OPCIÓN B) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Widget Principal: Radar de Oportunidades */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <Radar className="text-amber-500 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-white">Radar de Coincidencias (Wishlist)</h2>
                                        <p className="text-xs text-slate-400">Cruzando inventario reciente vs. Solicitudes de clientes</p>
                                    </div>
                                </div>
                                <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded-full border border-slate-700 transition">
                                    Ver todo
                                </button>
                            </div>

                            <div className="divide-y divide-slate-800/50">
                                <MatchItem
                                    client="Dr. Roberto Méndez"
                                    type="VIP Oro"
                                    lookingFor="Onza Libertad 1998 (Plata)"
                                    match="Inventario recién agregado: Lote #882"
                                    time="Hace 20 min"
                                    probability="Alta"
                                />
                                <MatchItem
                                    client="Coleccionista Anónimo"
                                    type="Recurrente"
                                    lookingFor="Centenario 50 Pesos"
                                    match="Inventario recién agregado: Lote #885"
                                    time="Hace 2 horas"
                                    probability="Media"
                                />
                                <MatchItem
                                    client="Lucía G."
                                    type="Nuevo"
                                    lookingFor="8 Reales Ceca Mo"
                                    match="Inventario recién agregado: Lote #881"
                                    time="Hace 4 horas"
                                    probability="Baja"
                                />
                            </div>
                        </div>

                        {/* Bóveda de Clientes VIP */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Top Clientes Activos (Bóveda)</h3>
                                <button className="text-amber-500 hover:text-amber-400 text-xs font-medium flex items-center gap-1">
                                    Ver Base Completa <ChevronRight size={12} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <ClientRow name="Lic. Fernando T." category="Inversionista" totalSpent="$240k" status="Negociando" />
                                <ClientRow name="Museo Numismático" category="Institucional" totalSpent="$1.2M" status="Inactivo" />
                                <ClientRow name="Carlos R." category="Cazador Ofertas" totalSpent="$12k" status="Esperando Subasta" />
                            </div>
                        </div>

                    </div>

                    {/* COLUMNA DERECHA (1/3) - CONTROL DE FLUJO (OPCIÓN A) */}
                    <div className="space-y-6">

                        {/* Estado de Líneas WhatsApp */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                Control de Flujo
                            </h3>

                            <div className="space-y-3">
                                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                            <MessageSquare size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200">Línea Ventas</p>
                                            <p className="text-xs text-emerald-500">IA Respondiendo</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-slate-500">24ms</span>
                                </div>

                                <div className="p-3 bg-slate-950 rounded-lg border border-amber-900/30 flex justify-between items-center relative overflow-hidden group hover:border-amber-500/50 transition-colors cursor-pointer">
                                    <div className="absolute left-0 top-0 w-1 h-full bg-amber-500"></div>
                                    <div className="flex items-center gap-3 pl-2">
                                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                            <AlertCircle size={14} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-200">Línea Soporte</p>
                                            <p className="text-xs text-amber-500">Requiere Humano (2)</p>
                                        </div>
                                    </div>
                                    <button className="text-xs bg-amber-600 hover:bg-amber-500 text-white px-2 py-1 rounded">
                                        Ver
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Feed de Actividad IA */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-96 flex flex-col">
                            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Bitácora de Inteligencia</h3>
                            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                                <ActivityLog time="10:42 AM" text="IA detectó intención de compra 'Macuquina' en chat con Pedro." type="success" />
                                <ActivityLog time="10:30 AM" text="Recordatorio de pago enviado a Grupo Coleccionistas." type="info" />
                                <ActivityLog time="10:15 AM" text="Nuevo usuario registrado desde Facebook Ads." type="neutral" />
                                <ActivityLog time="09:55 AM" text="Alerta: Cliente preguntó por envío internacional (Fuera de script)." type="warning" />
                                <ActivityLog time="09:12 AM" text="Reporte diario de ventas generado." type="neutral" />
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Estilos globales para scrollbar personalizada */}
            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}</style>
        </div>
    );
};

// Componentes Auxiliares

const NavItem = ({ icon, label, active, badge, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${active ? 'bg-slate-800 text-amber-400 border border-slate-700/50' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
    >
        <div className="flex items-center gap-3">
            {React.cloneElement(icon, { size: 18, className: active ? 'text-amber-400' : 'group-hover:text-slate-200' })}
            <span className="text-sm font-medium">{label}</span>
        </div>
        {badge && (
            <span className="flex w-5 h-5 bg-amber-600 text-white text-[10px] items-center justify-center rounded-full font-bold">
                {badge}
            </span>
        )}
    </button>
);

const KpiCard = ({ title, value, trend, subtitle, icon, isHighlighted }) => (
    <div className={`p-6 rounded-xl border relative overflow-hidden transition-all hover:translate-y-[-2px] ${isHighlighted ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-amber-500/30 shadow-lg shadow-amber-900/10' : 'bg-slate-900 border-slate-800'}`}>
        {isHighlighted && <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>}
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${isHighlighted ? 'bg-amber-500/20' : 'bg-slate-800'}`}>
                {icon}
            </div>
        </div>
        <div className="flex items-center gap-2">
            {trend && <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">{trend}</span>}
            {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
        </div>
    </div>
);

const MatchItem = ({ client, type, lookingFor, match, time, probability }) => {
    const [status, setStatus] = useState('idle'); // idle, sending, sent

    const handleContact = (e) => {
        e.stopPropagation();
        setStatus('sending');
        setTimeout(() => setStatus('sent'), 1500);
    };

    return (
        <div className="p-4 hover:bg-slate-800/50 transition-colors group cursor-pointer border-l-2 border-transparent hover:border-amber-500/50">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex gap-4">
                    <div className="mt-1">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 font-bold text-amber-500">
                            {client.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-white">{client}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${type === 'VIP Oro' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                                {type}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 mt-1">Busca: <span className="text-amber-200">{lookingFor}</span></p>
                        <div className="flex items-center gap-2 mt-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <p className="text-xs text-emerald-400 font-medium">{match}</p>
                        </div>
                    </div>
                </div>
                <div className="text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={12} /> {time}
                    </span>

                    <button
                        onClick={handleContact}
                        disabled={status !== 'idle'}
                        className={`mt-0 sm:mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 shadow-lg
              ${status === 'idle'
                                ? 'bg-amber-600 hover:bg-amber-500 text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0'
                                : status === 'sending'
                                    ? 'bg-slate-700 text-slate-300 cursor-wait opacity-100'
                                    : 'bg-emerald-600 text-white cursor-default opacity-100'
                            }
            `}
                    >
                        {status === 'idle' && <>Contactar <ChevronRight size={12} /></>}
                        {status === 'sending' && <>Enviando...</>}
                        {status === 'sent' && <>Enviado <CheckCircle2 size={12} /></>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ClientRow = ({ name, category, totalSpent, status }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/50 hover:border-slate-700 transition cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-600 group-hover:bg-amber-500 transition-colors"></div>
            <div>
                <p className="text-sm font-medium text-slate-200 group-hover:text-white">{name}</p>
                <p className="text-xs text-slate-500">{category}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm font-mono text-slate-300">{totalSpent}</p>
            <p className={`text-[10px] ${status === 'Negociando' ? 'text-emerald-400' : 'text-slate-500'}`}>{status}</p>
        </div>
    </div>
);

const ActivityLog = ({ time, text, type }) => {
    const getColor = () => {
        if (type === 'success') return 'bg-emerald-500';
        if (type === 'warning') return 'bg-amber-500';
        if (type === 'info') return 'bg-blue-500';
        return 'bg-slate-500';
    };

    return (
        <div className="flex gap-3 relative group">
            <div className="flex flex-col items-center">
                <div className={`w-2 h-2 rounded-full ${getColor()} ring-4 ring-slate-900 group-hover:ring-slate-800 transition-all`}></div>
                <div className="w-px h-full bg-slate-800 my-1 group-hover:bg-slate-700"></div>
            </div>
            <div className="pb-4">
                <p className="text-xs text-slate-500 mb-0.5 font-mono">{time}</p>
                <p className="text-sm text-slate-300 leading-snug">{text}</p>
            </div>
        </div>
    );
};

export default Dashboard;

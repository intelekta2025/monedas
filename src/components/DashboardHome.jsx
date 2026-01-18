import React from 'react';
import { LayoutGrid, Users, MessageCircle, Star, Target, Trash2, ArrowUpRight, ArrowDownRight, Filter, Search, MoreVertical, Bell, CheckCircle2, Clock, AlertCircle, ChevronRight, Radar, MessageSquare, Inbox, Check, Zap, AlertTriangle, Flame, Snowflake } from 'lucide-react';

const DashboardHome = ({ navigateToWorkspace, navigateToClients, isDarkMode = true, stats = {} }) => {
  // Default stats if not provided
  const defaultStats = {
    uniqueClients: 40,
    conversations: { pending: 600, resolved: 300 },
    opportunities: { pending: 10, resolved: 5 },
    intention: { pending: 20, resolved: 10 },
    trash: { pending: 30, resolved: 10 },
    unattended: 12,
    unattended: 12,
    active: 45,
    closed: 100
  };

  const dashStats = { ...defaultStats, ...stats };

  // Theme-aware colors
  const theme = {
    bg: isDarkMode ? 'bg-github-bg' : 'bg-gray-50',
    card: isDarkMode ? 'bg-github-card' : 'bg-white',
    border: isDarkMode ? 'border-github-border' : 'border-gray-200',
    text: isDarkMode ? 'text-github-text' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-github-muted' : 'text-gray-500',
    textWhite: isDarkMode ? 'text-white' : 'text-gray-900',
    bgSecondary: isDarkMode ? 'bg-github-bg' : 'bg-gray-100',
  };

  return (
    <div className={`flex-1 ${theme.bg} overflow-y-auto font-sans ${theme.text} p-6 md:p-8`}>
      <div className="max-w-7xl w-full mx-auto">

        {/* Demo Data Banner */}
        <div className={`mb-6 ${isDarkMode ? 'bg-blue-900/20 border-blue-900/50' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4 flex items-start gap-3`}>
          <div className="flex-shrink-0 mt-0.5">
            <svg className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'} mb-1`}>
              Datos de Demostración
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-blue-200/80' : 'text-blue-700'}`}>
              Este dashboard muestra datos de ejemplo. Los KPIs y estadísticas se actualizarán con información real una vez que se integre con la base de datos.
            </p>
          </div>
        </div>

        {/* Header Section */}
        <div className={`flex justify-between items-end mb-8 border-b ${theme.border} pb-4`}>
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} mb-1`}>Boveda de inteligencia</h2>
          </div>
          <div className="flex gap-2">
            <p className={`text-lg font-medium ${theme.textMuted}`}>Operaciones del mes ( Ene 2026 )</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* KPI 1 - Clientes Únicos */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-amber-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Clientes Únicos</h3>
              <Users size={14} className="text-amber-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.uniqueClients}</div>
          </div>

          {/* KPI 2 - Conversaciones */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-blue-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Conversaciones</h3>
              <MessageSquare size={14} className="text-blue-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1 flex items-baseline gap-2`}>
              <span className="text-red-400">{dashStats.conversations.pending}</span> <span className="text-green-400">/ {dashStats.conversations.resolved}</span>
            </div>
            <div className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
              <MessageCircle size={12} /> Pendientes / Resueltas
            </div>
          </div>

          {/* KPI 3 - Oportunidades */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-yellow-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Oportunidades</h3>
              <Star size={14} className="text-yellow-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1 flex items-baseline gap-2`}>
              <span className="text-red-400">{dashStats.opportunities.pending}</span> <span className="text-green-400">/ {dashStats.opportunities.resolved}</span>
            </div>
            <div className={`text-xs ${theme.textMuted}`}>Pendientes / Resueltas</div>
          </div>

          {/* KPI 4 - Intención */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-green-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>INTENCIÓN</h3>
              <Target size={14} className="text-green-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1 flex items-baseline gap-2`}>
              <span className="text-red-400">{dashStats.intention.pending}</span> <span className="text-green-400">/ {dashStats.intention.resolved}</span>
            </div>
            <div className={`text-xs ${theme.textMuted}`}>Pendientes / Resueltas</div>
          </div>

          {/* KPI 5 - Basura */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-red-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>COMÚN</h3>
              <Trash2 size={14} className="text-red-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1 flex items-baseline gap-2`}>
              <span className="text-red-400">{dashStats.trash.pending}</span> <span className="text-green-400">/ {dashStats.trash.resolved}</span>
            </div>
            <div className={`text-xs ${theme.textMuted}`}>Pendientes / Resueltas</div>
          </div>
        </div>

        {/* Content Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMNA IZQUIERDA (Estrecha - Monitor y Feedback) */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* 1. MONITOR DE SALUD OPERATIVA */}
            <div className={`${theme.card} border ${theme.border} rounded-lg p-6 shadow-sm relative overflow-hidden`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} text-sm flex items-center gap-2`}>
                  <Inbox size={16} className={isDarkMode ? 'text-gold' : 'text-gold-dark'} /> Monitor de Salud Operativa
                </h3>
              </div>

              {/* Grid Vertical para Monitor */}
              <div className="grid grid-cols-1 gap-4">

                {/* Card Velocidad de Resolución */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-amber-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center text-amber-500 group-hover:bg-amber-900/30 transition">
                      <Zap size={18} />
                    </div>
                    <span className="text-xs text-amber-500 font-bold bg-amber-900/20 px-2 py-0.5 rounded border border-amber-900/30">4 hrs</span>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>100</div>
                  <div className={`text-xs ${theme.textMuted} font-bold uppercase tracking-wider`}>Velocidad de Resolución</div>
                </div>

                {/* Card Tiempo de espera */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-orange-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-orange-900/20 flex items-center justify-center text-orange-500 group-hover:bg-orange-900/30 transition">
                      <AlertTriangle size={18} />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>
                    5 <span className="text-sm font-normal text-gray-500 ml-1">conversaciones</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-orange-500 font-bold bg-orange-900/20 px-2 py-0.5 rounded border border-orange-900/30">4 hrs</span>
                    <div className={`text-xs ${theme.textMuted} font-bold uppercase tracking-wider`}>Tiempo de espera</div>
                  </div>
                </div>

                {/* Card Termómetro de Leads */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-rose-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-rose-900/20 flex items-center justify-center text-rose-500 group-hover:bg-rose-900/30 transition">
                      <Flame size={18} />
                    </div>
                    <span className="text-xs text-rose-500 font-bold bg-rose-900/20 px-2 py-0.5 rounded border border-rose-900/30">Hot Leads</span>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>15</div>

                  <div className="mt-3 flex items-center gap-3 pt-2 border-t border-gray-700/30">
                    {/* Cold */}
                    <div className="flex items-center gap-1.5" title="Cliente frío/cortante">
                      <Snowflake size={14} className="text-blue-400" />
                      <span className={`text-xs font-mono font-bold ${theme.textMuted}`}>8</span>
                    </div>

                    {/* Support/Warning */}
                    <div className="flex items-center gap-1.5" title="Atención a Soporte">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <span className={`text-xs font-mono font-bold ${theme.textMuted}`}>3</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Panel Stats IA (FEEDBACK IA) */}
            <div className={`${theme.card} border ${theme.border} rounded-lg p-6 shadow-sm`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} text-sm`}>FEEDBACK IA</h3>
                <span className={`text-[10px] ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} px-2 py-1 rounded ${isDarkMode ? 'text-github-text' : 'text-gray-700'}`}>30 Días</span>
              </div>

              {/* Donut Chart */}
              <div className="flex justify-center mb-6">
                <div className="relative w-[140px] h-[140px]">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke={isDarkMode ? '#30363d' : '#e5e7eb'} strokeWidth="12" />
                    {/* Positive segment (70%) */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#238636" strokeWidth="12"
                      strokeDasharray="175.93 251.33" strokeDashoffset="0" />
                    {/* Negative segment (30%) - 0.3 * 251.33 = 75.40 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f85149" strokeWidth="12"
                      strokeDasharray="75.40 251.33" strokeDashoffset="-175.93" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${theme.textWhite}`}>70%</span>
                    <span className={`text-[9px] ${theme.textMuted} uppercase mt-1`}>POSITIVA</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {/* Positivo */}
                <div>
                  <div className={`flex justify-between text-xs mb-1.5 ${theme.text}`}>
                    <span className="flex items-center gap-2 font-semibold">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div> Positivo
                    </span>
                    <span className={`font-mono ${theme.textWhite}`}>145 (70%)</span>
                  </div>
                  <div className={`w-full h-2 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-green-600" style={{ width: '70%' }}></div>
                  </div>
                </div>
                {/* Negativo */}
                <div>
                  <div className={`flex justify-between text-xs mb-1.5 ${theme.text}`}>
                    <span className="flex items-center gap-2 font-semibold">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Negativo
                    </span>
                    <span className={`font-mono ${theme.textWhite}`}>62 (30%)</span>
                  </div>
                  <div className={`w-full h-2 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-red-500" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (Ancha - Radar y Clientes) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* 2. RADAR DE OPORTUNIDADES (Wishlist) */}
            <div className={`${theme.card} border ${theme.border} rounded-lg overflow-hidden flex flex-col shadow-sm relative`}>
              <div className={`p-5 border-b ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                    <Radar className="text-amber-500 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>Radar de oportunidades (wishlist)</h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 ${theme.textMuted}`} />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className={`text-xs pl-8 pr-3 py-1.5 rounded-full border ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 placeholder-slate-500 focus:border-amber-500' : 'bg-white border-gray-200 text-gray-700 focus:border-amber-400'} outline-none transition-all w-32 focus:w-48`}
                    />
                  </div>
                  <button className={`text-xs ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'} px-3 py-1 rounded-full border transition`}>
                    Ver todo
                  </button>
                </div>
              </div>

              <div className={`divide-y ${theme.border}`}>
                <MatchItem
                  client="Dr. Roberto Méndez"
                  type="VIP Oro"
                  lookingFor="Onza Libertad 1998 (Plata)"
                  time="Hace 20 min"
                  probability="Alta"
                  isDarkMode={isDarkMode}
                />
                <MatchItem
                  client="Coleccionista Anónimo"
                  type="Recurrente"
                  lookingFor="Centenario 50 Pesos"
                  time="Hace 2 horas"
                  probability="Media"
                  isDarkMode={isDarkMode}
                />
                <MatchItem
                  client="Lucía G."
                  type="Nuevo"
                  lookingFor="8 Reales Ceca Mo"
                  time="Hace 4 horas"
                  probability="Baja"
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>

            {/* 3. TOP CLIENTES ACTIVOS */}
            <div className={`${theme.card} border ${theme.border} rounded-lg overflow-hidden flex flex-col`}>
              <div className={`p-4 border-b ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                <h3 className={`font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} text-sm`}>Top Clientes Activos</h3>
                <button className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}>Ver todos</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`border-b ${theme.border} ${theme.textMuted} ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'} text-xs uppercase`}>
                      <th className="px-4 py-3 font-semibold">Cliente</th>
                      <th className="px-4 py-3 font-semibold">Actividad</th>
                      <th className="px-4 py-3 font-semibold text-right">Último contacto</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme.border}`}>
                    <tr className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>CR</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Carlos Ruiz</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>VIP</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full bg-blue-500 w-[80%]"></div>
                        </div>
                        <div className={`text-[10px] ${theme.textMuted} mt-1`}>12 convs.</div>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${theme.textMuted}`}>Hace 2h</td>
                    </tr>
                    <tr className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>MG</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Maria G.</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>Recurrente</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full bg-blue-500 w-[50%]"></div>
                        </div>
                        <div className={`text-[10px] ${theme.textMuted} mt-1`}>8 convs.</div>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${theme.textMuted}`}>Hace 5h</td>
                    </tr>
                    <tr className={`${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>AL</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Ana Lopez</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>Nuevo</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full bg-blue-500 w-[30%]"></div>
                        </div>
                        <div className={`text-[10px] ${theme.textMuted} mt-1`}>4 convs.</div>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${theme.textMuted}`}>Ayer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

const MatchItem = ({ client, type, lookingFor, time, probability, isDarkMode }) => {
  const [status, setStatus] = React.useState('idle');

  const handleContact = (e) => {
    e.stopPropagation();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  const themeItem = {
    hoverBg: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50',
    titleColor: isDarkMode ? 'text-white' : 'text-gray-900',
    subtitleColor: isDarkMode ? 'text-slate-300' : 'text-gray-600',
    matchColor: isDarkMode ? 'text-emerald-400' : 'text-emerald-600',
    timeColor: isDarkMode ? 'text-slate-500' : 'text-gray-400',
    avatarBg: isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200',
    typeBadge: type === 'VIP Oro'
      ? (isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-100 text-amber-800 border-amber-200')
      : (isDarkMode ? 'bg-slate-700 text-slate-400 border-slate-600' : 'bg-gray-200 text-gray-600 border-gray-300')
  };

  return (
    <div className={`p-4 ${themeItem.hoverBg} transition-colors group cursor-pointer border-l-2 border-transparent hover:border-amber-500/50`}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex gap-4">
          <div className="mt-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-bold text-amber-500 ${themeItem.avatarBg}`}>
              {client.charAt(0)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-semibold ${themeItem.titleColor}`}>{client}</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${themeItem.typeBadge}`}>
                {type}
              </span>
            </div>
            <p className={`text-sm mt-1 ${themeItem.subtitleColor}`}>Busca: <span className={isDarkMode ? "text-amber-200" : "text-amber-700"}>{lookingFor}</span></p>
          </div>
        </div>
        <div className="text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between items-center sm:items-end">
          <span className={`text-xs flex items-center gap-1 ${themeItem.timeColor}`}>
            <Clock size={12} /> {time}
          </span>

          <button
            onClick={handleContact}
            disabled={status !== 'idle'}
            className={`mt-0 sm:mt-3 text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1 shadow-sm
              ${status === 'idle'
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0'
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
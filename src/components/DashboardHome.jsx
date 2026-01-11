import React from 'react';
import { Inbox, Star, Trash2, Users, MessageCircle, Bell, Check, Target, Filter } from 'lucide-react';

const DashboardHome = ({ navigateToWorkspace, navigateToClients, isDarkMode = true, stats = {} }) => {
  // Default stats if not provided
  const defaultStats = {
    uniqueClients: 854,
    conversations: 1248,
    opportunities: 42,
    intention: 70,
    trash: 31,
    unattended: 12,
    active: 45,
    closed: 1191
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
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} mb-1`}>Centro de Comando</h2>
            <p className={`text-sm ${theme.textMuted}`}>Resumen de operaciones en tiempo real</p>
          </div>
          <div className="flex gap-2">
            <span className={`text-xs ${isDarkMode ? 'bg-github-border text-github-text' : 'bg-gray-200 text-gray-700'} px-3 py-1 rounded-full flex items-center gap-2`}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Sistema Operativo
            </span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* KPI 1 - Clientes Únicos */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-purple-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Clientes Únicos</h3>
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.uniqueClients}</div>
            <div className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
              <Users size={12} /> Base de datos
            </div>
          </div>

          {/* KPI 2 - Conversaciones */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-blue-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Conversaciones</h3>
              <span className="text-[10px] bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-900/50">+12%</span>
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.conversations}</div>
            <div className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
              <MessageCircle size={12} /> Activas este mes
            </div>
          </div>

          {/* KPI 3 - Oportunidades */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-yellow-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>Oportunidades</h3>
              <Star size={14} className="text-yellow-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.opportunities}</div>
            <div className={`text-xs ${theme.textMuted}`}>Alta intención</div>
          </div>

          {/* KPI 4 - Intención */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-green-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>INTENCIÓN</h3>
              <Target size={14} className="text-green-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.intention}%</div>
            <div className={`text-xs ${theme.textMuted}`}>Conversión positiva</div>
          </div>

          {/* KPI 5 - Basura */}
          <div className={`${theme.card} border ${theme.border} p-5 rounded-lg shadow-sm hover:border-red-500 transition-colors group`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xs font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} uppercase`}>BASURA</h3>
              <Trash2 size={14} className="text-red-500" />
            </div>
            <div className={`text-3xl font-bold ${theme.textWhite} mb-1`}>{dashStats.trash}</div>
            <div className={`text-xs ${theme.textMuted}`}>Filtrados auto.</div>
          </div>
        </div>

        {/* Content Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMNA IZQUIERDA (Ancha) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* 1. ESTADO DE BANDEJA */}
            <div className={`${theme.card} border ${theme.border} rounded-lg p-6 shadow-sm relative overflow-hidden`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} text-sm flex items-center gap-2`}>
                  <Inbox size={16} className={isDarkMode ? 'text-gold' : 'text-gold-dark'} /> ESTADO DE BANDEJA
                </h3>
                <span className={`text-xs ${theme.textMuted} flex items-center gap-1`}>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> En vivo
                </span>
              </div>

              {/* Grid Horizontal para Bandeja */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* Card Sin Atender */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-red-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center text-red-400 group-hover:bg-red-900/30 transition">
                      <Bell size={18} />
                    </div>
                    <span className="text-xs text-red-400 font-bold bg-red-900/20 px-2 py-0.5 rounded border border-red-900/30">URGENTE</span>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>{dashStats.unattended}</div>
                  <div className={`text-xs ${theme.textMuted} font-bold uppercase tracking-wider`}>Sin Atender</div>
                </div>

                {/* Card Activas */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-blue-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-900/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-900/30 transition">
                      <MessageCircle size={18} />
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>{dashStats.active}</div>
                  <div className={`text-xs ${theme.textMuted} font-bold uppercase tracking-wider`}>Activas</div>
                  <div className={`w-full h-1 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full mt-3 overflow-hidden`}>
                    <div className="h-full bg-blue-500 w-3/4"></div>
                  </div>
                </div>

                {/* Card Cerradas */}
                <div className={`p-4 rounded-lg ${theme.bgSecondary} border ${theme.border} hover:border-green-500/50 transition-all cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center text-green-400 group-hover:bg-green-900/30 transition">
                      <Check size={18} />
                    </div>
                    <span className={`text-xs ${theme.textMuted}`}>Hoy</span>
                  </div>
                  <div className={`text-2xl font-bold ${theme.textWhite}`}>{dashStats.closed}</div>
                  <div className={`text-xs ${theme.textMuted} font-bold uppercase tracking-wider`}>Cerradas</div>
                </div>

              </div>
            </div>

            {/* 2. TOP CLIENTES ACTIVOS */}
            <div className={`${theme.card} border ${theme.border} rounded-lg overflow-hidden flex flex-col`}>
              <div className={`p-4 border-b ${theme.border} flex justify-between items-center ${isDarkMode ? 'bg-github-card/50' : 'bg-gray-50'}`}>
                <h3 className={`font-bold ${isDarkMode ? 'text-gold' : 'text-gold-dark'} text-sm`}>Top Clientes Activos</h3>
                <button className={`text-xs ${isDarkMode ? 'text-github-accent' : 'text-blue-500'} hover:underline`}>Ver todos</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className={`border-b ${theme.border} ${theme.textMuted} ${isDarkMode ? 'bg-github-bg/50' : 'bg-gray-50'} text-xs uppercase`}>
                      <th className="px-4 py-3 font-semibold">Cliente</th>
                      <th className="px-4 py-3 font-semibold">Actividad</th>
                      <th className="px-4 py-3 font-semibold text-right">Último contacto</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme.border}`}>
                    <tr className={`${isDarkMode ? 'hover:bg-github-border/20' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>CR</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Carlos Ruiz</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>VIP</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full bg-blue-500 w-[80%]"></div>
                        </div>
                        <div className={`text-[10px] ${theme.textMuted} mt-1`}>12 convs.</div>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${theme.textMuted}`}>Hace 2h</td>
                    </tr>
                    <tr className={`${isDarkMode ? 'hover:bg-github-border/20' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>MG</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Maria G.</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>Recurrente</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                          <div className="h-full bg-blue-500 w-[50%]"></div>
                        </div>
                        <div className={`text-[10px] ${theme.textMuted} mt-1`}>8 convs.</div>
                      </td>
                      <td className={`px-4 py-3 text-right font-mono text-xs ${theme.textMuted}`}>Hace 5h</td>
                    </tr>
                    <tr className={`${isDarkMode ? 'hover:bg-github-border/20' : 'hover:bg-gray-50'} transition-colors`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} flex items-center justify-center font-bold ${theme.textWhite} text-xs`}>AL</div>
                          <div>
                            <div className={`font-bold ${theme.textWhite}`}>Ana Lopez</div>
                            <div className={`text-[10px] ${theme.textMuted} uppercase font-bold`}>Nuevo</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`w-full max-w-[150px] h-1.5 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
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

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">

            {/* Panel Stats IA */}
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
                    {/* Negative segment (15%) */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f85149" strokeWidth="12"
                      strokeDasharray="37.70 251.33" strokeDashoffset="-175.93" />
                    {/* Trash segment (15%) */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6e7681" strokeWidth="12"
                      strokeDasharray="37.70 251.33" strokeDashoffset="-213.63" />
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
                    <span className={`font-mono ${theme.textWhite}`}>31 (15%)</span>
                  </div>
                  <div className={`w-full h-2 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-red-500" style={{ width: '15%' }}></div>
                  </div>
                </div>
                {/* Basura */}
                <div>
                  <div className={`flex justify-between text-xs mb-1.5 ${theme.text}`}>
                    <span className="flex items-center gap-2 font-semibold">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div> Basura
                    </span>
                    <span className={`font-mono ${theme.textWhite}`}>31 (15%)</span>
                  </div>
                  <div className={`w-full h-2 ${isDarkMode ? 'bg-github-border' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                    <div className="h-full bg-gray-500" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
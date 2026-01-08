import React from 'react';

const DashboardHome = ({ navigateToWorkspace, stats }) => {
  return (
    <div className="flex-1 bg-[#0f1115] overflow-y-auto p-8 font-sans text-[#c9d1d9]">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Centro de Comando</h1>
          <p className="text-[#8b949e]">Resumen de operación en tiempo real • {new Date().toLocaleDateString()}</p>
        </div>
        <button onClick={navigateToWorkspace} className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition flex items-center gap-2">
          <i className="fa-solid fa-rocket"></i> Ir a Bandeja de Entrada
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] relative overflow-hidden group hover:border-[#D4AF37] transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><i className="fa-solid fa-inbox text-6xl text-white"></i></div>
          <div className="text-[#8b949e] text-sm uppercase tracking-wider font-bold mb-2">Por Atender</div>
          <div className="text-4xl font-bold text-white mb-1">{stats.pending}</div>
          <div className="text-xs text-[#ff7b72] flex items-center gap-1"><i className="fa-solid fa-clock"></i> Pendientes</div>
        </div>
        <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] relative overflow-hidden group hover:border-[#3fb950] transition-colors">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><i className="fa-solid fa-star text-6xl text-[#3fb950]"></i></div>
          <div className="text-[#8b949e] text-sm uppercase tracking-wider font-bold mb-2">Oportunidades</div>
          <div className="text-4xl font-bold text-[#3fb950] mb-1">{stats.opportunities}</div>
          <div className="text-xs text-[#8b949e]">Alta prioridad</div>
        </div>
        <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] relative overflow-hidden group hover:border-[#ff7b72] transition-colors">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><i className="fa-solid fa-filter text-6xl text-[#ff7b72]"></i></div>
          <div className="text-[#8b949e] text-sm uppercase tracking-wider font-bold mb-2">Basura Filtrada</div>
          <div className="text-4xl font-bold text-[#ff7b72] mb-1">{stats.trash}</div>
          <div className="text-xs text-[#8b949e]">Auto-rechazados</div>
        </div>
        <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] relative overflow-hidden">
          <div className="text-[#8b949e] text-sm uppercase tracking-wider font-bold mb-4">Eficiencia IA</div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-white">92%</span>
          </div>
          <div className="w-full bg-[#30363d] h-2 rounded-full overflow-hidden">
            <div className="bg-[#D4AF37] h-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN RESTAURADA: FLUJO DE ENTRADA Y TERMÓMETRO --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Actividad Reciente */}
        <div className="lg:col-span-2 bg-[#161b22] rounded-xl border border-[#30363d] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-white text-lg"><i className="fa-solid fa-bolt text-[#D4AF37] mr-2"></i> Tráfico Reciente</h3>
            <button onClick={navigateToWorkspace} className="text-xs text-[#8b949e] hover:text-white">Ver todo</button>
          </div>

          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-center justify-between p-4 bg-[#0f1115] rounded-lg border-l-4 border-[#3fb950] hover:bg-[#21262d] transition-colors cursor-pointer" onClick={navigateToWorkspace}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#3fb950]/20 text-[#3fb950] flex items-center justify-center font-bold">CR</div>
                <div>
                  <div className="text-white font-bold">Carlos Ruiz</div>
                  <div className="text-xs text-[#8b949e]">Detectado: Plata .720 • Hace 5 min</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#3fb950] bg-[#3fb950]/10 px-2 py-1 rounded mb-1">OPORTUNIDAD</div>
                <div className="text-[10px] text-[#8b949e]">Gemini 1.5</div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between p-4 bg-[#0f1115] rounded-lg border-l-4 border-[#ff7b72] opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#ff7b72]/20 text-[#ff7b72] flex items-center justify-center font-bold"><i className="fa-solid fa-ban"></i></div>
                <div>
                  <div className="text-white font-bold">+52 55 1234...</div>
                  <div className="text-xs text-[#8b949e]">Detectado: Billete roto • Hace 12 min</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-[#ff7b72] bg-[#ff7b72]/10 px-2 py-1 rounded mb-1">BASURA</div>
                <div className="text-[10px] text-[#8b949e]">Auto-rechazado</div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between p-4 bg-[#0f1115] rounded-lg border-l-4 border-[#D4AF37] hover:bg-[#21262d] transition-colors cursor-pointer" onClick={navigateToWorkspace}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">MG</div>
                <div>
                  <div className="text-white font-bold">Maria G.</div>
                  <div className="text-xs text-[#8b949e]">Detectado: Centenario? • Hace 45 min</div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 mb-1">
                    <i className="fa-solid fa-triangle-exclamation text-[#e3b341]"></i>
                    <div className="text-xs font-bold text-[#e3b341]">PENDIENTE</div>
                </div>
                <div className="text-[10px] text-[#ff7b72] font-bold">Atención requerida</div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Termómetro de Antigüedad */}
        <div className="bg-[#161b22] rounded-xl border border-[#30363d] p-6">
          <h3 className="font-bold text-white text-lg mb-6"><i className="fa-solid fa-stopwatch text-[#ff7b72] mr-2"></i> Antigüedad (Cola)</h3>
          
          <div className="relative h-64 flex gap-4">
            {/* Barra lateral */}
            <div className="w-1 bg-gradient-to-b from-[#3fb950] via-[#e3b341] to-[#ff7b72] rounded-full h-full relative">
                <div className="absolute top-0 -left-6 text-[10px] text-[#3fb950]">Ahora</div>
                <div className="absolute top-1/2 -left-6 text-[10px] text-[#e3b341]">30m</div>
                <div className="absolute bottom-0 -left-6 text-[10px] text-[#ff7b72]">1h+</div>
            </div>

            {/* Bubbles */}
            <div className="flex-1 relative">
                <div className="absolute top-0 left-0 right-0 bg-[#0f1115] p-3 rounded border border-[#3fb950] mb-2 shadow-[0_0_10px_rgba(63,185,80,0.2)]">
                    <div className="flex justify-between">
                        <span className="text-xs font-bold text-white">Carlos R.</span>
                        <span className="text-[10px] text-[#3fb950]">5 min</span>
                    </div>
                </div>
                <div className="absolute top-1/3 left-4 right-0 bg-[#0f1115] p-3 rounded border border-[#e3b341] opacity-80">
                    <div className="flex justify-between">
                         <span className="text-xs font-bold text-white">Cliente #402</span>
                         <span className="text-[10px] text-[#e3b341]">25 min</span>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#0f1115] p-3 rounded border border-[#ff7b72] shadow-[0_0_15px_rgba(255,123,114,0.2)] animate-pulse">
                     <div className="flex justify-between items-center">
                         <span className="text-xs font-bold text-white">Maria G.</span>
                         <div className="bg-[#ff7b72] text-black text-[10px] font-bold px-2 rounded">45m (Urgente)</div>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#8b949e]">El objetivo es mantener la cola en <span className="text-[#3fb950] font-bold">verde</span>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
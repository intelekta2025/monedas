import React, { useState } from 'react';

const WorkspaceView = ({ chats, selectedChatId, setSelectedChatId, activeMessages, createTestChat, handleApprove, draftText, setDraftText, isToastVisible }) => {
  const [filter, setFilter] = useState('all'); 
  const selectedChat = chats.find(c => c.id === selectedChatId);

  const filteredChats = chats.filter(chat => {
    if (filter === 'all') return true;
    if (filter === 'opportunity') return chat.tag === 'opportunity';
    if (filter === 'trash') return chat.tag === 'trash';
    return true;
  });

  return (
    <div className="flex flex-1 overflow-hidden relative">
        <div className="w-16 bg-[#161b22] border-r border-[#30363d] flex flex-col items-center pt-5 gap-6 z-20">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#D4AF37] bg-[rgba(212,175,55,0.15)] border-l-2 border-[#D4AF37] cursor-pointer"><i className="fa-solid fa-inbox text-xl"></i></div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[#8b949e] hover:text-white cursor-pointer"><i className="fa-solid fa-clock-rotate-left text-xl"></i></div>
        </div>

        <div className="w-80 bg-[#0f1115] border-r border-[#30363d] flex flex-col z-10">
          <div className="p-5 border-b border-[#30363d]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Bandeja de Entrada</h2>
              <button onClick={createTestChat} className="text-xs bg-[#D4AF37] text-black px-2 py-1 rounded font-bold hover:bg-white transition flex items-center gap-1">
                  <i className="fa-solid fa-plus"></i> Test Chat
              </button>
            </div>
            <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
              <button onClick={() => setFilter('all')} className={`text-xs px-3 py-1 rounded-full border transition-all ${filter === 'all' ? 'bg-[#161b22] text-white border-white' : 'text-[#8b949e] border-transparent hover:bg-[#161b22]'}`}>Todos</button>
              <button onClick={() => setFilter('opportunity')} className={`text-xs px-3 py-1 rounded-full border transition-all ${filter === 'opportunity' ? 'bg-[#3fb950]/15 text-[#3fb950] border-[#3fb950]' : 'text-[#8b949e] border-transparent hover:bg-[#161b22]'}`}>Oportunidad</button>
              <button onClick={() => setFilter('trash')} className={`text-xs px-3 py-1 rounded-full border transition-all ${filter === 'trash' ? 'bg-[#ff7b72]/15 text-[#ff7b72] border-[#ff7b72]' : 'text-[#8b949e] border-transparent hover:bg-[#161b22]'}`}>Basura</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
                <div className="text-center p-8 text-[#8b949e] text-xs italic">No hay chats.</div>
            ) : (
                filteredChats.map(chat => (
                <div key={chat.id} onClick={() => setSelectedChatId(chat.id)} className={`p-4 border-b border-[#30363d] cursor-pointer hover:bg-[#21262d] transition-colors relative ${selectedChatId === chat.id ? 'bg-[#161b22] border-l-4 border-l-[#D4AF37]' : ''}`}>
                    <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sm text-white">{chat.name}</span>
                        <span className="text-[11px] text-[#8b949e]">{chat.time ? new Date(chat.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                    {chat.status === 'processing' && <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-800 animate-pulse flex items-center"><i className="fa-solid fa-circle-notch fa-spin mr-1"></i> Analizando</span>}
                    {chat.tag === 'opportunity' && <span className="text-[10px] px-2 py-0.5 rounded bg-[#3fb950]/15 text-[#3fb950] border border-[#3fb950]/30 font-semibold uppercase flex items-center"><i className="fa-solid fa-star mr-1"></i> Oportunidad</span>}
                    {chat.tag === 'trash' && <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff7b72]/15 text-[#ff7b72] border border-[#ff7b72]/30 font-semibold uppercase flex items-center"><i className="fa-solid fa-ban mr-1"></i> Basura</span>}
                    </div>
                </div>
                ))
            )}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-[1fr_400px] bg-[#161b22]">
          <div className="flex flex-col border-r border-[#30363d]">
            <div className="h-14 border-b border-[#30363d] flex items-center justify-between px-5 bg-[#161b22]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#8b949e] rounded-full flex items-center justify-center text-white text-xs font-bold">{selectedChat?.name?.substring(0,2).toUpperCase()}</div>
                <div>
                  <div className="font-semibold text-sm text-white">{selectedChat?.name}</div>
                  <div className="text-xs text-[#8b949e]">WhatsApp: {selectedChat?.phone}</div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-[#0d1117]">
              {activeMessages.map((msg) => (
                <div key={msg.id} className={`max-w-[80%] ${!msg.is_from_client ? 'self-end' : 'self-start'}`}>
                  {msg.media_url && (
                    <div className="relative rounded-lg overflow-hidden border border-[#374151] max-w-sm mb-2">
                        <img src={msg.media_url} alt="Evidencia" className="w-full block" />
                    </div>
                  )}
                  {msg.content && (
                    <div className={`px-4 py-3 rounded-xl border text-sm shadow-sm ${!msg.is_from_client ? 'bg-[#005c4b] border-[#005c4b] text-white rounded-tr-none' : 'bg-[#1f2937] border-[#374151] text-[#e5e7eb] rounded-tl-none'}`}>
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-[#0d1117] p-5 border-l border-[#30363d]">
            <div className="mb-6">
              <div className="text-xs uppercase text-[#8b949e] tracking-widest mb-3 flex items-center gap-2 font-bold"><i className="fa-solid fa-brain text-[#D4AF37]"></i> Análisis Numismático</div>
              <div className="bg-[rgba(212,175,55,0.05)] border border-[rgba(212,175,55,0.2)] rounded-lg p-4 space-y-3 shadow-lg">
                <div className="flex justify-between text-xs items-center border-b border-[#30363d] pb-2">
                  <span className="text-[#8b949e]">Clasificación:</span>
                  <span className={`font-bold ${selectedChat?.status === 'processing' ? 'animate-pulse text-gray-500' : (selectedChat?.tag === 'opportunity' ? 'text-[#3fb950]' : 'text-[#ff7b72]')}`}>
                    {selectedChat?.status === 'processing' ? 'CALCULANDO...' : (selectedChat?.analysis?.clasificacion || selectedChat?.tag?.toUpperCase() || 'N/A')}
                  </span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-[#8b949e]">Detección:</span>
                  <span className="text-white text-right font-mono text-[11px]">{selectedChat?.analysis?.deteccion_visual || selectedChat?.analysis?.deteccion || '-'}</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-[#8b949e]">Pieza Clave:</span>
                  <span className="text-white text-right font-mono text-[11px]">{selectedChat?.analysis?.pieza_clave || selectedChat?.analysis?.pieza || '-'}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="text-xs uppercase text-[#8b949e] tracking-widest mb-3 flex items-center justify-between font-bold">
                <span><i className="fa-solid fa-pen-nib mr-1"></i> Borrador Sugerido</span>
                <span className="text-[9px] border border-[#30363d] px-1 rounded text-[#8b949e]">AI</span>
              </div>
              <textarea 
                className="flex-1 bg-[#161b22] border border-[#D4AF37] rounded-lg p-4 text-sm text-[#c9d1d9] resize-none focus:outline-none focus:ring-1 focus:ring-[#D4AF37] mb-4 shadow-[0_0_15px_rgba(212,175,55,0.05)]"
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
              />
              <div className="grid grid-cols-[1fr_2fr] gap-3">
                <button className="bg-[#21262d] text-[#c9d1d9] border border-[#30363d] rounded-md py-3 text-sm font-semibold hover:border-[#8b949e] transition flex items-center justify-center gap-2"><i className="fa-solid fa-pen"></i> Editar</button>
                <button onClick={handleApprove} className="bg-[#238636] hover:bg-[#2ea043] text-white border-none rounded-md py-3 text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg"><i className="fa-solid fa-paper-plane"></i> Aprobar y Enviar</button>
              </div>
            </div>
          </div>
        </div>

        <div className={`fixed bottom-8 right-8 bg-[#238636] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 transform transition-all duration-300 z-50 ${isToastVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <i className="fa-solid fa-circle-check text-xl"></i>
            <div><div className="font-bold text-sm">Mensaje Enviado</div><div className="text-xs opacity-90">La respuesta ha sido enviada por WhatsApp.</div></div>
        </div>
    </div>
  );
};

export default WorkspaceView;
import React, { useState } from 'react';

const ClientsView = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "Carlos Ruiz",
      phone: "+52 55 9876 5432",
      email: "carlos.r@gmail.com",
      category: "VIP",
      totalSpent: 45200,
      history: [
        { id: 101, date: "15/12/2024", item: "Centenario 50 Pesos", amount: 42000, type: "Compra" },
        { id: 102, date: "10/11/2024", item: "Lote Plata .720", amount: 3200, type: "Compra" }
      ]
    },
    {
      id: 2,
      name: "Maria Gonzalez",
      phone: "+52 55 1122 3344",
      email: "mgonzalez@hotmail.com",
      category: "Recurrente",
      totalSpent: 8500,
      history: [
        { id: 201, date: "05/12/2024", item: "Hidalgo 5 Pesos (Oro)", amount: 8500, type: "Compra" }
      ]
    }
  ]);

  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ item: '', amount: '', type: 'Compra' });

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.item || !newTransaction.amount) return;

    const amountNum = parseFloat(newTransaction.amount);
    
    const transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-MX'),
      item: newTransaction.item,
      amount: amountNum,
      type: newTransaction.type
    };

    const updatedClient = {
      ...selectedClient,
      totalSpent: selectedClient.totalSpent + (newTransaction.type === 'Compra' ? amountNum : 0),
      history: [transaction, ...selectedClient.history]
    };

    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
    
    setNewTransaction({ item: '', amount: '', type: 'Compra' });
    setShowModal(false);
  };

  return (
    <div className="flex-1 bg-[#0f1115] overflow-hidden flex font-sans text-[#c9d1d9] relative">
      {/* MODAL DE REGISTRO */}
      {showModal && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#161b22] border border-[#30363d] p-6 rounded-xl w-full max-w-md shadow-2xl transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Registrar Operación</h3>
              <button onClick={() => setShowModal(false)} className="text-[#8b949e] hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
            </div>
            
            <form onSubmit={handleSaveTransaction} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Tipo de Operación</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    onClick={() => setNewTransaction({...newTransaction, type: 'Compra'})}
                    className={`py-2 rounded border font-semibold text-sm transition-colors ${newTransaction.type === 'Compra' ? 'bg-[#3fb950]/20 text-[#3fb950] border-[#3fb950]' : 'border-[#30363d] text-[#8b949e]'}`}
                  >
                    Compra (Gasto)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewTransaction({...newTransaction, type: 'Venta'})}
                    className={`py-2 rounded border font-semibold text-sm transition-colors ${newTransaction.type === 'Venta' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]' : 'border-[#30363d] text-[#8b949e]'}`}
                  >
                    Venta (Ingreso)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Pieza / Concepto</label>
                <input 
                  type="text" 
                  className="w-full bg-[#0f1115] border border-[#30363d] rounded p-3 text-white focus:border-[#D4AF37] outline-none"
                  placeholder="Ej. Centenario 1947"
                  value={newTransaction.item}
                  onChange={e => setNewTransaction({...newTransaction, item: e.target.value})}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Monto ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#0f1115] border border-[#30363d] rounded p-3 text-white focus:border-[#D4AF37] outline-none font-mono"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded hover:bg-white transition">
                  Guardar Transacción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LISTA DE CLIENTES */}
      <div className="w-1/3 border-r border-[#30363d] flex flex-col bg-[#0f1115]">
        <div className="p-6 border-b border-[#30363d]">
          <h2 className="text-2xl font-bold text-white mb-2">Directorio</h2>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-3 text-[#8b949e]"></i>
            <input 
              type="text" 
              placeholder="Buscar cliente..." 
              className="w-full bg-[#161b22] border border-[#30363d] rounded-lg py-2 pl-10 pr-4 text-white focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {clients.map(client => (
            <div 
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`p-4 border-b border-[#30363d] cursor-pointer hover:bg-[#21262d] transition-colors flex justify-between items-center ${selectedClient.id === client.id ? 'bg-[#161b22] border-l-4 border-l-[#D4AF37]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${client.category === 'VIP' ? 'bg-[#D4AF37] text-black' : 'bg-[#30363d] text-white'}`}>
                  {client.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white">{client.name}</div>
                  <div className="text-xs text-[#8b949e]">{client.phone}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white">${client.totalSpent.toLocaleString()}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${client.category === 'VIP' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#30363d] text-[#8b949e]'}`}>
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DETALLE DEL CLIENTE */}
      <div className="flex-1 bg-[#161b22] p-8 overflow-y-auto">
        {selectedClient ? (
          <>
            <div className="flex justify-between items-start mb-8 pb-8 border-b border-[#30363d]">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#30363d] flex items-center justify-center text-4xl text-[#8b949e]">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">{selectedClient.name}</h1>
                  <div className="flex gap-4 mt-2 text-sm text-[#8b949e]">
                    <span><i className="fa-solid fa-phone mr-1"></i> {selectedClient.phone}</span>
                    <span><i className="fa-solid fa-envelope mr-1"></i> {selectedClient.email}</span>
                  </div>
                  <div className="mt-3">
                    <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedClient.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right bg-[#0f1115] p-4 rounded-xl border border-[#30363d]">
                <div className="text-[#8b949e] text-xs uppercase tracking-wider">Valor Total (LTV)</div>
                <div className="text-3xl font-bold text-[#3fb950]">${selectedClient.totalSpent.toLocaleString()} <span className="text-sm text-[#8b949e]">MXN</span></div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fa-solid fa-clock-rotate-left text-[#D4AF37]"></i> Historial
              </h3>
              <button 
                onClick={() => setShowModal(true)}
                className="bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <i className="fa-solid fa-plus text-[#3fb950]"></i> Registrar Operación
              </button>
            </div>
            
            {selectedClient.history.length > 0 ? (
              <div className="bg-[#0f1115] rounded-xl border border-[#30363d] overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#21262d] text-[#8b949e] text-xs uppercase">
                    <tr>
                      <th className="p-4">Fecha</th>
                      <th className="p-4">Concepto / Pieza</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4 text-right">Monto</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363d]">
                    {selectedClient.history.map(tx => (
                      <tr key={tx.id} className="hover:bg-[#1f2937] transition-colors">
                        <td className="p-4 text-white">{tx.date}</td>
                        <td className="p-4 text-[#D4AF37] font-medium">{tx.item}</td>
                        <td className="p-4 text-xs">
                          <span className={`px-2 py-1 rounded ${tx.type === 'Compra' ? 'bg-[#3fb950]/20 text-[#3fb950]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-white">${tx.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-10 bg-[#0f1115] rounded-xl border border-[#30363d] border-dashed">
                <i className="fa-solid fa-basket-shopping text-4xl text-[#30363d] mb-4"></i>
                <p className="text-[#8b949e]">Este cliente aún no tiene historial de compras registrado.</p>
                <button onClick={() => setShowModal(true)} className="text-[#D4AF37] text-sm mt-2 hover:underline">Registrar la primera</button>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-[#8b949e]">
            Selecciona un cliente para ver su detalle
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsView;
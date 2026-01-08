import React, { useState } from 'react';

const AdminView = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Oswaldo Ruiz", email: "oswaldo@bazar.mx", role: "Admin", status: "Activo" },
    { id: 2, name: "Mariana López", email: "mariana@bazar.mx", role: "Operador", status: "Activo" }
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Operador' });

  const handleAddUser = (e) => {
    e.preventDefault();
    alert("Para crear un usuario real, usa el panel de Supabase > Authentication");
  };

  return (
    <div className="flex-1 bg-[#0f1115] overflow-y-auto p-8 font-sans text-[#c9d1d9]">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Administración de Accesos</h1>
          <p className="text-[#8b949e]">Gestiona quién tiene permisos para entrar al Copiloto.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d]">
          <h3 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <i className="fa-solid fa-user-plus text-[#D4AF37]"></i> Nuevo Usuario
          </h3>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Nombre Completo</label>
              <input type="text" className="w-full bg-[#0f1115] border border-[#30363d] rounded p-3 text-white outline-none" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Correo Electrónico</label>
              <input type="email" className="w-full bg-[#0f1115] border border-[#30363d] rounded p-3 text-white outline-none" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs uppercase text-[#8b949e] mb-1 font-bold">Rol</label>
              <select className="w-full bg-[#0f1115] border border-[#30363d] rounded p-3 text-white outline-none" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                <option value="Operador">Operador</option>
                <option value="Admin">Administrador</option>
              </select>
            </div>
            <button className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded hover:bg-white transition mt-4">Dar de Alta</button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden">
          <div className="p-6 border-b border-[#30363d] flex justify-between items-center">
            <h3 className="font-bold text-white text-lg">Usuarios Activos</h3>
            <span className="text-xs bg-[#30363d] px-2 py-1 rounded text-white">{users.length} Total</span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#0f1115] text-[#8b949e] text-xs uppercase">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Rol</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-[#21262d] transition-colors">
                  <td className="p-4"><div className="font-bold text-white">{user.name}</div><div className="text-xs text-[#8b949e]">{user.email}</div></td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded border ${user.role === 'Admin' ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#30363d] text-[#8b949e]'}`}>{user.role}</span></td>
                  <td className="p-4"><span className={`flex items-center gap-2 text-sm ${user.status === 'Activo' ? 'text-[#3fb950]' : 'text-[#ff7b72]'}`}><div className={`w-2 h-2 rounded-full ${user.status === 'Activo' ? 'bg-[#3fb950]' : 'bg-[#ff7b72]'}`}></div>{user.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
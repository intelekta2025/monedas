import React, { useState } from 'react';
import { supabase } from '../services/supabase'; 

const LoginView = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data?.user) {
         onLoginSuccess(data.user);
      }
    } catch (err) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Credenciales incorrectas. Verifica tu correo y contraseña.' 
        : err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#0f1115] flex items-center justify-center font-sans text-[#c9d1d9] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] opacity-5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#3fb950] opacity-5 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md p-8 bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 border border-[#D4AF37]/20">
            <i className="fa-solid fa-coins"></i>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Bienvenido de nuevo</h1>
          <p className="text-sm text-[#8b949e]">Ingresa a tu cuenta para gestionar el Bazar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-bold text-[#8b949e] mb-1">Correo Electrónico</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-3.5 text-[#8b949e]"></i>
              <input 
                type="email" 
                placeholder="nombre@empresa.com"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-[#8b949e] mb-1">Contraseña</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-3.5 text-[#8b949e]"></i>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg py-3 pl-10 pr-4 text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-[#ff7b72] bg-[#ff7b72]/10 p-3 rounded border border-[#ff7b72]/20 flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}

          <button 
            disabled={isLoading}
            className="w-full bg-[#D4AF37] hover:bg-[#F5E09E] text-black font-bold py-3.5 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
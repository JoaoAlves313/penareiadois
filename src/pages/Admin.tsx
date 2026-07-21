import React, { useState } from 'react';
import AgendaView from '../components/AgendaView';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'ADMIN' && password === '1234') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  if (isLoggedIn) {
    return <AgendaView isAdmin={true} />;
  }

  return (
    <div className="min-h-screen bg-arena-bg flex items-center justify-center font-sans">
      <div className="bg-[#141414] p-8 rounded-2xl w-full max-w-sm border border-white/5 shadow-2xl">
        <h2 className="text-2xl font-black italic tracking-tight text-white mb-6 text-center">PAINEL ADMINISTRATIVO</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">USUÁRIO</label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-arena-beige transition-colors"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest text-gray-400 mb-2">SENHA</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-arena-beige transition-colors"
              placeholder="Digite sua senha"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          
          <button 
            type="submit"
            className="w-full bg-arena-beige text-black font-bold text-sm tracking-widest py-3 rounded-xl mt-4 hover:bg-arena-beige-dark transition-colors"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

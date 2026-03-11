import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      setError('E-mail inválido.');
      return;
    }

    // Simulação de login
    dispatch(login({
      id: '1',
      name: email.split('@')[0],
      email: email
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-8 pt-12 flex flex-col h-full"
    >
      <div className="mb-12">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <LogIn className="text-white w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Bem-vindo</h1>
        <p className="text-neutral-500 mt-2">Entre para continuar suas compras</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">E-mail</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">Senha</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}

        <button 
          type="submit"
          className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-xl hover:bg-neutral-800 active:scale-[0.98] transition-all mt-4"
        >
          Entrar
        </button>
      </form>

      <div className="mt-auto pb-8 text-center">
        <p className="text-neutral-400 text-sm">
          Não tem uma conta? <span className="text-black font-bold cursor-pointer">Cadastre-se</span>
        </p>
      </div>
    </motion.div>
  );
};

import React, { useState, FormEvent } from 'react';
// Fix: Corrected import path for View type.
import type { View } from '../types';
import type { UserCredentials } from '../types';

interface LoginProps {
  onNavigate: (view: View) => void;
  onLogin: (credentials: UserCredentials) => boolean;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const success = onLogin({ email, password });

    if (!success) {
      setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
    // Navigation is handled by App.tsx on successful login
  };

  return (
    <section className="py-28 px-4 flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-md">
        <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg w-full">
          <button onClick={() => onNavigate('home')} className="mb-4 text-xs text-[#FFD700] hover:underline">
            &larr; Volver al inicio
          </button>
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Iniciar Sesión</h1>
          
          {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors">
                Entrar
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">
            ¿No tienes cuenta?{' '}
            <button onClick={() => onNavigate('registerUser')} className="font-semibold text-[#FFD700] hover:underline">
              Regístrate aquí
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

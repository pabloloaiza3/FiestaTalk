import React, { useState, FormEvent, useEffect, ChangeEvent } from 'react';
// Fix: Corrected import path for View type.
import type { View } from '../types';
import type { NewUser } from '../types';

interface RegisterProps {
  onNavigate: (view: View) => void;
  onRegister: (user: NewUser) => boolean;
  isHost: boolean;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegister, isHost }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSymbol: false,
    });

    const title = isHost ? 'Regístrate como Anfitrión' : 'Crea tu Cuenta Gratis';
    const subtitle = isHost 
        ? 'Empieza a crear experiencias y a generar ingresos.' 
        : 'Únete a la comunidad y empieza a conectar.';

    useEffect(() => {
        // Validate password requirements for users only
        if (!isHost) {
            setPasswordValidation({
                minLength: password.length >= 8,
                hasUpper: /[A-Z]/.test(password),
                hasLower: /[a-z]/.test(password),
                hasNumber: /[0-9]/.test(password),
                hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            });
        }
        
        // Validate password confirmation
        if (password && confirmPassword && password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
        } else {
            setError('');
        }
    }, [password, confirmPassword, isHost]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
    }
    
    if (!isHost) {
        const isPasswordFullyValid = Object.values(passwordValidation).every(Boolean);
        if (!isPasswordFullyValid) {
            setError('La contraseña no cumple todos los requisitos de seguridad.');
            return;
        }
    }

    if (!name || !email || !password) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    const newUser: NewUser = {
        name,
        email,
        password, // In a real app, never store plain text passwords
        role: isHost ? 'host' : 'user',
        avatarUrl: isHost ? avatarUrl : undefined,
        bio: isHost ? bio : undefined,
    };

    const success = onRegister(newUser);
    if (!success) {
      setError('Este correo electrónico ya está en uso.');
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);
  const isSubmitDisabled = !!error || !password || !confirmPassword || (!isHost && !isPasswordValid);

  return (
    <section className="py-28 px-4 flex items-center justify-center min-h-screen">
      <div className="container mx-auto max-w-md">
        <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg w-full">
            <button onClick={() => onNavigate('home')} className="mb-4 text-xs text-[#FFD700] hover:underline">
                &larr; Volver al inicio
            </button>
            <h1 className="text-3xl font-bold mb-2 text-center text-white">{title}</h1>
            <p className="text-center text-gray-400 mb-6">{subtitle}</p>
            
            {error && <p className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="Tu nombre y apellido"
                        required
                    />
                </div>
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

                {isHost && (
                    <>
                        <div>
                            <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-2">Imagen de Perfil</label>
                            <input
                                type="file"
                                id="avatar"
                                onChange={handleAvatarChange}
                                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFD700] file:text-black hover:file:bg-yellow-300"
                                accept="image/*"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">Biografía <span className="text-gray-500">(Opcional)</span></label>
                            <textarea
                                id="bio"
                                rows={3}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                                placeholder="Cuéntanos un poco sobre ti y los eventos que te gustaría crear..."
                            />
                        </div>
                    </>
                )}

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="Crea una contraseña segura"
                        required
                    />
                </div>

                {!isHost && password && (
                    <div className="text-xs text-gray-400 space-y-1 pl-2">
                        <p className={passwordValidation.minLength ? 'text-green-400' : 'text-gray-500'}>
                          {passwordValidation.minLength ? '✓' : '•'} Al menos 8 caracteres
                        </p>
                        <p className={passwordValidation.hasUpper ? 'text-green-400' : 'text-gray-500'}>
                          {passwordValidation.hasUpper ? '✓' : '•'} Una letra mayúscula (A-Z)
                        </p>
                        <p className={passwordValidation.hasLower ? 'text-green-400' : 'text-gray-500'}>
                          {passwordValidation.hasLower ? '✓' : '•'} Una letra minúscula (a-z)
                        </p>
                        <p className={passwordValidation.hasNumber ? 'text-green-400' : 'text-gray-500'}>
                          {passwordValidation.hasNumber ? '✓' : '•'} Un número (0-9)
                        </p>
                        <p className={passwordValidation.hasSymbol ? 'text-green-400' : 'text-gray-500'}>
                          {passwordValidation.hasSymbol ? '✓' : '•'} Un símbolo especial (!@#$...)
                        </p>
                    </div>
                )}
                
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                        placeholder="Repite tu contraseña"
                        required
                    />
                </div>
                <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                      disabled={isSubmitDisabled}
                    >
                        {isHost ? 'Convertirme en Anfitrión' : 'Crear mi Cuenta'}
                    </button>
                </div>
            </form>
             <p className="text-center text-sm text-gray-400 mt-6">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => onNavigate('login')} className="font-semibold text-[#FFD700] hover:underline">
                    Inicia sesión aquí
                </button>
            </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
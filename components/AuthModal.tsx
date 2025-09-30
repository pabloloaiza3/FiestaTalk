import React from 'react';
import type { View } from '../types';

interface AuthModalProps {
    onNavigate: (view: View) => void;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onNavigate, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">¡Únete a la Conversación!</h2>
                <p className="text-gray-400 mb-6">Para continuar, por favor inicia sesión o crea una cuenta.</p>
                <div className="space-y-4">
                    <button 
                        onClick={() => onNavigate('login')}
                        className="w-full bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 hover:bg-yellow-300 transition-colors"
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={() => onNavigate('registerUser')}
                        className="w-full border border-[#FFD700] text-[#FFD700] font-bold rounded-full px-8 py-3 hover:bg-[#FFD700] hover:text-black transition-colors"
                    >
                        Registrarse
                    </button>
                </div>
                <button onClick={onClose} className="mt-6 text-sm text-gray-500 hover:underline">
                    Ahora no
                </button>
            </div>
        </div>
    );
};

export default AuthModal;

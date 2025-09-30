import React from 'react';
import type { View } from '../types';
import type { User } from '../types';

interface HeaderProps {
    onNavigate: (view: View) => void;
    user: User | null;
    // Fix: Added onLogout prop to handle user logout from the header.
    onLogout: () => void;
    onShowHelp: () => void;
}

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4 0 .863-.27 1.66-.744 2.26l-1.1 1.1a1 1 0 00.707 1.707H16m-4-8v-1m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onNavigate, user, onLogout, onShowHelp }) => {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-[#0b0c10]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
            <nav className="container mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                <button onClick={() => onNavigate('home')} className="text-2xl font-bold text-white">
                    Fiesta<span className="text-[#FFD700]">Talk</span>
                </button>
                <div className="hidden sm:flex items-center gap-6 text-sm font-semibold">
                    <a href="#events" onClick={(e) => handleScroll(e, 'events')} className="text-gray-300 hover:text-[#FFD700] transition-colors">Eventos</a>
                    <a href="#about-us" onClick={(e) => handleScroll(e, 'about-us')} className="text-gray-300 hover:text-[#FFD700] transition-colors">Sobre Nosotros</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, 'contact')} className="text-gray-300 hover:text-[#FFD700] transition-colors">Contacto</a>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onShowHelp}
                        className="text-gray-300 hover:text-[#FFD700] transition-colors"
                        aria-label="Centro de Ayuda"
                    >
                        <HelpIcon />
                    </button>
                    {user ? (
                        <>
                            <button
                                onClick={() => onNavigate('friends')}
                                className="text-sm font-semibold hover:text-[#FFD700] transition-colors hidden sm:block"
                            >
                                Mis Amigos
                            </button>
                            <button onClick={() => onNavigate('profile')} className="flex items-center gap-3">
                                <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                                 <img 
                                    src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.email}`} 
                                    alt={user.name} 
                                    className="w-9 h-9 rounded-full border-2 border-[#FFD700]"
                                />
                            </button>
                             <button
                                onClick={onLogout}
                                className="text-sm font-semibold hover:text-[#FFD700] transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => onNavigate('login')}
                                className="text-sm font-semibold hover:text-[#FFD700] transition-colors"
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                onClick={() => onNavigate('registerUser')}
                                className="bg-[#FFD700] text-black text-sm font-bold rounded-full px-5 py-2 hover:bg-yellow-300 transition-colors"
                            >
                                Registrarse
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
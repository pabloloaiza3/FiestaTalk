import React, { useState } from 'react';
import type { Event, View, User } from '../types';

interface RateHostProps {
    event: Event;
    host: User | undefined;
    onRateHost: (hostId: number, rating: { stars: number; comment?: string }) => void;
    onNavigate: (view: View) => void;
}

const Star = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
    <svg 
        onClick={onClick}
        className={`w-10 h-10 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const RateHost: React.FC<RateHostProps> = ({ event, host, onRateHost, onNavigate }) => {
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);
    const [comment, setComment] = useState('');

    if (!host) {
        return (
            <section className="py-20 px-4 flex items-center justify-center min-h-screen text-center">
                <p>Anfitrión no encontrado.</p>
            </section>
        );
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (stars === 0) {
            alert('Por favor, selecciona al menos una estrella.');
            return;
        }
        onRateHost(host.id, { stars, comment });
    };

    return (
        <section className="py-20 px-4 flex items-center justify-center min-h-screen">
            <div className="container mx-auto max-w-lg">
                <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg w-full text-center">
                    <h1 className="text-3xl font-bold mb-2 text-white">¡Gracias por participar!</h1>
                    <p className="text-gray-400 mb-1">Valora tu experiencia en</p>
                    <p className="text-xl font-semibold text-[#FFD700] mb-6">"{event.title}"</p>
                    
                    <div className="bg-[#0b0c10] p-6 rounded-lg mb-8">
                        <p className="mb-4">¿Qué te pareció el anfitrión, <span className="font-bold">{host.name}</span>?</p>
                        <div className="flex justify-center gap-2" onMouseLeave={() => setHoverStars(0)}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} onMouseEnter={() => setHoverStars(i)}>
                                    <Star filled={i <= (hoverStars || stars)} onClick={() => setStars(i)} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                            placeholder="Añade un comentario (opcional)..."
                        />
                        <button
                            type="submit"
                            className="mt-6 w-full bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-500"
                            disabled={stars === 0}
                        >
                            Enviar Valoración
                        </button>
                        <button
                            type="button"
                            onClick={() => onNavigate('home')}
                            className="mt-4 text-sm text-gray-500 hover:underline"
                        >
                            Omitir
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RateHost;

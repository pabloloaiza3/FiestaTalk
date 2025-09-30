import React, { useEffect, useState } from 'react';
import type { Event, View } from '../types';

interface WaitingRoomProps {
    event: Event;
    onNavigate: (view: View, data?: any) => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ event, onNavigate }) => {
    // Use the actual event date from props
    const [eventStartTime] = useState(new Date(event.date));
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isEventStarting, setIsEventStarting] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = eventStartTime.getTime() - now.getTime();

            if (difference <= 0) {
                setTimeRemaining('00:00:00');
                setIsEventStarting(true);
                clearInterval(timer);
                return;
            }
            
            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }, 1000);

        return () => clearInterval(timer);
    }, [eventStartTime]);

    return (
        <section className="py-20 px-4 flex items-center justify-center min-h-screen text-center bg-cover bg-center" style={{backgroundImage: `linear-gradient(rgba(11, 12, 16, 0.9), rgba(11, 12, 16, 0.9)), url(${event.imageUrl})`}}>
            <div className="container mx-auto max-w-4xl bg-[#1f2833]/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
                
                <h1 className="text-2xl font-bold mb-2">Sala de Espera</h1>
                <h2 className="text-4xl font-extrabold text-[#FFD700] mb-8">{event.title}</h2>

                <div className="bg-[#0b0c10] p-6 rounded-lg mb-8">
                    <p className="text-lg text-gray-400 mb-2">El evento comenzará en:</p>
                    <p className="text-6xl font-mono font-bold tracking-wider">{timeRemaining}</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Participantes Confirmados ({event.participants.length}/{event.maxPlayers})</h3>
                    <div className="flex flex-wrap gap-4 justify-center max-h-48 overflow-y-auto p-2 rounded-lg bg-black/20">
                        {event.participants.map(p => (
                            <div key={p.name} className="flex items-center flex-col text-center w-20" title={p.name}>
                                <img src={p.avatarUrl} alt={p.name} className="w-16 h-16 rounded-full border-2 border-gray-600 mb-1"/>
                                <span className="text-xs text-gray-300 w-full truncate">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button 
                    onClick={() => onNavigate('callRoom', event)}
                    disabled={!isEventStarting}
                    className="mt-10 bg-[#FFD700] text-black font-bold rounded-full px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 disabled:text-gray-400"
                >
                    {isEventStarting ? '¡Entrar al Evento Ahora!' : 'Esperando para Entrar'}
                </button>
            </div>
        </section>
    );
};

export default WaitingRoom;
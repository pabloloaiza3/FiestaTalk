import React from 'react';
import type { User, View, Event } from '../types';

interface ProfileProps {
    user: User;
    onNavigate: (view: View, data?: any) => void;
    onLogout: () => void;
    events: Event[];
    users: User[]; // All users needed to find hosts for events
}

const Profile: React.FC<ProfileProps> = ({ user, onNavigate, onLogout, events }) => {
    
    const enrolledEvents = events.filter(event => user.enrolledEventIds.includes(event.id));

    const getAverageRating = () => {
        if (!user.ratings || user.ratings.length === 0) {
            return { avg: 'N/A', count: 0 };
        }
        const totalStars = user.ratings.reduce((acc, rating) => acc + rating.stars, 0);
        const avg = (totalStars / user.ratings.length).toFixed(1);
        return { avg, count: user.ratings.length };
    };

    const ratingInfo = user.role === 'host' ? getAverageRating() : null;

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center">
                    <img 
                        src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.email}`} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#FFD700]"
                    />
                    <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                    <p className="text-lg text-gray-400 mb-4">{user.email}</p>
                    {user.bio && <p className="text-gray-300 max-w-xl mx-auto mb-4">{user.bio}</p>}
                    
                    {user.role === 'host' && ratingInfo && (
                        <div className="flex justify-center items-center gap-4 text-lg bg-[#0b0c10] py-2 px-4 rounded-full max-w-xs mx-auto">
                            <span className="text-yellow-400 text-2xl">★</span>
                            <span className="font-bold text-white">{ratingInfo.avg}</span>
                            <span className="text-gray-400">({ratingInfo.count} reseñas)</span>
                        </div>
                    )}
                </div>

                <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg mt-10">
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Panel de Control</h2>
                    
                    {user.role === 'host' && (
                        <div className="mb-8 text-center">
                            <p className="text-gray-300 mb-4">Gestiona tus eventos y perfil de anfitrión.</p>
                            <button 
                                onClick={() => onNavigate('createEvent')}
                                className="bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors"
                            >
                                Crear Nuevo Evento
                            </button>
                        </div>
                    )}
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Mis Próximos Eventos</h3>
                        {enrolledEvents.length > 0 ? (
                            <ul className="space-y-4">
                                {enrolledEvents.map(event => (
                                    <li key={event.id} className="bg-[#0b0c10] p-4 rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-bold">{event.title}</p>
                                            <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <button 
                                            onClick={() => onNavigate('eventDetail', event)}
                                            className="bg-transparent border border-[#FFD700] text-[#FFD700] text-sm font-semibold rounded-full px-4 py-1 hover:bg-[#FFD700] hover:text-black transition-colors"
                                        >
                                            Ver Evento
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                             <p className="text-gray-400 text-center py-4">Aún no te has inscrito a ningún evento.</p>
                        )}
                    </div>

                    {user.role === 'host' && user.ratings && user.ratings.length > 0 && (
                        <div className="mt-8 border-t border-gray-700 pt-6">
                            <h3 className="text-xl font-semibold mb-4">Reseñas Recibidas</h3>
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                                {user.ratings.map((rating, index) => (
                                    <div key={index} className="bg-[#0b0c10] p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="font-semibold">{rating.userName}</p>
                                            <p className="text-yellow-400">{'★'.repeat(rating.stars)}{'☆'.repeat(5 - rating.stars)}</p>
                                        </div>
                                        {rating.comment && <p className="text-gray-300 italic">"{rating.comment}"</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                     <div className="mt-8 border-t border-gray-700 pt-6 text-center">
                        <button
                            onClick={onLogout}
                            className="text-sm text-red-400 hover:underline"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
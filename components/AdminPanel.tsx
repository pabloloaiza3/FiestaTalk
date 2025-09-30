import React from 'react';
import type { User, Event } from '../types';

interface AdminPanelProps {
    currentUser: User;
    events: Event[];
    users: User[];
    onDeleteEvent: (eventId: number) => void;
    onDeleteUser: (userId: number) => void;
    onLogout: () => void;
}

// Icons for stats cards
const EventsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" />
    </svg>
);
const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1.667a1.667 1.667 0 01.4-.417m-4.5 8.917a1.667 1.667 0 01-.417-.4M12 18v1.667a1.667 1.667 0 01-.4.417m4.5-8.917a1.667 1.667 0 01.417.4M12 4.333V3m0 18v-1.333" />
    </svg>
);

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; description: string }> = ({ icon, title, value, description }) => (
    <div className="bg-[#1f2833] p-6 rounded-lg flex items-center gap-6">
        <div className="bg-gray-800 p-4 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    </div>
);

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser, events, users, onDeleteEvent, onDeleteUser, onLogout }) => {
    
    const totalRevenue = events
        .filter(e => e.price.toLowerCase() !== 'gratis')
        .reduce((acc, e) => {
            const priceValue = parseFloat(e.price.replace(/[^0-9.]/g, '')) || 0;
            const participantCount = e.participants.length > 0 ? e.participants.length - 1 : 0; // Exclude host
            return acc + (priceValue * participantCount);
        }, 0);

    const handleDeleteEventClick = (eventId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
            onDeleteEvent(eventId);
        }
    }

    const handleDeleteUserClick = (userId: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción también eliminará su participación en eventos. La acción no se puede deshacer.')) {
            onDeleteUser(userId);
        }
    }

    const getRoleClass = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-yellow-500/20 text-yellow-300';
            case 'host': return 'bg-blue-500/20 text-blue-300';
            default: return 'bg-gray-500/20 text-gray-300';
        }
    };

    return (
        <section className="py-12 px-4 sm:px-8 min-h-screen bg-[#0b0c10]">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold">Panel de Administración</h1>
                        <p className="text-gray-400">Bienvenido, {currentUser.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                         <img 
                            src={currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`} 
                            alt={currentUser.name} 
                            className="w-12 h-12 rounded-full border-2 border-[#FFD700]"
                        />
                        <button onClick={onLogout} className="bg-red-600 text-white font-bold rounded-full px-5 py-2 text-sm hover:bg-red-700 transition-colors">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard icon={<UsersIcon />} title="Total de Usuarios" value={users.length} description="Todos los roles incluidos" />
                    <StatCard icon={<EventsIcon />} title="Eventos Activos" value={events.length} description="Eventos programados en la plataforma" />
                    <StatCard icon={<DollarIcon />} title="Ingresos Estimados" value={`$${totalRevenue.toLocaleString('es-CL')}`} description="Basado en eventos de pago" />
                </div>

                {/* Management Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Event Management */}
                    <div className="bg-[#1f2833] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Gestionar Eventos</h2>
                        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                            {events.map(event => (
                                <div key={event.id} className="bg-[#0b0c10] p-3 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                    <div>
                                        <p className="font-bold">{event.title}</p>
                                        <p className="text-sm text-gray-400">ID: {event.id} | Part: {event.participants.length}/{event.maxPlayers} | {event.price}</p>
                                    </div>
                                    <div className="flex gap-2 self-end sm:self-center">
                                        <button className="text-sm font-semibold bg-blue-600/50 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition-colors">Editar</button>
                                        <button onClick={() => handleDeleteEventClick(event.id)} className="text-sm font-semibold bg-red-600/50 text-white rounded-md px-3 py-1 hover:bg-red-600 transition-colors">Eliminar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Management */}
                    <div className="bg-[#1f2833] p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">Gestionar Usuarios</h2>
                         <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-3">
                            {users.map(user => (
                                <div key={user.id} className="bg-[#0b0c10] p-3 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="w-10 h-10 rounded-full"/>
                                        <div>
                                            <p className="font-bold">{user.name}</p>
                                            <p className="text-sm text-gray-400 flex items-center gap-2">{user.email} <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${getRoleClass(user.role)}`}>{user.role}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 self-end sm:self-center">
                                        <button className="text-sm font-semibold bg-blue-600/50 text-white rounded-md px-3 py-1 hover:bg-blue-600 transition-colors">Editar</button>
                                        <button 
                                            onClick={() => handleDeleteUserClick(user.id)} 
                                            disabled={user.role === 'admin'} 
                                            className="text-sm font-semibold bg-red-600/50 text-white rounded-md px-3 py-1 hover:bg-red-600 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminPanel;

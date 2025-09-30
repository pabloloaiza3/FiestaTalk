import React, { useState } from 'react';
import type { User, View } from '../types';

interface FriendsProps {
    currentUser: User;
    allUsers: User[];
    onNavigate: (view: View) => void;
    onFriendRequest: (recipientId: number) => void;
    onFriendResponse: (senderId: number, accepted: boolean) => void;
}

type Tab = 'friends' | 'requests' | 'find';

const Friends: React.FC<FriendsProps> = ({ currentUser, allUsers, onNavigate, onFriendRequest, onFriendResponse }) => {
    const [activeTab, setActiveTab] = useState<Tab>('friends');
    const [searchTerm, setSearchTerm] = useState('');

    const getTabClass = (tabName: Tab) => activeTab === tabName ? 'border-b-2 border-[#FFD700] text-[#FFD700]' : 'text-gray-400';
    
    const friendRequests = allUsers.filter(user => currentUser.friendRequestsReceived.includes(user.id));
    const friends = allUsers.filter(user => currentUser.friends.includes(user.id));

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const searchResults = searchTerm.length > 1 
        ? allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
            user.id !== currentUser.id &&
            !currentUser.friends.includes(user.id) &&
            !currentUser.friendRequestsSent.includes(user.id)
        )
        : [];

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <button onClick={() => onNavigate('home')} className="mb-8 text-sm text-[#FFD700] hover:underline">
                    &larr; Volver al inicio
                </button>
                <h1 className="text-4xl font-bold mb-8 text-center">Mis Amigos</h1>

                <div className="bg-[#1f2833] p-8 rounded-lg">
                    <div className="flex border-b border-gray-700 mb-6">
                        <button className={`py-2 px-4 font-semibold ${getTabClass('friends')}`} onClick={() => setActiveTab('friends')}>
                            Mis Amigos ({friends.length})
                        </button>
                        <button className={`py-2 px-4 font-semibold ${getTabClass('requests')}`} onClick={() => setActiveTab('requests')}>
                            Solicitudes ({friendRequests.length})
                        </button>
                        <button className={`py-2 px-4 font-semibold ${getTabClass('find')}`} onClick={() => setActiveTab('find')}>
                            Encontrar Amigos
                        </button>
                    </div>

                    {/* My Friends Tab */}
                    {activeTab === 'friends' && (
                        <div>
                            {friends.length > 0 ? (
                                <ul className="space-y-4">
                                    {friends.map(friend => (
                                        <li key={friend.id} className="flex items-center justify-between bg-[#0b0c10] p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <img src={friend.avatarUrl || `https://i.pravatar.cc/150?u=${friend.email}`} alt={friend.name} className="w-12 h-12 rounded-full mr-4" />
                                                <div>
                                                    <p className="font-bold">{friend.name}</p>
                                                    <p className={`text-xs ${friend.id % 2 === 0 ? 'text-green-400' : 'text-gray-500'}`}>{friend.id % 2 === 0 ? '● En línea' : '○ Desconectado'}</p>
                                                </div>
                                            </div>
                                            <button className="bg-transparent border border-gray-500 text-gray-300 text-sm font-semibold rounded-full px-4 py-1 hover:bg-gray-700 transition-colors">Invitar</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-gray-400 text-center">Aún no tienes amigos. ¡Busca a alguien!</p>}
                        </div>
                    )}
                    
                    {/* Requests Tab */}
                    {activeTab === 'requests' && (
                         <div>
                            {friendRequests.length > 0 ? (
                                <ul className="space-y-4">
                                    {friendRequests.map(sender => (
                                        <li key={sender.id} className="flex items-center justify-between bg-[#0b0c10] p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <img src={sender.avatarUrl || `https://i.pravatar.cc/150?u=${sender.email}`} alt={sender.name} className="w-12 h-12 rounded-full mr-4" />
                                                <p><span className="font-bold">{sender.name}</span> te ha enviado una solicitud.</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => onFriendResponse(sender.id, true)} className="bg-green-600 text-white text-sm font-semibold rounded-full px-4 py-1 hover:bg-green-500 transition-colors">Aceptar</button>
                                                <button onClick={() => onFriendResponse(sender.id, false)} className="bg-red-600 text-white text-sm font-semibold rounded-full px-4 py-1 hover:bg-red-500 transition-colors">Rechazar</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : <p className="text-gray-400 text-center">No tienes solicitudes pendientes.</p>}
                        </div>
                    )}

                    {/* Find Friends Tab */}
                    {activeTab === 'find' && (
                        <div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Buscar usuarios por nombre..."
                                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] mb-6"
                            />
                            {searchTerm.length > 1 && (
                                <ul className="space-y-4">
                                    {searchResults.length > 0 ? searchResults.map(user => (
                                        <li key={user.id} className="flex items-center justify-between bg-[#0b0c10] p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <img src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="w-12 h-12 rounded-full mr-4" />
                                                <p className="font-bold">{user.name}</p>
                                            </div>
                                            <button onClick={() => onFriendRequest(user.id)} className="bg-[#FFD700] text-black text-sm font-semibold rounded-full px-4 py-1 hover:bg-yellow-300 transition-colors">
                                                + Agregar
                                            </button>
                                        </li>
                                    )) : <p className="text-gray-400 text-center">No se encontraron usuarios.</p>}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Friends;

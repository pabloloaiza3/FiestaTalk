import React, { useState, useEffect, useRef } from 'react';
import type { Event, View, User, ChatMessage, Participant } from '../types';

// --- ICONS ---
const MicOnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
const MicOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.586 15.586a7 7 0 01-9.172 0L3 12.001M19 11a7 7 0 00-7-7m0 0a7 7 0 00-7 7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5l14 14" /></svg>;
const VideoOnIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const VideoOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>;
const HangUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 9c-1.6 0-3.15.25-4.62.72v3.1c0 .43-.2.83-.52 1.12-1.18 1.05-2.03 2.39-2.38 3.86h15c-.35-1.47-1.2-2.81-2.38-3.86-.32-.29-.52-.69-.52-1.12v-3.1C15.15 9.25 13.6 9 12 9z" opacity=".3"/><path d="M12 9c1.6 0 3.15.25 4.62.72v3.1c0 .43.2.83.52 1.12 1.18 1.05 2.03 2.39 2.38 3.86h-15c.35-1.47 1.2-2.81 2.38-3.86.32-.29.52-.69.52-1.12v-3.1C8.85 9.25 10.4 9 12 9zM4.52 21.5h15c.35-1.47 1.2-2.81 2.38-3.86.32-.29.52-.69.52-1.12v-3.1C20.08 12.48 16.5 11 12 11s-8.08 1.48-9.92 2.42v3.1c0 .43.2.83.52 1.12 1.18 1.05 2.03 2.39 2.38 3.86zM4.52 21.5h15c-.35-1.47-1.2-2.81-2.38-3.86-.32-.29.52-.69.52-1.12v-3.1C19.92 14.52 16.35 13 12 13s-7.92 1.52-9.92 2.42v3.1c0 .43.2.83.52 1.12 1.18 1.05 2.03 2.39 2.38 3.86z" transform="rotate(135 12 12)"/></svg>;
const ScreenShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const HeadphonesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 8v5a4 4 0 01-4 4H8a4 4 0 01-4-4V8a2 2 0 012-2h12a2 2 0 012 2zM9 19v-2m6 2v-2" /></svg>;
const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" /></svg>;
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>;

// --- INTERFACES ---
interface CallRoomProps {
    event: Event;
    currentUser: User;
    onNavigate: (view: View, data?: any) => void;
    onFriendRequest: (recipientId: number) => void;
}

type ParticipantWithStatus = Participant & { micOn: boolean; cameraOn: boolean };
type SidebarTab = 'participants' | 'chat';

// --- MAIN COMPONENT ---
const CallRoom: React.FC<CallRoomProps> = ({ event, currentUser, onNavigate, onFriendRequest }) => {
    
    // --- STATE MANAGEMENT ---
    const [participants, setParticipants] = useState<ParticipantWithStatus[]>([]);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [activeSpeakerId, setActiveSpeakerId] = useState<number | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [activeTab, setActiveTab] = useState<SidebarTab>('chat');
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    // NEW NOTIFICATION STATE
    const [newMessage, setNewMessage] = useState<ChatMessage | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // --- EFFECTS ---
    // Initialize participant statuses and simulate activity
    useEffect(() => {
        setParticipants(event.participants.map(p => ({
            ...p,
            micOn: p.id === currentUser.id ? true : Math.random() > 0.3,
            cameraOn: p.id === currentUser.id ? true : Math.random() > 0.2,
        })));

        // Simulate initial chat messages
        setMessages([
            { id: 1, userId: event.hostId, userName: event.moderator.replace('Anfitrión: ', ''), userAvatar: 'https://i.pravatar.cc/150?u=javier@host.com', text: `¡Hola a todos y bienvenidos a "${event.title}"! Espero que se diviertan.`, timestamp: new Date(Date.now() - 60000).toISOString() },
            { id: 2, userId: currentUser.id, userName: 'Ana Torres', userAvatar: 'https://i.pravatar.cc/150?u=ana@user.com', text: '¡Hola! Qué ganas de empezar 😊', timestamp: new Date().toISOString() }
        ]);

        // Simulate active speaker
        const speakerInterval = setInterval(() => {
            const potentialSpeakers = event.participants;
            if (potentialSpeakers.length > 0) {
                const randomSpeaker = potentialSpeakers[Math.floor(Math.random() * potentialSpeakers.length)];
                setActiveSpeakerId(randomSpeaker.id);
            }
        }, 3000);

        return () => clearInterval(speakerInterval);
    }, [event.participants, event.title, event.hostId, event.moderator, currentUser.id]);

    // Simulate receiving new messages to trigger notifications
    useEffect(() => {
        const messageInterval = setInterval(() => {
            if (activeTab === 'chat') return; // Don't send notifications if chat is open

            const otherParticipants = event.participants.filter(p => p.id !== currentUser.id);
            if (otherParticipants.length > 0) {
                const randomSender = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
                
                const sampleMessages = [
                    `¡Hola a todos! ¿Qué tal?`,
                    `Este evento está genial.`,
                    `¿Alguien ha visto la última película de...?`,
                    `Me encanta este tema.`,
                    `Saludos desde mi casa.`
                ];
                const randomText = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

                const incomingMessage: ChatMessage = {
                    id: Date.now(),
                    userId: randomSender.id,
                    userName: randomSender.name,
                    userAvatar: randomSender.avatarUrl,
                    text: randomText,
                    timestamp: new Date().toISOString(),
                };

                setMessages(prev => [...prev, incomingMessage]);
                setNewMessage(incomingMessage);
                setShowToast(true);
                setUnreadCount(prev => prev + 1);

                setTimeout(() => {
                    setShowToast(false);
                    // Do not set newMessage to null here, so the toast can fade out gracefully
                }, 5000);
            }
        }, 15000); // New message every 15 seconds

        return () => clearInterval(messageInterval);
    }, [event.participants, currentUser.id, activeTab]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    // --- HELPERS & HANDLERS ---
    const getGridClass = (count: number): string => {
        if (count <= 1) return 'grid-cols-1';
        if (count <= 4) return 'grid-cols-2';
        if (count <= 9) return 'grid-cols-3';
        return 'grid-cols-4';
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (chatInput.trim() === '') return;

        const newMessage: ChatMessage = {
            id: messages.length + 1,
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`,
            text: chatInput,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, newMessage]);
        setChatInput('');
    };
    
    // NEW: Handle tab switching and clear notifications
    const handleTabChange = (tab: SidebarTab) => {
        if (tab === 'chat') {
            setUnreadCount(0);
        }
        setActiveTab(tab);
    }

    const host = participants.find(p => p.id === event.hostId);
    const otherParticipants = participants.filter(p => p.id !== event.hostId);
    const sortedParticipants = [host, ...otherParticipants].filter(Boolean) as ParticipantWithStatus[];

    // --- RENDER ---
    return (
        <section className="h-screen w-screen bg-cover bg-center flex" style={{ backgroundImage: `url(${event.imageUrl})` }}>
            <div className="h-full w-full flex flex-col bg-[#0b0c10]/80 backdrop-blur-md relative">
                
                <main className="flex-grow flex p-4 gap-4 overflow-hidden">
                    {/* Video Grid */}
                    <div className="flex-grow flex flex-col gap-4">
                        <div className={`flex-grow grid ${getGridClass(participants.length)} gap-4`}>
                            {participants.map(p => (
                                <div key={p.id} className={`relative bg-[#1f2833] rounded-lg overflow-hidden transition-all duration-300 ${p.id === activeSpeakerId ? 'ring-4 ring-green-500' : ''}`}>
                                    { (p.id === currentUser.id ? isCameraOn : p.cameraOn) ? (
                                        <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#2f3136]">
                                            <img src={p.avatarUrl} alt={p.name} className="w-24 h-24 rounded-full opacity-50" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-2 left-3 text-white font-semibold text-sm">{p.name}</div>
                                    <div className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full">
                                        {(p.id === currentUser.id ? isMicOn : p.micOn) ? <MicOnIcon /> : <MicOffIcon />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex-shrink-0 flex justify-center items-center gap-2 p-2 bg-[#18191c]/80 rounded-full self-center">
                            <button onClick={() => setIsMicOn(!isMicOn)} className={`p-3 rounded-full transition-colors ${isMicOn ? 'bg-[#2f3136] hover:bg-[#40444b]' : 'bg-red-600'}`}>
                                {isMicOn ? <MicOnIcon /> : <MicOffIcon />}
                            </button>
                             <button onClick={() => setIsCameraOn(!isCameraOn)} className={`p-3 rounded-full transition-colors ${isCameraOn ? 'bg-[#2f3136] hover:bg-[#40444b]' : 'bg-red-600'}`}>
                                {isCameraOn ? <VideoOnIcon /> : <VideoOffIcon />}
                            </button>
                            <button className="p-3 bg-[#2f3136] hover:bg-[#40444b] rounded-full transition-colors">
                                <ScreenShareIcon />
                            </button>
                             <button className="p-3 bg-[#2f3136] hover:bg-[#40444b] rounded-full transition-colors">
                                <HeadphonesIcon />
                            </button>
                            <button onClick={() => onNavigate('rateHost', event)} className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                                <HangUpIcon />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-[340px] flex-shrink-0 bg-[#18191c]/80 rounded-lg flex flex-col overflow-hidden">
                        <div className="flex-shrink-0 flex border-b border-gray-700">
                             <button onClick={() => handleTabChange('participants')} className={`flex-1 p-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === 'participants' ? 'bg-[#5865F2] text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                                <UsersIcon /> PARTICIPANTES ({participants.length})
                            </button>
                            <button onClick={() => handleTabChange('chat')} className={`relative flex-1 p-3 text-sm font-semibold flex items-center justify-center gap-2 ${activeTab === 'chat' ? 'bg-[#5865F2] text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
                               <ChatBubbleIcon /> CHAT
                               {unreadCount > 0 && (
                                   <span className="absolute top-2 right-2 flex items-center justify-center h-5 w-5 bg-red-600 text-white text-xs rounded-full">
                                       {unreadCount}
                                   </span>
                               )}
                            </button>
                        </div>
                        
                        {/* Participants List */}
                        {activeTab === 'participants' && (
                            <div className="flex-grow p-4 overflow-y-auto space-y-3">
                                <h3 className="text-xs font-bold text-gray-400 uppercase">Anfitrión</h3>
                                {host && (
                                     <div className="flex items-center gap-3">
                                        <img src={host.avatarUrl} alt={host.name} className="w-8 h-8 rounded-full" />
                                        <span className="font-semibold text-gray-200">{host.name}</span>
                                        <div className={`ml-auto flex gap-2 text-gray-400 ${host.micOn ? 'text-green-400' : ''}`}><MicOnIcon /></div>
                                        <div className={`text-gray-400 ${host.cameraOn ? 'text-green-400' : ''}`}><VideoOnIcon /></div>
                                    </div>
                                )}
                                <h3 className="text-xs font-bold text-gray-400 uppercase pt-2">Participantes</h3>
                                {otherParticipants.map(p => (
                                    <div key={p.id} className="flex items-center gap-3">
                                        <img src={p.avatarUrl} alt={p.name} className="w-8 h-8 rounded-full" />
                                        <span className="font-semibold text-gray-200">{p.name}</span>
                                        <div className={`ml-auto flex gap-2 text-gray-400 ${p.micOn ? 'text-green-400' : ''}`}><MicOnIcon /></div>
                                        <div className={`text-gray-400 ${p.cameraOn ? 'text-green-400' : ''}`}><VideoOnIcon /></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Chat */}
                        {activeTab === 'chat' && (
                           <div className="flex-grow p-4 flex flex-col overflow-y-auto">
                                <div className="flex-grow space-y-4 pr-2">
                                    {messages.map((msg, index) => (
                                        <div key={msg.id} className={`flex items-start gap-3 ${index === 0 ? '' : 'mt-4'}`}>
                                            <img src={msg.userAvatar} alt={msg.userName} className="w-10 h-10 rounded-full mt-1" />
                                            <div>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="font-bold text-[#FFD700] text-sm">{msg.userName}</span>
                                                    <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>
                                                <p className="text-gray-200 text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                                <form onSubmit={handleSendMessage} className="flex-shrink-0 mt-4 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Escribe un mensaje..."
                                        className="flex-grow bg-[#2f3136] rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5865F2]"
                                    />
                                    <button type="submit" className="bg-[#5865F2] p-2 rounded-full text-white hover:bg-blue-500 transition-colors">
                                        <SendIcon />
                                    </button>
                                </form>
                           </div>
                        )}
                    </aside>
                </main>

                {/* NEW: Toast Notification */}
                {showToast && newMessage && (
                    <div className="absolute bottom-24 right-4 bg-[#2f3136] p-4 rounded-lg shadow-lg text-white w-80 animate-fade-in-up z-20">
                        <div className="flex items-start gap-3">
                            <img src={newMessage.userAvatar} alt={newMessage.userName} className="w-10 h-10 rounded-full" />
                            <div>
                                <p className="font-bold text-sm text-[#FFD700]">{newMessage.userName}</p>
                                <p className="text-sm text-gray-200 truncate">{newMessage.text}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CallRoom;
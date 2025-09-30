import React, { useState } from 'react';
import type { Event, View, User } from '../types';

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.5 5.5a3 3 0 00-3 0V12a2 2 0 00-2 2v1a2 2 0 002 2h6a2 2 0 002-2v-1a2 2 0 00-2-2v-.5a3 3 0 00-3 0z" />
        <path d="M16 6a3 3 0 11-6 0 3 3 0 016 0zM12 11.5a3 3 0 013 3V16a2 2 0 01-2 2h-1.5a3 3 0 01-3-3v-.5a3 3 0 013-3z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88A9.962 9.962 0 0022 12z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.128 0c0 1.14-.925 2.065-2.065 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.133 2 12.75 2h.08zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
  </svg>
);


interface EventDetailProps {
  event: Event;
  onNavigate: (view: View, data?: any) => void;
  user: User | null;
  onAuthRequired: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onNavigate, user, onAuthRequired }) => {
    const [showShareOptions, setShowShareOptions] = useState(false);
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = eventDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const isEnrolled = user?.enrolledEventIds.includes(event.id);
    const isFull = event.participants.length >= event.maxPlayers;

    const handleJoinClick = () => {
        if (!user) {
            onAuthRequired();
        } else if (isEnrolled) {
            onNavigate('waitingRoom', event);
        } else if (!isFull) {
            onNavigate('payment', event);
        }
    };
    
    const getButtonState = () => {
        if (isFull && !isEnrolled) {
            return { text: 'Evento Lleno', disabled: true };
        }
        if (isEnrolled) {
            return { text: 'Ir a la Sala de Espera', disabled: false };
        }
        if (!user) {
            return { text: 'Iniciar Sesión para Unirse', disabled: false };
        }
        return { text: '¡Quiero Unirme!', disabled: false };
    };

    const buttonState = getButtonState();
    const shareUrl = window.location.href;
    const shareText = `¡Únete a este increíble evento en FiestaTalk: "${event.title}"!`;

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <button onClick={() => onNavigate('home')} className="mb-8 text-sm text-[#FFD700] hover:underline">
                    &larr; Volver a todos los eventos
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-3">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-auto object-cover rounded-lg shadow-2xl mb-8" />
                        <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>
                        <p className="text-lg text-gray-300">{event.description}</p>
                    </div>
                    
                    {/* Right Column (Sidebar) */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1f2833] rounded-lg p-8 shadow-lg sticky top-28">
                            <div className="flex items-center text-gray-300 mb-4">
                                <CalendarIcon />
                                <div>
                                    <p className="font-semibold text-white">{formattedDate}</p>
                                    <p className="text-sm">{formattedTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-gray-300 mb-4">
                                <ClockIcon />
                                <p className="font-semibold text-white">{event.duration}</p>
                            </div>
                            <div className="flex items-center text-gray-300 mb-6">
                                <UsersIcon />
                                <p className="font-semibold text-white">{event.players}</p>
                            </div>
                            
                            <div className="border-t border-gray-700 pt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xl font-bold">Precio:</span>
                                    <span className="text-3xl font-extrabold text-[#FFD700]">{event.price}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleJoinClick}
                                        disabled={buttonState.disabled}
                                        className="flex-grow bg-[#FFD700] text-black font-bold rounded-full px-8 py-4 text-lg hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
                                    >
                                        {buttonState.text}
                                    </button>
                                    <button
                                        onClick={() => setShowShareOptions(!showShareOptions)}
                                        className="flex-shrink-0 bg-transparent border-2 border-gray-600 text-gray-300 p-4 rounded-full hover:bg-gray-700 hover:border-gray-500 transition-colors"
                                        aria-label="Compartir evento"
                                    >
                                        <ShareIcon />
                                    </button>
                                </div>
                                {showShareOptions && (
                                    <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                                        <p className="text-sm text-gray-400 mb-4">Compartir en redes sociales:</p>
                                        <div className="flex justify-center gap-6">
                                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                <XIcon />
                                            </a>
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                <FacebookIcon />
                                            </a>
                                            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(event.title)}&summary=${encodeURIComponent(event.description)}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                                <LinkedInIcon />
                                            </a>
                                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="Compartir en Instagram">
                                                <InstagramIcon />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participants Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-6">Participantes ({event.participants.length}/{event.maxPlayers})</h2>
                    <div className="flex flex-wrap gap-4">
                        {event.participants.map(p => (
                            <div key={p.name} className="flex items-center flex-col text-center" title={p.name}>
                                <img src={p.avatarUrl} alt={p.name} className="w-16 h-16 rounded-full border-2 border-gray-600 mb-2"/>
                                <span className="text-sm text-gray-400 w-20 truncate">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventDetail;
import React, { useState, useEffect, useRef } from 'react';

// Component Imports
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Events from './components/Events';
import AboutUs from './components/AboutUs';
import HostCTA from './components/HostCTA';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import EventDetail from './components/EventDetail';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import CreateEvent from './components/CreateEvent';
import AuthModal from './components/AuthModal';
import Payment from './components/Payment';
import WaitingRoom from './components/WaitingRoom';
import CallRoom from './components/CallRoom';
import Friends from './components/Friends';
import RateHost from './components/RateHost';
import HelpModal from './components/HelpModal';
import AdminPanel from './components/AdminPanel';

// Data and Type Imports
import { USERS_DATA, EVENTS_DATA } from './constants';
import type { View, User, Event, UserCredentials, NewUser, NewEventData, Rating, Participant } from './types';

// Helper to parse duration string (e.g., "2.5 Horas") into milliseconds
const parseDurationToMs = (durationStr: string): number => {
    if (!durationStr) return 300000; // Default 5 minutes

    const numericValue = parseFloat(durationStr.replace(',', '.'));
    if (isNaN(numericValue)) return 300000;

    const lowerCaseDuration = durationStr.toLowerCase();

    if (lowerCaseDuration.includes('hora')) {
        return numericValue * 60 * 60 * 1000;
    } else if (lowerCaseDuration.includes('minuto')) {
        return numericValue * 60 * 1000;
    }
    
    return 300000; // Default 5 minutes if unit is unknown
};

const AccessDenied = ({ onNavigate }: { onNavigate: (view: View) => void; }) => (
    <div className="text-center py-40 px-4 min-h-screen">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Acceso Restringido</h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">Esta página y sus funcionalidades están reservadas exclusivamente para administradores.</p>
        <button 
            onClick={() => onNavigate('home')} 
            className="bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 hover:bg-yellow-300 transition-colors"
        >
            Volver al Inicio
        </button>
    </div>
);


function App() {
  const [view, setView] = useState<View>('home');
  const [activeData, setActiveData] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(USERS_DATA);
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const savedEvents = localStorage.getItem('fiestaTalkEvents');
      return savedEvents ? JSON.parse(savedEvents) : EVENTS_DATA;
    } catch (error) {
      console.error("Failed to parse events from localStorage", error);
      return EVENTS_DATA;
    }
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [seenEventIds, setSeenEventIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('seenEventIds');
    return saved ? JSON.parse(saved) : [];
  });
  const [eventToRate, setEventToRate] = useState<Event | null>(null);
  const callEndTimerRef = useRef<number | null>(null);

  useEffect(() => {
    localStorage.setItem('seenEventIds', JSON.stringify(seenEventIds));
  }, [seenEventIds]);

  useEffect(() => {
    localStorage.setItem('fiestaTalkEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    if (eventToRate) {
      if (!currentUser) {
        handleNavigate('login');
      } else {
        handleNavigate('rateHost', eventToRate);
      }
    }
  }, [eventToRate, currentUser]);

  const handleNavigate = (newView: View, data: any = null) => {
    if (view === 'callRoom' && newView !== 'callRoom' && callEndTimerRef.current) {
        clearTimeout(callEndTimerRef.current);
        callEndTimerRef.current = null;
    }

    setView(newView);
    setActiveData(data);
    setShowAuthModal(false);
    setShowHelpModal(false);
    window.scrollTo(0, 0);

    if (newView === 'eventDetail' && data?.id && !seenEventIds.includes(data.id)) {
      setSeenEventIds(prev => [...prev, data.id]);
    }
    if (newView === 'callRoom' && data?.duration) {
        const eventDurationMs = parseDurationToMs(data.duration);
        callEndTimerRef.current = window.setTimeout(() => {
            setEventToRate(data);
            callEndTimerRef.current = null;
        }, eventDurationMs);
    }
  };
  
  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const handleLogin = (credentials: UserCredentials): boolean => {
    const user = users.find(u => u.email === credentials.email && u.passwordHash === credentials.password);
    if (user) {
      setCurrentUser(user);
      if (user.role === 'admin') {
        handleNavigate('adminPanel');
      } else if (eventToRate) {
        setView('rateHost');
        setActiveData(eventToRate);
        setEventToRate(null);
      } else {
        handleNavigate('home');
      }
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    handleNavigate('home');
  };
  
  const handleRegister = (newUser: NewUser): boolean => {
    if (users.some(u => u.email === newUser.email)) {
      return false; // Email already exists
    }
    const user: User = {
      ...newUser,
      id: users.length + 1,
      passwordHash: newUser.password, // Storing plain text for demo purposes
      enrolledEventIds: [],
      friends: [],
      friendRequestsSent: [],
      friendRequestsReceived: [],
    };
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
    handleNavigate('home');
    return true;
  };

  const handleConfirmPayment = () => {
    if (!currentUser || !activeData) return;
    
    const eventId = activeData.id;

    const updatedUser = {
      ...currentUser,
      enrolledEventIds: [...currentUser.enrolledEventIds, eventId],
    };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));

    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        const newParticipants = [...e.participants, { id: currentUser.id, name: currentUser.name, avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}` }];
        return {
          ...e,
          participants: newParticipants,
          players: `${newParticipants.length}/${e.maxPlayers} Jugadores`,
        };
      }
      return e;
    });
    setEvents(updatedEvents);
    handleNavigate('waitingRoom', updatedEvents.find(e => e.id === eventId));
  };
  
  const handleAddEvent = (eventData: NewEventData) => {
    if (!currentUser) {
      alert("Error: Debes iniciar sesión para crear un evento.");
      handleNavigate('login');
      return;
    }
    if (currentUser.role !== 'host') {
      alert("Error: Solo los anfitriones pueden crear eventos.");
      return;
    }

    try {
      if (!eventData.date || isNaN(new Date(eventData.date).getTime())) {
        alert('La fecha y hora proporcionadas no son válidas. Por favor, usa el formato correcto.');
        return;
      }
      const eventDate = new Date(eventData.date);

      const hostAsParticipant: Participant = {
          id: currentUser.id,
          name: currentUser.name,
          avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`
      };
      
      const newParticipants = [hostAsParticipant];

      const newEvent: Event = {
        id: (events.length > 0 ? Math.max(...events.map(e => e.id)) : 0) + 1,
        hostId: currentUser.id,
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        imageUrl: eventData.imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
        date: eventDate.toISOString(),
        duration: eventData.duration,
        price: eventData.price,
        moderator: `Anfitrión: ${currentUser.name}`,
        maxPlayers: eventData.maxPlayers,
        participants: newParticipants,
        players: `${newParticipants.length}/${eventData.maxPlayers} Jugadores`,
      };

      setEvents(prev => [...prev, newEvent]);
      alert('¡Evento creado exitosamente!');
      handleNavigate('home');
    } catch (error) {
      console.error("Error creating event:", error);
      alert('Hubo un error al crear el evento. Revisa que todos los datos sean correctos.');
    }
  };

  const handleFriendRequest = (recipientId: number) => {
    if (!currentUser) return;

    setUsers(users.map(u => u.id === recipientId ? {...u, friendRequestsReceived: [...u.friendRequestsReceived, currentUser.id]} : u));
    
    const updatedSender = {...currentUser, friendRequestsSent: [...currentUser.friendRequestsSent, recipientId]};
    setCurrentUser(updatedSender);
    setUsers(users.map(u => u.id === currentUser.id ? updatedSender : u));
  };
  
  const handleFriendResponse = (senderId: number, accepted: boolean) => {
    if (!currentUser) return;
    
    let updatedCurrentUser = {
      ...currentUser,
      friendRequestsReceived: currentUser.friendRequestsReceived.filter(id => id !== senderId),
    };

    if (accepted) {
      updatedCurrentUser.friends = [...updatedCurrentUser.friends, senderId];
      setUsers(users.map(u => u.id === senderId ? {...u, friends: [...u.friends, currentUser.id], friendRequestsSent: u.friendRequestsSent.filter(id => id !== currentUser.id)} : u));
    }
    
    setCurrentUser(updatedCurrentUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedCurrentUser : u));
  };

  const handleRateHost = (hostId: number, rating: Omit<Rating, 'userId' | 'userName'>) => {
    if (!currentUser) return;

    setUsers(users.map(u => {
      if (u.id === hostId) {
        const newRating: Rating = {
          ...rating,
          userId: currentUser.id,
          userName: currentUser.name,
        };
        return { ...u, ratings: [...(u.ratings || []), newRating] };
      }
      return u;
    }));

    handleNavigate('home');
    setEventToRate(null);
  };
  
  const handleDeleteEvent = (eventId: number) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleDeleteUser = (userId: number) => {
    if (currentUser && currentUser.id === userId) {
      alert("No puedes eliminar tu propia cuenta de administrador.");
      return;
    }
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const renderView = () => {
    if (view === 'adminPanel' && currentUser?.role !== 'admin') {
      return <AccessDenied onNavigate={handleNavigate} />;
    }

    switch (view) {
      case 'eventDetail': return <EventDetail event={activeData} onNavigate={handleNavigate} user={currentUser} onAuthRequired={handleAuthRequired} />;
      case 'registerUser': return <Register onNavigate={handleNavigate} onRegister={handleRegister} isHost={false} />;
      case 'registerHost': return <Register onNavigate={handleNavigate} onRegister={handleRegister} isHost={true} />;
      case 'login': return <Login onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'profile': return currentUser && <Profile user={currentUser} onNavigate={handleNavigate} onLogout={handleLogout} events={events} users={users} />;
      case 'createEvent': return <CreateEvent onNavigate={handleNavigate} onAddEvent={handleAddEvent} />;
      case 'payment': return <Payment event={activeData} onNavigate={handleNavigate} onConfirmPayment={handleConfirmPayment} />;
      case 'waitingRoom': return <WaitingRoom event={activeData} onNavigate={handleNavigate} />;
      case 'callRoom': return currentUser && <CallRoom event={activeData} currentUser={currentUser} onNavigate={handleNavigate} onFriendRequest={handleFriendRequest} />;
      case 'friends': return currentUser && <Friends currentUser={currentUser} allUsers={users} onNavigate={handleNavigate} onFriendRequest={handleFriendRequest} onFriendResponse={handleFriendResponse} />;
      case 'rateHost': return <RateHost event={activeData} host={users.find(u => u.id === activeData.hostId)} onRateHost={handleRateHost} onNavigate={handleNavigate} />;
      case 'adminPanel': return currentUser && <AdminPanel currentUser={currentUser} events={events} users={users} onDeleteEvent={handleDeleteEvent} onDeleteUser={handleDeleteUser} onLogout={handleLogout} />;
      case 'home':
      default:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <HowItWorks />
            <Events events={events} onNavigate={handleNavigate} seenEventIds={seenEventIds} currentUser={currentUser} />
            <AboutUs />
            <HostCTA onNavigate={handleNavigate} user={currentUser} />
            <Testimonials />
            <FinalCTA onNavigate={handleNavigate} />
          </>
        );
    }
  };

  const isFullScreenView = ['adminPanel', 'callRoom', 'waitingRoom', 'login', 'registerUser', 'registerHost'].includes(view);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen font-sans">
      {!isFullScreenView && <Header onNavigate={handleNavigate} user={currentUser} onLogout={handleLogout} onShowHelp={() => setShowHelpModal(true)} />}
      <main>
        {renderView()}
      </main>
      {view === 'home' && <Footer />}
      {showAuthModal && <AuthModal onNavigate={handleNavigate} onClose={() => setShowAuthModal(false)} />}
      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
    </div>
  );
}

export default App;
// Fix: Implement the full type definitions for the application.
// This resolves module and type errors across all components.
export type View =
  | 'home'
  | 'login'
  | 'registerUser'
  | 'registerHost'
  | 'profile'
  | 'friends'
  | 'eventDetail'
  | 'payment'
  | 'waitingRoom'
  | 'callRoom'
  | 'createEvent'
  | 'rateHost'
  | 'adminPanel';

export interface Rating {
  userId: number;
  userName: string;
  stars: number;
  comment?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  role: 'user' | 'host' | 'admin';
  bio?: string;
  enrolledEventIds: number[];
  friends: number[];
  friendRequestsSent: number[];
  friendRequestsReceived: number[];
  ratings?: Rating[];
}

export type NewUser = Omit<User, 'id' | 'passwordHash' | 'enrolledEventIds' | 'friends' | 'friendRequestsSent' | 'friendRequestsReceived' | 'ratings' | 'role'> & { password: string; role: 'user' | 'host' };

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Participant {
  id: number;
  name: string;
  avatarUrl: string;
  micOn?: boolean;
  cameraOn?: boolean;
}

export interface Event {
  id: number;
  hostId: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string; // ISO string
  duration: string;
  price: string;
  moderator: string;
  players: string; // "X/Y Jugadores"
  maxPlayers: number;
  participants: Participant[];
}

export interface NewEventData {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  duration: string;
  price: string;
  maxPlayers: number;
}

export interface ChatMessage {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string; // ISO string
}
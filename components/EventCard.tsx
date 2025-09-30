import React from 'react';
import type { Event } from '../types';
import type { View } from '../types';

interface EventCardProps {
  event: Event;
  onNavigate: (view: View, data: Event) => void;
  isNew: boolean;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline-block" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
);

const EventCard: React.FC<EventCardProps> = ({ event, onNavigate, isNew }) => {
  const isFree = event.price.toLowerCase() === 'gratis';
  return (
    <div 
      className="bg-[#1f2833] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transform hover:-translate-y-2 transition-all duration-300 text-left cursor-pointer flex flex-col relative"
      onClick={() => onNavigate('eventDetail', event)}
    >
      {isNew && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full z-10">
          Nuevo
        </div>
      )}
      <img src={event.imageUrl} alt={event.title} className="w-full h-[180px] object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-[#FFD700] uppercase mb-1">{event.category}</p>
        <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-4 flex-grow">{event.moderator}</p>
        
        <div className="flex justify-between items-center text-sm text-gray-300 border-t border-gray-700 pt-4 mt-auto">
          <span className="flex items-center"><UserIcon /> {event.players}</span>
          <span className="flex items-center"><ClockIcon /> {event.duration}</span>
          <span className={`font-bold text-base ${isFree ? 'text-green-400' : 'text-white'}`}>{event.price}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

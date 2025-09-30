import React from 'react';
// Fix: Corrected import path for View type.
import type { View } from '../types';
import type { User } from '../types';

interface HostCTAProps {
    onNavigate: (view: View) => void;
    user: User | null;
}

const HostCTA: React.FC<HostCTAProps> = ({ onNavigate, user }) => {
  
  const handleHostClick = () => {
    if (user) {
      // If user is logged in, navigate to create event page
      onNavigate('createEvent');
    } else {
      // If not logged in, navigate to host registration page
      onNavigate('registerHost');
    }
  };

  return (
    <section className="bg-cover bg-center bg-fixed py-20 sm:py-28 px-4 relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80')" }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">Conviértete en Anfitrión</h2>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-8">
          Crea tus propias experiencias, comparte tus pasiones y genera ingresos. Te damos las herramientas, tú pones la magia.
        </p>
        <button
          className="bg-transparent border-2 border-[#FFD700] text-[#FFD700] font-bold rounded-full px-10 py-4 text-lg hover:bg-[#FFD700] hover:text-black transition-all duration-300 transform hover:scale-105"
          onClick={handleHostClick}
        >
          Quiero ser Anfitrión
        </button>
      </div>
    </section>
  );
};

export default HostCTA;

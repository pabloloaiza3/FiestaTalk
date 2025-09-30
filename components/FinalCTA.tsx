import React from 'react';
// Fix: Corrected import path for View type.
import type { View } from '../types';

interface FinalCTAProps {
    onNavigate: (view: View) => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="text-center py-20 sm:py-28 px-4 bg-[#0e1018]">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          ¿Listo para empezar la fiesta?
        </h2>
        <button 
            className="bg-[#FFD700] text-black font-bold rounded-full px-10 py-4 text-lg hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105"
            onClick={() => onNavigate('registerUser')}
        >
          Crear mi cuenta gratis
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;

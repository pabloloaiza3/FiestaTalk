import React from 'react';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
);

const VideoCameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="pt-0 pb-20 px-4 sm:px-8 bg-[#0b0c10]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">¿Cómo Funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1f2833] text-[#FFD700] rounded-full p-6 mb-6">
              <SearchIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">1. Explora Eventos</h3>
            <p className="text-gray-400">
              Navega por una variedad de temas, desde misterios hasta debates filosóficos. Encuentra la conversación que te apasione.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1f2833] text-[#FFD700] rounded-full p-6 mb-6">
                <TicketIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">2. Reserva tu Lugar</h3>
            <p className="text-gray-400">
              Los cupos son limitados para garantizar conversaciones de calidad. ¡Asegura tu participación con unos pocos clics!
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-[#1f2833] text-[#FFD700] rounded-full p-6 mb-6">
              <VideoCameraIcon />
            </div>
            <h3 className="text-xl font-bold mb-2">3. Únete y Conecta</h3>
            <p className="text-gray-400">
              A la hora del evento, únete a la sala de video. Prepárate para una experiencia moderada, segura y llena de descubrimientos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
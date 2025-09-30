import React from 'react';
// Fix: Corrected import path for View type.
import type { View } from '../types';

// SVG Icon components
const XIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049 1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.133 2 12.75 2h.08zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.128 0c0 1.14-.925 2.065-2.065 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88A9.962 9.962 0 0022 12z" clipRule="evenodd" />
  </svg>
);


interface HeroProps {
    onNavigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleScrollToEvents = () => {
    document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="text-center py-20 sm:py-28 lg:py-40 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          Conversaciones que Conectan.
        </h2>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-8">
          Únete a video-fiestas temáticas, conoce gente nueva y vive experiencias inolvidables, todo desde la comodidad de tu casa.
        </p>
        <button 
            onClick={handleScrollToEvents}
            className="bg-[#FFD700] text-black font-bold rounded-full px-10 py-4 text-lg hover:bg-yellow-300 transition-transform duration-300 transform hover:scale-105 inline-block"
        >
          ¡Únete a la Fiesta!
        </button>

        <div className="flex justify-center gap-6 mt-8">
          <a href="#" aria-label="X" className="w-8 h-8 text-white hover:text-[#FFD700] transition-all duration-300 transform hover:scale-110">
            <XIcon />
          </a>
          <a href="#" aria-label="Instagram" className="w-8 h-8 text-white hover:text-[#FFD700] transition-all duration-300 transform hover:scale-110">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="LinkedIn" className="w-8 h-8 text-white hover:text-[#FFD700] transition-all duration-300 transform hover:scale-110">
            <LinkedInIcon />
          </a>
          <a href="#" aria-label="Facebook" className="w-8 h-8 text-white hover:text-[#FFD700] transition-all duration-300 transform hover:scale-110">
            <FacebookIcon />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
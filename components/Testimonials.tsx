import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Lo que dicen nuestros anfitriones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div key={testimonial.id} className="bg-[#1f2833] p-8 rounded-lg shadow-lg">
              <p className="text-gray-300 italic mb-6">"{testimonial.quote}"</p>
              <div className="text-right">
                <p className="font-bold text-lg text-white">{testimonial.author}</p>
                <p className="text-sm text-[#FFD700]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-[#2dd4bf] text-white font-semibold rounded-full px-8 py-3 hover:opacity-90 transition-opacity duration-300 shadow-lg shadow-teal-500/20">
            Descubre los Beneficios Premium
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

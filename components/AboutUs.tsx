import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="py-20 px-4 sm:px-8 bg-[#0b0c10]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sobre Nosotros</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-300">
          En FiestaTalk, creemos en el poder de las conversaciones para crear conexiones humanas auténticas. Nacimos de la idea de que, sin importar dónde estés, siempre puedes encontrar un espacio para compartir, debatir, aprender y reír con personas de intereses similares. Nuestra misión es romper las barreras de la distancia, ofreciendo una plataforma segura, vibrante e inclusiva para experiencias grupales inolvidables.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;

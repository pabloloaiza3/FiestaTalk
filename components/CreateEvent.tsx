import React, { useState, FormEvent, ChangeEvent } from 'react';
import type { View } from '../types';
import type { NewEventData } from '../types';
import { GoogleGenAI } from '@google/genai';
import { EVENT_CATEGORIES } from '../constants';

interface CreateEventProps {
  onNavigate: (view: View, data?: any) => void;
  onAddEvent: (eventData: NewEventData) => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onNavigate, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newEventData: NewEventData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      imageUrl: imageUrl,
      date: formData.get('date') as string,
      duration: formData.get('duration') as string,
      price: formData.get('price') as string,
      maxPlayers: parseInt(formData.get('players') as string, 10) || 0,
    };

    if (Object.values(newEventData).some(value => !value) || newEventData.maxPlayers <= 0) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    onAddEvent(newEventData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const generateDescription = async () => {
    if (!title) {
        alert('Por favor, introduce un título para el evento antes de generar la descripción.');
        return;
    }
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        const prompt = `Crea una descripción atractiva y detallada para un evento de video-fiesta en la plataforma FiestaTalk. El título del evento es "${title}". La descripción debe ser de aproximadamente 50-70 palabras, evocadora, e invitar a los usuarios a unirse. Debe explicar la premisa del evento y lo que los participantes pueden esperar.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        const text = response.text;
        
        const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
        if (descriptionInput) {
            descriptionInput.value = text;
        }

    } catch (error) {
        console.error("Error al generar la descripción:", error);
        alert("Hubo un error al generar la descripción. Por favor, inténtalo de nuevo.");
    } finally {
        setIsGenerating(false);
    }
  };

  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const minDateTime = now.toISOString().slice(0, 16);

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <button onClick={() => onNavigate('profile')} className="mb-8 text-sm text-[#FFD700] hover:underline">
          &larr; Volver a mi perfil
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center">Crear Nuevo Evento</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[#1f2833] p-8 rounded-lg">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Título del Evento</label>
            <input 
              type="text" 
              id="title" 
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" 
              placeholder="Ej: El Enigma del Faraón Dorado" 
              required
            />
          </div>
          
          <div>
             <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
             <div className="relative">
                <textarea 
                  id="description" 
                  name="description"
                  rows={4}
                  className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" 
                  placeholder="Describe la temática, la trama y lo que hace único a tu evento..."
                  required
                ></textarea>
                <button 
                  type="button" 
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="absolute bottom-3 right-3 bg-[#FFD700] text-black text-xs font-bold rounded-full px-3 py-1 hover:bg-yellow-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generando...' : '✨ Generar con IA'}
                </button>
             </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
              <select 
                id="category" 
                name="category" 
                defaultValue=""
                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" 
                required
              >
                <option value="" disabled>Selecciona una categoría</option>
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image-file" className="block text-sm font-medium text-gray-300 mb-2">Imagen del Evento</label>
              <input 
                type="file" 
                id="image-file" 
                name="image-file" 
                className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FFD700] file:text-black hover:file:bg-yellow-300"
                accept="image/*"
                onChange={handleImageChange}
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">Fecha y Hora</label>
              <input type="datetime-local" id="date" name="date" min={minDateTime} className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" required />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-300 mb-2">Duración</label>
              <input type="text" id="duration" name="duration" className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="Ej: 2.5 Horas" required/>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">Precio</label>
              <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="Ej: $5.000 CLP o Gratis" required />
            </div>
            <div>
              <label htmlFor="players" className="block text-sm font-medium text-gray-300 mb-2">Max. Jugadores</label>
              <input type="number" id="players" name="players" min="1" className="w-full bg-[#0b0c10] border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]" placeholder="8" required />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button type="submit" className="w-full sm:w-auto bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors">
              Crear Evento
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import RecommendedEvents from './RecommendedEvents';
import type { Event, User } from '../types';
import type { View } from '../types';
import { EVENT_CATEGORIES } from '../constants';

interface EventsProps {
    events: Event[];
    onNavigate: (view: View, data?: any) => void;
    seenEventIds: number[];
    currentUser: User | null;
}

const Events: React.FC<EventsProps> = ({ events, onNavigate, seenEventIds, currentUser }) => {
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'paid', 'free'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceFilter, categoryFilter]);

  const filteredEvents = events.filter(event => {
    // Search filter
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const searchMatch = searchTerm === '' || 
                        event.title.toLowerCase().includes(lowercasedSearchTerm) ||
                        event.category.toLowerCase().includes(lowercasedSearchTerm);

    // Price filter
    const priceMatch = priceFilter === 'all' || 
                       (priceFilter === 'free' && event.price.toLowerCase() === 'gratis') || 
                       (priceFilter === 'paid' && event.price.toLowerCase() !== 'gratis');
    
    // Category filter
    const categoryMatch = categoryFilter === 'all' || event.category === categoryFilter;

    return searchMatch && priceMatch && categoryMatch;
  });

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getFilterButtonStyle = (buttonFilter: string, activeFilter: string) => {
    return activeFilter === buttonFilter
      ? 'bg-[#FFD700] text-black'
      : 'bg-[#1f2833] text-white hover:bg-gray-700';
  };
  
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
        pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
        if (currentPage < 5) {
            pageNumbers = [1, 2, 3, 4, 5, '...', totalPages];
        } else if (currentPage > totalPages - 4) {
            pageNumbers = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }
    }
    
    return (
      <div className="flex justify-center items-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#1f2833] text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Página anterior"
        >
          &lt;
        </button>
        {pageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-[#FFD700] text-black font-bold'
                  : 'bg-[#1f2833] text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-4 py-2 text-gray-400">...</span>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#1f2833] text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Página siguiente"
        >
          &gt;
        </button>
      </div>
    );
  };


  return (
    <section id="events" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-[#0e1018]">
      <div className="container mx-auto">
        <RecommendedEvents
          events={events}
          currentUser={currentUser}
          onNavigate={onNavigate}
          seenEventIds={seenEventIds}
        />
        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Eventos / Salas</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <EventCard key={event.id} event={event} onNavigate={onNavigate} isNew={!seenEventIds.includes(event.id)} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-400">No se encontraron eventos con los filtros seleccionados.</p>
            </div>
           )}
        </div>

        {/* Pagination */}
        {renderPagination()}

        <div className="text-center mt-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Próximos Eventos</h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-8">
              Explora nuestra creciente selección de eventos y encuentra tu próxima conversación.
            </p>

            {/* Search Bar */}
            <div className="mb-12 max-w-2xl mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar eventos por título o categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0b0c10] border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] pl-12"
                        aria-label="Buscar eventos"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Filtrar por Categoría</h3>
              <div className="flex justify-center flex-wrap gap-2 sm:gap-3">
                 <button onClick={() => setCategoryFilter('all')} className={`font-semibold rounded-full px-4 py-2 text-sm transition-colors ${getFilterButtonStyle('all', categoryFilter)}`}>
                    Todas
                  </button>
                {EVENT_CATEGORIES.map(category => (
                   <button key={category} onClick={() => setCategoryFilter(category)} className={`font-semibold rounded-full px-4 py-2 text-sm transition-colors ${getFilterButtonStyle(category, categoryFilter)}`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filters */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-12 border-t border-gray-800 pt-8">
              <button onClick={() => setPriceFilter('all')} className={`font-bold rounded-full px-5 py-2 text-sm transition-colors ${getFilterButtonStyle('all', priceFilter)}`}>
                Todos
              </button>
              <button onClick={() => setPriceFilter('paid')} className={`font-bold rounded-full px-5 py-2 text-sm transition-colors ${getFilterButtonStyle('paid', priceFilter)}`}>
                De Pago
              </button>
              <button onClick={() => setPriceFilter('free')} className={`font-bold rounded-full px-5 py-2 text-sm transition-colors ${getFilterButtonStyle('free', priceFilter)}`}>
                Gratis
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
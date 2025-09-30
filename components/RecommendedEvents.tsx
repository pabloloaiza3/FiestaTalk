import React, { useMemo } from 'react';
import EventCard from './EventCard';
import type { Event, User, View } from '../types';

interface RecommendedEventsProps {
    events: Event[];
    currentUser: User | null;
    onNavigate: (view: View, data?: any) => void;
    seenEventIds: number[];
}

const RecommendedEvents: React.FC<RecommendedEventsProps> = ({ events, currentUser, onNavigate, seenEventIds }) => {
    const recommendedEvents = useMemo(() => {
        if (!currentUser || currentUser.enrolledEventIds.length === 0) {
            return [];
        }

        const enrolledEvents = events.filter(event => currentUser.enrolledEventIds.includes(event.id));
        const preferredCategories = new Set(enrolledEvents.map(event => event.category));

        return events
            .filter(event =>
                preferredCategories.has(event.category) &&
                !currentUser.enrolledEventIds.includes(event.id) &&
                event.hostId !== currentUser.id
            )
            .slice(0, 6); // Limit to 6 recommendations
    }, [events, currentUser]);

    if (recommendedEvents.length === 0) {
        return null;
    }

    return (
        <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-left">Recomendado para Ti</h2>
            <div className="flex overflow-x-auto space-x-8 pb-4">
                {recommendedEvents.map(event => (
                    <div key={event.id} className="flex-shrink-0 w-80">
                        <EventCard event={event} onNavigate={onNavigate} isNew={!seenEventIds.includes(event.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedEvents;

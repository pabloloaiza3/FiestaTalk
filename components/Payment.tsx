import React, { useState } from 'react';
import type { Event, View } from '../types';

interface PaymentProps {
    event: Event;
    onNavigate: (view: View, data?: any) => void;
    onConfirmPayment: () => void;
}

const Payment: React.FC<PaymentProps> = ({ event, onNavigate, onConfirmPayment }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call to payment gateway
        setTimeout(() => {
            console.log(`Simulating successful payment for "${event.title}"`);
            onConfirmPayment();
            // Navigation to waitingRoom is handled by App.tsx after enrollment
        }, 1500);
    };

    return (
        <section className="py-20 px-4 flex items-center justify-center min-h-screen">
            <div className="container mx-auto max-w-lg">
                <div className="bg-[#1f2833] p-8 rounded-lg shadow-lg w-full">
                    <button onClick={() => onNavigate('eventDetail', event)} className="mb-4 text-xs text-[#FFD700] hover:underline">
                        &larr; Volver a los detalles del evento
                    </button>
                    <h1 className="text-3xl font-bold mb-2 text-center text-white">Confirmar Reserva</h1>
                    <p className="text-center text-gray-400 mb-6">Estás a un paso de unirte a "{event.title}".</p>
                    
                    <div className="bg-[#0b0c10] p-6 rounded-lg mb-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">Evento:</span>
                            <span className="font-semibold text-right">{event.title}</span>
                        </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-300">Fecha:</span>
                            <span className="font-semibold text-right">{new Date(event.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                            <span className="text-lg text-gray-300">Total a Pagar:</span>
                            <span className="text-2xl font-bold text-[#FFD700]">{event.price}</span>
                        </div>
                    </div>
                    
                    {/* Simplified payment form */}
                    <form onSubmit={handlePayment}>
                         <p className="text-center text-sm text-gray-500 mb-2">Esto es una simulación de pago.</p>
                         <p className="text-center text-xs text-gray-600 mb-6">No se procesará ninguna transacción real.</p>

                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-[#FFD700] text-black font-bold rounded-full px-8 py-3 text-lg hover:bg-yellow-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {isProcessing ? 'Procesando Pago...' : `Pagar ${event.price}`}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Payment;

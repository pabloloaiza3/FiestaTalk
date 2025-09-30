import React from 'react';

interface HelpModalProps {
    onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-modal-title"
        >
            <div 
                className="bg-[#1f2833] p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Cerrar"
                >
                    <CloseIcon />
                </button>
                
                <h2 id="help-modal-title" className="text-3xl font-bold mb-6 text-center text-white">Centro de Ayuda de <span className="text-[#FFD700]">FiestaTalk</span></h2>
                
                <p className="text-center text-gray-300 mb-8">
                    ¡Bienvenido! Aquí te explicamos cómo sacar el máximo provecho de la plataforma.
                </p>

                <div className="space-y-6 text-gray-300 text-left">
                    <details className="bg-[#0b0c10] p-4 rounded-lg" open>
                        <summary className="font-semibold text-lg text-[#FFD700] cursor-pointer">Encontrar y Unirse a Eventos</summary>
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                            <p><strong>Explorar Eventos:</strong> En la página principal, encontrarás la sección "Próximos Eventos" con todas las fiestas disponibles.</p>
                            <p><strong>Buscar y Filtrar:</strong> Usa la barra de búsqueda para encontrar eventos por título o categoría. También puedes usar los botones de filtro para ver solo eventos de "Pago", "Gratis" o de una "Categoría" específica.</p>
                            <p><strong>Ver Detalles:</strong> Haz clic en cualquier tarjeta de evento para ver su descripción completa, fecha, hora, anfitrión y los participantes ya inscritos.</p>
                            <p><strong>Unirse a una Fiesta:</strong> Para unirte, necesitas una cuenta. Haz clic en "¡Quiero Unirme!" en la página de detalles. Si el evento es de pago, se te dirigirá a una página de confirmación. Una vez inscrito, accederás a la "Sala de Espera".</p>
                            <p><strong>Sala de Espera y Llamada:</strong> La Sala de Espera muestra una cuenta regresiva hasta el inicio del evento. Cuando el contador llegue a cero, el botón para entrar a la sala de video se activará.</p>
                        </div>
                    </details>
                    
                    <details className="bg-[#0b0c10] p-4 rounded-lg">
                        <summary className="font-semibold text-lg text-[#FFD700] cursor-pointer">Ser Anfitrión</summary>
                         <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                            <p><strong>Registrarse como Anfitrión:</strong> Para crear tus propios eventos, debes registrarte como anfitrión. Puedes hacerlo desde el botón "Quiero ser Anfitrión" en la página principal.</p>
                            <p><strong>Crear un Evento:</strong> Una vez que tienes una cuenta de anfitrión, ve a tu perfil y haz clic en "Crear Nuevo Evento". Rellena el formulario con todos los detalles.</p>
                            <p><strong>Generador con IA:</strong> ¿No tienes inspiración para la descripción? ¡No hay problema! Escribe un título y haz clic en el botón "✨ Generar con IA" para que creemos una descripción atractiva para ti.</p>
                        </div>
                    </details>

                    <details className="bg-[#0b0c10] p-4 rounded-lg">
                        <summary className="font-semibold text-lg text-[#FFD700] cursor-pointer">Tu Cuenta y Amigos</summary>
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                            <p><strong>Mi Perfil:</strong> Haz clic en tu nombre en la esquina superior derecha para ir a tu perfil. Aquí puedes ver los eventos a los que te has inscrito, y si eres anfitrión, tus reseñas y la opción de crear nuevos eventos.</p>
                            <p><strong>Amigos:</strong> En la sección "Mis Amigos", puedes buscar a otros usuarios, enviarles solicitudes de amistad y gestionar las solicitudes que has recibido. ¡Conectar con otros es parte de la diversión!</p>
                        </div>
                    </details>
                    
                    <details className="bg-[#0b0c10] p-4 rounded-lg">
                        <summary className="font-semibold text-lg text-[#FFD700] cursor-pointer">Después del Evento</summary>
                         <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                            <p><strong>Calificar al Anfitrión:</strong> Al salir de una sala de video, te pediremos que califiques tu experiencia con el anfitrión. Tus comentarios son muy valiosos para la comunidad.</p>
                        </div>
                    </details>

                     <p className="text-center text-sm text-gray-500 pt-4">
                        ¿Tienes más preguntas? Contáctanos en <a href="mailto:soporte@fiestatalk.com" className="text-[#FFD700] underline">soporte@fiestatalk.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
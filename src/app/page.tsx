import Chatbot from "./components/Chatbot";

import React from "react";

const ConsuladoMockup = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Consulado General del Perú</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Inicio</a></li>
            <li><a href="#" className="hover:underline">Trámites</a></li>
            <li><a href="#" className="hover:underline">Contacto</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto py-10 px-6">
      <Chatbot />
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Bienvenido al Consulado General del Perú</h2>
          <p className="mt-2 text-gray-600">
            Aquí puedes realizar tus trámites consulares de manera rápida y eficiente. Utiliza nuestro asistente virtual para obtener información sobre pasaportes, visas y otros servicios.
          </p>
        </section>

        {/* Chatbot Section */}
        <section className="mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md relative">
            <h3 className="text-lg font-semibold text-gray-800">Asistente Virtual</h3>
            <p className="text-gray-600">Pregunta sobre trámites y obtén respuestas al instante.</p>

          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; 2025 Consulado General del Perú. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ConsuladoMockup;


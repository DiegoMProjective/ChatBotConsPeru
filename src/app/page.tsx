"use client";
import React from "react";
import StepperChat from './components/StepperChat';

const ConsuladoMockup = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Capa inferior: iframe del consulado */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.consulado.pe/es/LosAngeles/Paginas/Inicio.aspx"
          className="w-full h-full border-none"
        />
      </div>

      {/* Capa superior: chatbot */}
      <StepperChat />
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Bienvenido al Consulado General del Perú</h2>
          <p className="mt-2 text-gray-600">
            Aquí puedes realizar tus trámites consulares de manera rápida y eficiente. Utiliza nuestro asistente virtual para obtener información sobre pasaportes, visas y otros servicios.
          </p>
        </section>
      </div>

      {/* Capa invisible encima para evitar interacción directa con el iframe (opcional) */}
      {/* <div className="absolute inset-0 z-40 pointer-events-none"></div> */}
    </div>
  );
};

export default ConsuladoMockup;

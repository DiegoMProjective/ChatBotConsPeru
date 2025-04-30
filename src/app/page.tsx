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
      
      {/* Main Content */}
      <main className="container mx-auto py-10 px-6">
      {/* <Chatbot />
       */}
       <StepperChat />

        {/* Chatbot Section */}
        <section className="mt-6">
          
        </section>
      </main>
      

      {/* Capa invisible encima para evitar interacción directa con el iframe (opcional) */}
      {/* <div className="absolute inset-0 z-40 pointer-events-none"></div> */}
    </div>
  );
};

export default ConsuladoMockup;

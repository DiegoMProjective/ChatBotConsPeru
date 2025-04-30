"use client";
import React from "react";
import Chatbot from "./components/Chatbot";



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
      <div className="absolute bottom-6 right-6 z-50">
        <Chatbot/>
      </div>

      {/* Capa invisible encima para evitar interacción directa con el iframe (opcional) */}
      {/* <div className="absolute inset-0 z-40 pointer-events-none"></div> */}
    </div>
  );
};

export default ConsuladoMockup;

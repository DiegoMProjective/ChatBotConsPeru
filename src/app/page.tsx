"use client";
import React from "react";
import Chatbot from "./components/Chatbot";

const ConsuladoMockup = () => {
  return (
    <div className="relative min-h-screen">
      {/* Sitio del consulado embebido */}
      <iframe
        src="https://www.consulado.pe/es/LosAngeles/Paginas/Inicio.aspx"
        className="w-full h-screen border-none"
      />

      {/* Chatbot flotante arriba del iframe */}
      <div className="absolute bottom-6 right-6 z-50">
        <Chatbot />
      </div>
    </div>
  );
};

export default ConsuladoMockup;

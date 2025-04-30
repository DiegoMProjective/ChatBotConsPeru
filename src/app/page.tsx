"use client";
import React from "react";
import Chatbot from "./components/Chatbot";

// Objeto 'info' que cumple con el tipo requerido por el Chatbot
const dummyInfo = {
  name: "Juan",
  lastname: "Pérez",
  email: "juan.perez@example.com",
};

const ConsuladoMockup = () => {
  return (
    <div className="relative min-h-screen">
      {/* Sitio del consulado embebido */}
      <iframe
        src="https://www.consulado.pe/es/LosAngeles/Paginas/Inicio.aspx"
        className="w-full h-screen border-none"
      />

      {/* Chatbot flotante sobre el sitio */}
      <div className="absolute bottom-6 right-6 z-50">
        <Chatbot info={dummyInfo} />
      </div>
    </div>
  );
};

export default ConsuladoMockup;

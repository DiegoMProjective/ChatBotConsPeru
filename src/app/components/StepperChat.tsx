"use client";
import { useState } from "react";
import Chatbot from "./Chatbot";
import { MessageSquareMore } from "lucide-react";

export default function StepperChat() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    lastname: ""
  });

  const handleNext = () => {
    if (formData.name && formData.email && formData.lastname) {
      setStep(2);
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 border-2 border-white">
      {step === 0 &&  (
        <div
          onClick={() => setStep(1)}
          className="w-64 p-4 bg-white/30 backdrop-blur-sm shadow-lg flex items-center justify-between cursor-pointer rounded-t-lg"
        >
          <span className="text-xl text-gray-700 font-bold">Asistente Consular 24/7</span>
          <div className="message-square-icon flex justify-center items-center bg-gray-700">
            <MessageSquareMore className="w-6 h-6" />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="w-80 p-6 bg-white/30 backdrop-blur-sm shadow-lg rounded-lg flex flex-col space-y-4 text-wrap flex items-center text-center">
          <h2 className="text-xl font-semibold text-gray-700 text-center standard-text">Tu asistente consular 24/7</h2>

          <div className="message-square-icon flex justify-center items-center bg-gray-700">
            <MessageSquareMore className="w-6 h-6" />
          </div>


          <h2 className="text-xl font-semibold text-gray-700 text-center standard-text">Nayra</h2>

          <p className="text-base text-gray-700 standard-text">Resuelve todas tus dudas y agenda tu cita con Nayra Nombres</p>

          <h2 className="text-gray-700 font-bold text-2xl ">Nombres</h2>
          <input
            type="text"
            placeholder="nombres"
            className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 text-black stepper-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <h2 className="text-gray-700 font-bold text-2xl first-letter:uppercase">apellidos</h2>
          <input
            type="text"
            placeholder="apellidos"
            className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 text-black stepper-input"
            value={formData.lastname}
            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          />

          <h2 className="text-gray-700 font-bold text-2xl first-letter:uppercase">correo electronico</h2>
          <input
            type="email"
            placeholder="correo electrónico"
            className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 stepper-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button
            onClick={handleNext}
            className="text-gray-700 text-sm standard-text py-2 px-4 rounded"
          >
            Empezar Chat
          </button>

          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setStep(0)}
          >
            <MessageSquareMore className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      )}

      {step === 2  && <Chatbot info={formData} />}
    </div>
  );
}

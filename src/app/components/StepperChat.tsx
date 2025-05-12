"use client";
import { useState } from "react";
import Chatbot from "./Chatbot";
import { MessageSquareMore, Minus } from "lucide-react";

export default function StepperChat() {
  const [step, setStep] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
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

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleStart = () => {
    setIsMinimized(false);
    setStep(1);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white/50 backdrop-blur-md rounded-lg shadow-lg overflow-hidden z-50 border border-white">

      <div className="flex justify-between items-center p-3 bg-white/10  backdrop-blur-md shadow-lg text-black cursor-pointer" onClick={step === 0 ? handleStart : toggleMinimize}>
        <span className="font-bold text-sm">Asistente Consular 24/7</span>
        <div className="flex space-x-2">
          {isMinimized ? <MessageSquareMore className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 ">
          {step === 1 && (
            <div className="flex flex-col space-y-4w-80 p-6 rounded-lg space-y-4 text-wrap flex items-center text-center">
              <h2 className="text-sm font-semibold text-gray-700 text-center standard-text">Tu asistente consular 24/7</h2>

              <div className="message-square-icon flex justify-center items-center bg-gray-700">
                <MessageSquareMore className="w-2 h-2" />
              </div>


              <h2 className="text-sm font-semibold text-gray-700 text-center standard-text">Nayra</h2>

              <p className="text-sm text-gray-700 standard-text">Resuelve todas tus dudas y agenda tu cita con Nayra Nombres</p>

              <h2 className="text-gray-700 font-bold text-sm self-start">Nombres</h2>
              <input
                type="text"
                placeholder="nombres"
                className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 text-black stepper-input w-full"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <h2 className="text-gray-700 font-bold text-sm self-start first-letter:uppercase">apellidos</h2>
              <input
                type="text"
                placeholder="apellidos"
                className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 text-black stepper-input w-full"
                value={formData.lastname}
                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              />

              <h2 className="text-gray-700 font-bold text-sm  self-start first-letter:uppercase">correo electronico</h2>
              <input
                type="email"
                placeholder="correo electrónico"
                className="p-2 rounded-lg border bg-white/70 placeholder-gray-500 stepper-input w-full"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <button
                onClick={handleNext}
                className="text-gray-700 text-sm standard-text py-2 px-4 rounded"
              >
                Empezar Chat
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="h-[400px] overflow-y-auto">
              <Chatbot info={formData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Message } from "../types/Message";

type Info = {
  name: string;
  email: string;
  lastname: string;
};


export default function Chatbot({ info }: { info: Info }) {
  const [messages, setMessages] = useState<Message[]>([{ text: 'Hola soy Nayra tu asistente virtual, te apoyaré con las dudas que tengas acerca del proceso de pasaportes y demás.', isUser: false }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.isUser) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    //const BASE_URL = "http://localhost:8000"
    const NGROK = '/api/generate';

    try {
      const res = await fetch(NGROK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.body) {
        console.error("No se recibió un body en la respuesta.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      const botMessage: Message = { text: "", isUser: false };

      setMessages((prev) => [...prev, botMessage]);


      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          try {

            const data = line;
            if (data) {
              setMessages((prev) => {
                return prev.map((msg, index) => {
                  if (index === prev.length - 1 && !msg.isUser) {
                    return { ...msg, text: msg.text + data };
                  }
                  return msg;
                });
              });
            }
          } catch (err) {
            console.error("Error procesando JSON:", err);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full shadow-lg rounded-lg overflow-hidden">

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
              ${msg.isUser
                ? "bg-gray-200 text-gray-800"
                : "bg-[#FED4D4] text-gray-900"
              }`}>
              <p className="font-semibold mb-1">
                {msg.isUser ? `${info?.name} ${info?.lastname}` : "Nayra"}
              </p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 text-gray-500">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-300 bg-white/70 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-400"
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="text-red-500 hover:text-red-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

    </div>);
}

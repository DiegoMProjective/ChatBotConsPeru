"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageCircle } from "lucide-react";
import { Message } from "../types/Message";


export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [quemados, setQuemados] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.isUser) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
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
            const data = JSON.parse(line);
            if (data.response) {
              setMessages((prev) => {
                return prev.map((msg, index) => {
                  if (index === prev.length - 1 && !msg.isUser) {
                    return { ...msg, text: msg.text + data.response };
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
    <div className="fixed bottom-4 right-4 flex flex-col items-end z-50">
      <button
        style={{ backgroundColor: '#C5172E' }}
        className="p-4  text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* <div
        className={`fixed bottom-20 right-20 w-80 bg-white shadow-lg rounded-lg flex flex-col transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      > */}
      <div
        className={`fixed bottom-20 right-20 w-80 bg-white/30 backdrop-blur-sm shadow-lg rounded-lg flex flex-col transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          }`}
      >

        {/* <div className="backdrop-blur-sm chat-title p-4 text-white font-bold rounded-t-lg">
          Asistente Virtual Consulado Peruano
        </div> */}

        <div className="messages-container flex flex-col flex-1 overflow-y-auto p-2 space-y-2"
          style={{ height: '500px' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-text max-w-[80%] px-4 py-2 rounded-lg ${msg.isUser
                ? "bg-gray-200/80 backdrop-blur-sm text-gray-800 self-end text-right"
                : "bg-[#FED4D4]/80 backdrop-blur-sm text-gray-900 self-start text-left"
                }`}
            >
              {msg.isUser ?  msg.text : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras erat ligula, egestas eu erat nec, aliquam sollicitudin sapien. Maecenas turpis augue, laoreet eget gravida non, viverra et augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vitae posuere urna. Vivamus viverra vehicula pretium. Nunc at justo urna. Sed consectetur congue lobortis. Aliquam erat volutpat."}
            </div>
          ))}
          {loading && (
            <div className="loading-container flex items-center">
              <Loader2 className="animate-spin h-6 w-6 text-red-500" />
              <span className="ml-2 text-gray-500">Escribiendo...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container flex items-center p-2 bg-transparent ">
          <input
            type="text"
            // className="flex-1 p-0 m-0 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Preguntame algo..."
          />
          <button
            // className="ml-2 text-white p-3 rounded-lg transition bg-transparent border-none outline-none"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, MessageCircle } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <button
        className="p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      <div
        className={`fixed bottom-20 right-20 w-80 bg-white shadow-lg rounded-lg flex flex-col transition-all duration-300 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="chat-title p-4 bg-red-500 text-white font-bold rounded-t-lg">
          Asistente Virtual Consulado Peruano
        </div>

        <div className="messages-container flex flex-col flex-1 overflow-y-auto p-2 space-y-2 h-60">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-text max-w-[80%] px-4 py-2 rounded-lg ${
                msg.isUser
                  ? "bg-red-500 text-white self-end text-right"
                  : "bg-gray-200 text-gray-900 self-start text-left"
              }`}
            >
              {msg.text}
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

        <div className="input-container flex items-center border-t p-2 bg-gray-100 rounded-b-lg">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md text-gray-900"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Escribe un mensaje..."
          />
          <button
            className="ml-2 bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
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

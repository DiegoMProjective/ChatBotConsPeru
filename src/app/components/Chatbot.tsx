"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Message } from "../types/Message";
import { Info } from "../types/info";

export default function Chatbot({ info }: { info: Info }) {
  const GREETING = 'Hola soy Nayra tu asistente virtual, te apoyaré con las dudas que tengas acerca del proceso de pasaportes y demás.';
  const [messages, setMessages] = useState<Message[]>([{ text: GREETING, isUser: false }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const BOTNAME = "Nayra";

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

    try {
      const res = await fetch(
        "https://datasetperu.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=NayraUSA&api-version=2021-10-01&deploymentName=production",
        {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": "9ARny4IYbVm3drJBuwZa60A9VGSoAzk6NIPJQsWNDStvaZ02m927JQQJ99BEACLArgHXJ3w3AAAaACOGZezL",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            top: 1,
            question: input,
            includeUnstructuredSources: true,
            confidenceScoreThreshold: 0.3,
            answerSpanRequest: {
              enable: true,
              topAnswersWithSpan: 1,
              confidenceScoreThreshold: 0.3,
            },
          }),
        }
      );

      const data = await res.json();

      const answer = data.answers?.[0]?.answer || "Lo siento, no encontré información relacionada.";
      const botMessage: Message = { text: answer, isUser: false };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Hubo un error al obtener respuesta.", isUser: false }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full shadow-lg rounded-lg overflow-hidden">

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm
              ${msg.isUser
                ? "bg-gray-200 text-gray-800"
                : "bg-[#FED4D4] text-gray-900"
              }`}>
              <p className="font-semibold mb-1">
                {msg.isUser ? `${info?.name} ${info?.lastname}` : BOTNAME}
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

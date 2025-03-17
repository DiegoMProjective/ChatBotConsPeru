import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();
  
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-finetuned", // 👈 Aquí se especifica el modelo
        prompt,
        stream: true, // 👈 Esto asegura que la respuesta sea en streaming
      }),
    });
  
    if (!res.body) {
      return new Response("Error: No se recibió un body en la respuesta", { status: 500 });
    }
  
    // Crear un Stream para pasar la respuesta al frontend
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
  
    (async function processStream() {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
  
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.response) {
              await writer.write(new TextEncoder().encode(JSON.stringify({ response: data.response }) + "\n"));
            }
          } catch (err) {
            console.error("Error procesando JSON:", err);
          }
        }
      }
      await writer.close();
    })();
  
    return new Response(readable, {
      headers: { "Content-Type": "application/json" },
    });
  }
  

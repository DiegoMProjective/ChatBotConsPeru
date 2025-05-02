let conversationHistory: { role: "user" | "assistant", content: string }[] = [];

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Agregar el nuevo mensaje del usuario al historial
  conversationHistory.push({ role: "user", content: prompt });

  const res = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      history: conversationHistory, // 👈 Se envía el historial completo
    }),
  });

  if (!res.body) {
    return new Response("Error: No se recibió un body en la respuesta", { status: 500 });
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  (async function processStream() {
    let assistantResponse = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split("\n").filter((line) => line.trim() !== "");
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            assistantResponse += data.response; // Guardamos la respuesta completa
            await writer.write(new TextEncoder().encode(JSON.stringify({ response: data.response }) + "\n"));
          }
        } catch (err) {
          console.error("Error procesando JSON:", err);
        }
      }
    }

    // Agregar respuesta de IA al historial
    conversationHistory.push({ role: "assistant", content: assistantResponse });

    await writer.close();
  })();

  return new Response(readable, {
    headers: { "Content-Type": "application/json" },
  });
}

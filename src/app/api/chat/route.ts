export async function POST(req: Request) {
  const { prompt } = await req.json();

  const res = await fetch("https://6735-194-68-245-86.ngrok-free.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });


  if (!res.body) {
    return new Response("Error: No se recibió un body en la respuesta", { status: 500 });
  }

  // Crear un Stream para pasar la respuesta de texto plano al frontend
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  (async function processStream() {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });

      // Aquí no hay JSON, simplemente mandamos el texto directo
      await writer.write(new TextEncoder().encode(chunk));
    }
    await writer.close();
  })();

  return new Response(readable, {
    headers: { "Content-Type": "text/plain" },
  });
}
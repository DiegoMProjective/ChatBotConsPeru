async function testLlama() {
    const response = await fetch("https://2f01-2800-e2-b380-1d73-39fe-5e6f-964f-897.ngrok-free.app/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "consulado", prompt: "Hola, ¿cómo estás?" })
    });

    // Verifica si la respuesta tiene el body en streaming
    if (!response.body) {
        console.error("No se recibió un body en la respuesta.");
        return;
    }

    // Leer línea por línea
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let resultText = "";

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        try {
            // Dividir en líneas y parsear cada JSON válido
            const lines = chunk.split("\n").filter(line => line.trim() !== "");
            for (const line of lines) {
                const data = JSON.parse(line);
                if (data.response) {
                    resultText += data.response;
                }
            }
        } catch (err) {
            console.error("Error procesando JSON:", err);
        }
    }

    console.log("Respuesta completa:", resultText);
}

testLlama();

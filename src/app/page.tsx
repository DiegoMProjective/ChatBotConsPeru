import Chatbot from "./components/Chatbot";
export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6">
        <Chatbot />
      <h1 className="text-4xl font-bold mb-4">Página del Consulado Peruano</h1>
      <p className="text-lg text-center max-w-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis 
        egestas rhoncus. Donec facilisis fermentum sem, ac viverra ante luctus vel.
      </p>
    </main>

  );
}

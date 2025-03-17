import Image from "next/image";
import styles from "./page.module.css";
import Chatbot from "./components/Chatbot";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <Chatbot />
    </main>
  );
}

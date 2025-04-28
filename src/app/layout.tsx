import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Asistente virtual consulado",
  description: "consulado de Perú, pe, chatbot, pasaporte, consulado, perú",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

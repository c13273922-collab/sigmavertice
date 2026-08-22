import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sigma Vértice",
  description: "Sistema de Gestão Sigma Vértice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen bg-sigma-azul-50">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LenIA — Dashboard de Gestão Acadêmica",
  description: "Sistema de feedback acadêmico inteligente — UNICESUMAR 2026",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

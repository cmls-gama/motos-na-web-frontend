import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ComparisonDock } from "@/components/comparison/comparison-dock";
import "./globals.css";

const geist = localFont({
  src: [
    { path: "../public/fonts/geist-latin.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Motos na Web — Encontre e compare sua próxima moto", template: "%s | Motos na Web" },
  description: "Explore o catálogo de motocicletas, pesquise por fabricante e modelo e compare de duas a quatro motos lado a lado. Mais informação para sua próxima escolha.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" className={geist.variable + " h-full antialiased"}>
    <body className="flex min-h-full flex-col">
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <Suspense fallback={<div className="h-20 border-b border-border bg-white" />}><SiteHeader /></Suspense>
      {children}
      <SiteFooter />
      <Suspense fallback={null}><ComparisonDock /></Suspense>
    </body>
  </html>;
}

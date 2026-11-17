import Link from "next/link";
import { ArrowUpRight, GitCompareArrows } from "lucide-react";
import { Brand } from "@/components/site-header";

export function SiteFooter() {
  return <footer className="mt-auto border-t border-border bg-white">
    <div className="page-container flex flex-col justify-between gap-7 py-10 sm:flex-row sm:items-center">
      <div><Link href="/" aria-label="Motos na Web — início"><Brand /></Link><p className="mt-3 text-sm text-muted-foreground">Mais informação. Sua melhor escolha.</p></div>
      <nav aria-label="Menu do rodapé" className="flex flex-wrap gap-7 text-sm font-medium"><Link href="/motocicletas" className="inline-flex items-center gap-2 hover:text-primary">Explorar catálogo<ArrowUpRight className="size-4" /></Link><Link href="/comparar" className="inline-flex items-center gap-2 hover:text-primary"><GitCompareArrows className="size-4" />Comparar motos</Link></nav>
    </div>
    <div className="page-container flex flex-col justify-between gap-2 border-t border-border py-5 text-xs leading-5 text-muted-foreground sm:flex-row"><span>Motos na Web · Feito para quem vive sobre duas rodas.</span><span>Catálogo demonstrativo · Imagens ilustrativas</span></div>
  </footer>;
}

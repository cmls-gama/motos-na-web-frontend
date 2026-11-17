"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, GitCompareArrows, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useComparison } from "@/hooks/use-comparison";

export function ComparisonDock() {
  const { motorcycles, toggle, clear } = useComparison();
  const pathname = usePathname();
  if (motorcycles.length === 0 || pathname === "/comparar") return null;
  return <aside aria-label="Motocicletas selecionadas para comparar" className="sticky inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-white/95 shadow-[0_-8px_30px_-15px_#183b3030] backdrop-blur-md"><div className="page-container flex flex-wrap items-center gap-3 py-3 sm:flex-nowrap sm:gap-5">
    <div className="flex items-center gap-2.5"><GitCompareArrows className="size-5 text-primary" /><p className="text-xs font-semibold">Comparador<span className="ml-2 font-normal text-muted-foreground">{motorcycles.length}/4</span></p></div>
    <div className="hidden flex-1 flex-wrap gap-2 lg:flex">{motorcycles.map((moto) => <span key={moto.id} className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 py-1 pl-2.5 pr-1 text-[11px]">{moto.brand} {moto.model}<Button variant="ghost" size="icon-xs" aria-label={"Remover " + moto.brand + " " + moto.model} onClick={() => toggle(moto.id)}><X className="size-3" /></Button></span>)}</div>
    <p role="status" className="hidden text-[11px] text-muted-foreground sm:ml-auto sm:block xl:ml-0">{motorcycles.length === 1 ? "Adicione mais uma moto para comparar." : motorcycles.length === 4 ? "Limite de 4 motos atingido." : "Pronto para comparar."}</p>
    <Button variant="ghost" size="sm" onClick={clear} className="ml-auto text-[11px] text-muted-foreground sm:ml-0">Limpar</Button>
    <Link href="/comparar" className="inline-flex items-center gap-3 rounded-lg bg-primary px-4 py-2.5 text-xs font-medium text-white hover:bg-primary/90">{motorcycles.length < 2 ? "Ver seleção" : "Comparar agora"}<ArrowRight className="size-3.5" /></Link>
  </div></aside>;
}

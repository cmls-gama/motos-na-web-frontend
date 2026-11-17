import Link from "next/link";
import { ArrowUpRight, Droplets, Gauge } from "lucide-react";
import { CompareButton } from "@/components/comparison/compare-button";
import { MotorcycleImage } from "@/components/motorcycles/motorcycle-image";
import type { Motorcycle } from "@/types/motorcycle";

export function MotorcycleCard({ motorcycle, index }: { motorcycle: Motorcycle; index: number }) {
  const href = "/motocicletas/" + motorcycle.id;
  return <article className="group overflow-hidden rounded-xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_32px_-12px_#173b3025]">
    <Link href={href} className="relative block aspect-[1.5] overflow-hidden bg-[#f5f6f3]" aria-label={"Ver ficha técnica de " + motorcycle.brand + " " + motorcycle.model}>
      <div className="absolute left-4 top-4 z-10 rounded-md border border-white/80 bg-white/90 px-2 py-1 text-[10px] font-semibold">{motorcycle.year}</div>
      <span aria-hidden="true" className="absolute right-4 top-4 z-10 font-mono text-[11px] text-muted-foreground/60">{String(index + 1).padStart(2, "0")}</span>
      <MotorcycleImage motorcycle={motorcycle} className="mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
    </Link>
    <div className="p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{motorcycle.brand}</p>
      <Link href={href} className="mt-1.5 block"><h3 className="text-xl font-bold tracking-[-0.6px] transition-colors hover:text-primary">{motorcycle.model}</h3></Link>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Gauge className="size-3.5 text-primary/75" />{motorcycle.engineCapacityCc} cc</span><span className="h-3 w-px bg-border" /><span className="flex items-center gap-1.5"><Droplets className="size-3.5 text-primary/75" />{motorcycle.color}</span></div>
      <div className="mt-5 border-t border-border pt-4"><Link href={href} className="mb-3 flex items-center justify-between py-1 text-xs font-semibold text-primary">Ver ficha técnica<ArrowUpRight className="size-4" /></Link><CompareButton motorcycle={motorcycle} /></div>
    </div>
  </article>;
}

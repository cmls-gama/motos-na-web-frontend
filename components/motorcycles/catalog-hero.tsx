import { ArrowDown, ArrowUpRight, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotorcycleImage } from "@/components/motorcycles/motorcycle-image";
import type { Motorcycle } from "@/types/motorcycle";

export function CatalogHero({ query, onQueryChange, featured, brandCount }: { query: string; onQueryChange: (value: string) => void; featured: Motorcycle; brandCount: number }) {
  return <section className="hero-surface relative overflow-hidden text-white" aria-labelledby="hero-heading">
    <div className="page-container relative grid gap-6 pb-12 pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:pb-16 lg:pt-16">
      <div className="relative z-10">
        <p className="mb-6 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d0ddca]"><span className="size-1.5 rounded-full bg-lime-300" />Menos dúvida. Mais estrada.</p>
        <h1 id="hero-heading" className="max-w-xl text-[clamp(2.55rem,5vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.055em]">Encontre e compare<br className="hidden sm:block" /> sua próxima <span className="text-lime-300">moto</span></h1>
        <p className="mt-5 max-w-[410px] text-sm leading-6 text-[#becdc5]">Explore modelos, conheça os detalhes e coloque suas favoritas lado a lado. Sua próxima escolha começa aqui.</p>
        <form role="search" className="mt-7 flex max-w-[500px] items-center gap-2 rounded-xl border border-white/20 bg-white p-1.5 shadow-xl shadow-black/5" onSubmit={(event) => { event.preventDefault(); document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" }); }}>
          <Search className="ml-2 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="hero-search" className="sr-only">Pesquisar fabricante ou modelo</label>
          <input id="hero-search" type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Qual moto você está procurando?" className="h-10 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          <Button type="submit" className="h-11 rounded-lg bg-lime-300 px-4 text-[#16392c] hover:bg-lime-200"><span className="hidden sm:inline">Buscar moto</span><ArrowUpRight className="size-4" /></Button>
        </form>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-[#c7d4ca]"><span className="inline-flex items-center gap-1.5"><Check className="size-3 text-lime-300" />{brandCount} marcas para explorar</span><span className="inline-flex items-center gap-1.5"><Check className="size-3 text-lime-300" />Compare até 4 motos</span></div>
      </div>
      <div className="relative hidden min-h-[350px] lg:block" aria-label={featured.brand + " " + featured.model + " em destaque"}>
        <span aria-hidden="true" className="absolute -right-3 top-0 select-none text-[108px] font-black italic leading-none tracking-[-7px] text-white/[0.04]">EXPLORE.</span>
        <div aria-hidden="true" className="absolute left-[12%] top-[9%] size-[330px] rounded-full border border-white/10"><div className="absolute inset-7 rounded-full border border-white/10" /><div className="absolute inset-14 rounded-full border border-white/10" /></div>
        <div className="absolute -inset-x-10 -bottom-5 top-0"><MotorcycleImage motorcycle={featured} preload className="hero-bike object-contain p-0 drop-shadow-[0_22px_24px_#0006]" /></div>
        <div className="absolute bottom-3 right-0 z-10 flex items-center gap-4 rounded-lg border border-white/15 bg-[#244536]/95 px-4 py-3"><span className="size-1.5 rounded-full bg-lime-300" /><div><p className="text-[9px] uppercase tracking-[0.16em] text-[#bbccbd]">Conheça de perto</p><p className="mt-1 text-sm font-semibold">{featured.brand} {featured.model}<span className="ml-3 text-xs font-normal text-lime-300">{featured.engineCapacityCc} cc</span></p></div></div>
      </div>
      <a href="#catalogo" className="absolute bottom-5 right-6 hidden items-center gap-2 text-[9px] uppercase tracking-widest text-[#b9cabc] lg:flex">Explore o catálogo<ArrowDown className="size-3.5" /></a>
    </div>
  </section>;
}

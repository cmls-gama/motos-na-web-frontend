"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ChevronDown, GitCompareArrows, ListFilter, RotateCcw, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogHero } from "@/components/motorcycles/catalog-hero";
import { MotorcycleCard } from "@/components/motorcycles/motorcycle-card";
import { displacementRanges, normalizeSearch } from "@/lib/motorcycles";
import { cn } from "@/lib/utils";
import type { Motorcycle } from "@/types/motorcycle";

export function MotorcycleCatalog({ motorcycles, withHero = false }: { motorcycles: readonly Motorcycle[]; withHero?: boolean }) {
  const [query, setQuery] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [displacement, setDisplacement] = useState("all");
  const [sort, setSort] = useState("original");
  const [visibleCount, setVisibleCount] = useState(6);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const allBrands = useMemo(() => [...new Set(motorcycles.map((moto) => moto.brand))].sort((a, b) => a.localeCompare(b, "pt-BR")), [motorcycles]);
  const range = displacementRanges.find((item) => item.value === displacement) ?? displacementRanges[0];
  const filtered = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    const result = motorcycles.filter((moto) =>
      terms.every((term) => normalizeSearch(moto.brand + " " + moto.model).includes(term)) &&
      (brands.length === 0 || brands.includes(moto.brand)) &&
      moto.engineCapacityCc >= range.min && moto.engineCapacityCc <= range.max,
    );
    if (sort === "name") result.sort((a, b) => (a.brand + " " + a.model).localeCompare(b.brand + " " + b.model, "pt-BR"));
    if (sort === "cc-asc") result.sort((a, b) => a.engineCapacityCc - b.engineCapacityCc);
    if (sort === "cc-desc") result.sort((a, b) => b.engineCapacityCc - a.engineCapacityCc);
    return result;
  }, [motorcycles, query, brands, range, sort]);
  const activeCount = brands.length + Number(displacement !== "all");
  const hasFilters = activeCount > 0 || query.length > 0;

  function updateQuery(value: string) { setQuery(value); setVisibleCount(6); }
  function clearFilters() { setQuery(""); setBrands([]); setDisplacement("all"); setVisibleCount(6); }
  function toggleBrand(brand: string) {
    setBrands((current) => current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]);
    setVisibleCount(6);
  }

  return <main id="main-content">
    {withHero && motorcycles[0] && <CatalogHero query={query} onQueryChange={updateQuery} featured={motorcycles[0]} brandCount={allBrands.length} />}
    {withHero && <div className="border-b border-border bg-white"><div className="page-container grid gap-5 py-6 sm:grid-cols-3">
      <div className="flex items-center gap-3.5"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><Search className="size-4" /></span><div><p className="text-xs font-semibold">Encontre sua moto</p><p className="mt-1 text-[11px] text-muted-foreground">Da sua marca, do seu jeito.</p></div></div>
      <div className="flex items-center gap-3.5 sm:justify-center"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><ListFilter className="size-4" /></span><div><p className="text-xs font-semibold">Conheça os detalhes</p><p className="mt-1 text-[11px] text-muted-foreground">Informação para escolher melhor.</p></div></div>
      <div className="flex items-center gap-3.5 sm:justify-end"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary"><GitCompareArrows className="size-4" /></span><div><p className="text-xs font-semibold">Compare lado a lado</p><p className="mt-1 text-[11px] text-muted-foreground">Suas favoritas, na mesma tela.</p></div></div>
    </div></div>}
    <section id="catalogo" className="page-container scroll-mt-6 py-10 sm:py-14" aria-labelledby="catalog-heading">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="eyebrow">Encontre a sua próxima história</p>{withHero ? <h2 id="catalog-heading" className="mt-2 text-3xl font-semibold tracking-[-1.3px] sm:text-[34px]">Explore as motocicletas<span className="text-primary">.</span></h2> : <h1 id="catalog-heading" className="mt-2 text-3xl font-semibold tracking-[-1.3px] sm:text-[34px]">Explore as motocicletas<span className="text-primary">.</span></h1>}<p className="mt-2 text-sm text-muted-foreground">Diferentes caminhos. Uma moto que combina com você.</p></div>
        <span className="w-fit rounded-full border border-border bg-white px-3 py-1.5 text-[11px] text-muted-foreground"><span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />{motorcycles.length} modelos no catálogo</span>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[210px_1fr] xl:gap-9">
        <aside aria-label="Filtros de motocicletas" className="rounded-xl border border-border bg-white p-5">
          <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-sm font-semibold"><SlidersHorizontal className="size-4 text-primary" />Filtros{activeCount > 0 && <span className="rounded bg-secondary px-1.5 text-xs text-primary">{activeCount}</span>}</h2><Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label={filtersOpen ? "Recolher filtros" : "Expandir filtros"} aria-controls="catalog-filters" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(!filtersOpen)}><ChevronDown className={cn("transition-transform", filtersOpen && "rotate-180")} /></Button></div>
          <div id="catalog-filters" className={cn("mt-6", !filtersOpen && "hidden lg:block")}>
            <fieldset><legend className="mb-3 text-[11px] font-semibold uppercase tracking-wider">Marca</legend><div className="space-y-2.5">{allBrands.map((brand) => <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground"><input type="checkbox" checked={brands.includes(brand)} onChange={() => toggleBrand(brand)} className="size-3.5 cursor-pointer rounded border-border accent-primary" /><span className="flex-1">{brand}</span><span className="text-[10px] text-muted-foreground/70">{motorcycles.filter((moto) => moto.brand === brand).length}</span></label>)}</div></fieldset>
            <fieldset className="mt-6 border-t border-border pt-5"><legend className="sr-only">Cilindrada</legend><label htmlFor="displacement" className="mb-3 block text-[11px] font-semibold uppercase tracking-wider">Cilindrada</label><select id="displacement" value={displacement} onChange={(event) => { setDisplacement(event.target.value); setVisibleCount(6); }} className="form-select w-full text-[11px]">{displacementRanges.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></fieldset>
            <Button variant="ghost" className="mt-5 h-9 w-full gap-2 border-t border-border pt-2 text-xs text-muted-foreground" onClick={clearFilters} disabled={!hasFilters}><RotateCcw className="size-3" />Limpar filtros</Button>
          </div>
        </aside>
        <div className="min-w-0">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p role="status" aria-live="polite" className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length}</span> {filtered.length === 1 ? "motocicleta encontrada" : "motocicletas encontradas"}</p>
            <div className="flex items-center gap-2"><label htmlFor="sort" className="shrink-0 text-[11px] text-muted-foreground">Ordenar por:</label><select id="sort" value={sort} onChange={(event) => setSort(event.target.value)} className="form-select h-9 flex-1 text-[11px] sm:w-40"><option value="original">Ordem do catálogo</option><option value="name">Marca e modelo (A–Z)</option><option value="cc-asc">Menor cilindrada</option><option value="cc-desc">Maior cilindrada</option></select></div>
          </div>
          <div className="relative mb-5"><Search aria-hidden="true" className="absolute left-3.5 top-3 size-4 text-muted-foreground" /><label htmlFor="catalog-search" className="sr-only">Pesquisar por fabricante ou modelo no catálogo</label><input id="catalog-search" type="search" value={query} onChange={(event) => updateQuery(event.target.value)} placeholder="Pesquisar por fabricante ou modelo" className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" /></div>
          {hasFilters && <div className="mb-5 flex flex-wrap items-center gap-2">
            {query && <button type="button" onClick={() => updateQuery("")} className="filter-chip" aria-label="Remover pesquisa">“{query}”<X className="size-3" /></button>}
            {brands.map((brand) => <button type="button" key={brand} onClick={() => toggleBrand(brand)} className="filter-chip" aria-label={"Remover filtro " + brand}>{brand}<X className="size-3" /></button>)}
            {displacement !== "all" && <button type="button" onClick={() => { setDisplacement("all"); setVisibleCount(6); }} className="filter-chip" aria-label="Remover filtro de cilindrada">{range.label}<X className="size-3" /></button>}
            <button type="button" onClick={clearFilters} className="px-1 text-[11px] text-muted-foreground underline underline-offset-4">Limpar tudo</button>
          </div>}
          {filtered.length > 0 ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.slice(0, visibleCount).map((motorcycle) => <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} index={motorcycles.findIndex((moto) => moto.id === motorcycle.id)} />)}</div> : <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-white p-8 text-center"><span className="mb-4 flex size-14 items-center justify-center rounded-full bg-secondary text-primary"><SearchX className="size-6" /></span><h3 className="text-lg font-semibold">Nenhuma moto por aqui</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Tente outro fabricante ou modelo, ou ajuste os filtros para encontrar sua próxima moto.</p><Button variant="outline" className="mt-5 h-10 px-4" onClick={clearFilters}>Limpar pesquisa e filtros</Button></div>}
          {filtered.length > visibleCount && <div className="mt-8 text-center"><Button variant="outline" className="h-11 gap-2 bg-white px-6 text-xs" onClick={() => setVisibleCount((count) => count + 6)}>Ver mais motocicletas<ArrowDown className="size-3.5" /></Button></div>}
          {filtered.length > 0 && <p className="mt-5 text-center text-[10px] text-muted-foreground">Mostrando {Math.min(visibleCount, filtered.length)} de {filtered.length} motocicletas · Dados demonstrativos</p>}
        </div>
      </div>
      <div className="mt-12 flex flex-col justify-between gap-6 overflow-hidden rounded-xl bg-[#eaf0e4] px-6 py-7 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-4"><span className="hidden size-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-white/60 text-primary sm:flex"><GitCompareArrows className="size-6" /></span><div><p className="text-lg font-semibold tracking-tight">Na dúvida entre duas? Compare.</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Adicione de 2 a 4 motos e veja os detalhes lado a lado.</p></div></div>
        <Link href="/comparar" className="inline-flex w-fit shrink-0 items-center gap-4 rounded-lg bg-primary px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-primary/90">Conhecer o comparador<ArrowRight className="size-4" /></Link>
      </div>
      <p className="mt-5 flex items-start gap-1.5 text-[10px] leading-5 text-muted-foreground"><Check className="mt-1 size-3 shrink-0" />Catálogo demonstrativo baseado nos dados do Motos na Web. As imagens são ilustrativas e podem apresentar diferenças de versão, ano ou cor.</p>
    </section>
  </main>;
}

"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, GitCompareArrows, Info, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotorcycleImage } from "@/components/motorcycles/motorcycle-image";
import { MAX_COMPARISON, useComparison } from "@/hooks/use-comparison";
import type { Motorcycle } from "@/types/motorcycle";

const specificationRows: { label: string; key: keyof Pick<Motorcycle, "brand" | "model" | "year" | "color" | "engineCapacityCc">; unit?: string }[] = [
  { label: "Fabricante", key: "brand" }, { label: "Modelo", key: "model" }, { label: "Ano", key: "year" }, { label: "Cor", key: "color" }, { label: "Cilindrada", key: "engineCapacityCc", unit: " cc" },
];
export function ComparisonPage({ catalog }: { catalog: readonly Motorcycle[] }) {
  const { ids, motorcycles, toggle, clear } = useComparison();
  const available = catalog.filter((moto) => !ids.includes(moto.id));
  return <main id="main-content" className="page-container flex-1 py-8 sm:py-12">
    <Link href="/motocicletas" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><ArrowLeft className="size-3.5" />Voltar ao catálogo</Link>
    <div className="mb-9 mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">A melhor escolha está nos detalhes</p><h1 className="mt-3 text-4xl font-semibold tracking-[-1.6px] sm:text-5xl">Suas favoritas, lado a lado<span className="text-primary">.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">Escolha de 2 a 4 motocicletas e compare as informações para decidir qual vai acompanhar você.</p></div>{ids.length > 0 && <Button variant="outline" className="h-10 w-fit shrink-0 gap-2 px-4 text-xs" onClick={clear}><X className="size-3.5" />Limpar seleção</Button>}</div>
    <div className="mb-5 flex items-center justify-between gap-4"><p role="status" aria-live="polite" className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">{ids.length} de 4</span> motocicletas selecionadas</p><span className="text-right text-[11px] text-primary">{ids.length === 4 ? "Seleção completa" : "Selecione suas motos abaixo"}</span></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: MAX_COMPARISON }, (_, slot) => {
      const motorcycle = motorcycles[slot];
      return motorcycle ? <article key={motorcycle.id} className="overflow-hidden rounded-xl border border-primary/20 bg-white">
        <div className="relative aspect-[1.4] bg-muted"><MotorcycleImage motorcycle={motorcycle} className="mix-blend-multiply" /><Button variant="outline" size="icon-sm" className="absolute right-3 top-3 z-10 bg-white" aria-label={"Remover " + motorcycle.brand + " " + motorcycle.model + " do comparador"} onClick={() => toggle(motorcycle.id)}><X /></Button></div>
        <div className="p-5"><p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{motorcycle.brand}</p><h2 className="mt-1 text-xl font-bold tracking-tight">{motorcycle.model}</h2><p className="mt-2 text-xs text-muted-foreground">{motorcycle.year}<span className="mx-2 text-border">/</span>{motorcycle.engineCapacityCc} cc</p><Link href={"/motocicletas/" + motorcycle.id} className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-primary">Ver ficha técnica<ArrowRight className="size-3" /></Link></div>
      </article> : <div key={"slot-" + slot} className="flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-white/60 p-5 text-center">
        <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-secondary text-primary"><Plus className="size-5" /></span>
        <p className="text-sm font-semibold">{slot < 2 ? "Escolha a " + (slot + 1) + "ª moto" : "Mais uma possibilidade"}</p>
        <p className="mt-2 text-xs text-muted-foreground">{slot < 2 ? "O começo de uma boa comparação." : "Opcional. Compare até 4 modelos."}</p>
        <label htmlFor={"compare-slot-" + slot} className="sr-only">Adicionar motocicleta na posição {slot + 1}</label>
        <select id={"compare-slot-" + slot} className="form-select mt-5 w-full text-xs" value="" onChange={(event) => { if (event.target.value) toggle(event.target.value); }}><option value="" disabled>Selecionar motocicleta</option>{available.map((moto) => <option key={moto.id} value={moto.id}>{moto.brand} {moto.model}</option>)}</select>
      </div>;
    })}</div>
    {motorcycles.length >= 2 ? <section aria-labelledby="comparison-heading" className="mb-12 mt-10">
      <div className="mb-5 flex items-center gap-2"><GitCompareArrows className="size-5 text-primary" /><h2 id="comparison-heading" className="text-xl font-semibold tracking-tight">Compare os detalhes</h2></div>
      <p id="table-help" className="mb-3 text-xs text-muted-foreground">No celular, deslize a tabela para ver todos os modelos.</p>
      <div role="region" aria-label="Tabela comparativa de motocicletas" aria-describedby="table-help" tabIndex={0} className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[600px] border-collapse text-left text-sm"><caption className="sr-only">Dados demonstrativos das motocicletas selecionadas</caption>
          <thead><tr className="bg-primary text-white"><th scope="col" className="w-40 px-5 py-5 text-xs font-medium text-white/75">Informações</th>{motorcycles.map((moto) => <th key={moto.id} scope="col" className="min-w-40 px-5 py-5"><span className="block text-[10px] font-normal text-white/65">{moto.brand}</span><span className="mt-1 block font-semibold">{moto.model}</span></th>)}</tr></thead>
          <tbody>{specificationRows.map((row) => <tr key={row.key} className="border-t border-border even:bg-muted/40"><th scope="row" className="px-5 py-4 text-xs font-medium text-muted-foreground">{row.label}</th>{motorcycles.map((moto) => <td key={moto.id} className="px-5 py-4 text-sm">{moto[row.key]}{row.unit}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section> : <div className="my-10 flex flex-col items-center rounded-xl border border-border bg-white px-6 py-10 text-center"><GitCompareArrows className="mb-4 size-8 text-primary" /><h2 className="text-lg font-semibold">Toda boa escolha começa com uma comparação</h2><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{motorcycles.length === 0 ? "Selecione pelo menos duas motocicletas acima ou adicione suas favoritas pelo catálogo." : "Falta só mais uma moto. Adicione outro modelo para ver a comparação."}</p><Link href="/motocicletas" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Explorar motocicletas<ArrowRight className="size-4" /></Link></div>}
    <p className="mb-10 flex items-start gap-2 text-xs leading-6 text-muted-foreground"><Info className="mt-1 size-4 shrink-0" />Informações demonstrativas da massa inicial do Motos na Web. Somente os campos disponíveis são comparados. Imagens ilustrativas; podem existir diferenças de versão, ano ou cor.</p>
  </main>;
}

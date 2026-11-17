import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Gauge, Info } from "lucide-react";
import { CompareButton } from "@/components/comparison/compare-button";
import { MotorcycleImage } from "@/components/motorcycles/motorcycle-image";
import { getMotorcycle, getMotorcycles } from "@/lib/motorcycles";

export function generateStaticParams() { return getMotorcycles().map((moto) => ({ id: moto.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const motorcycle = getMotorcycle(id);
  return { title: motorcycle ? motorcycle.brand + " " + motorcycle.model + " — Ficha técnica" : "Motocicleta não encontrada" };
}
export default async function MotorcycleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const motorcycle = getMotorcycle(id);
  if (!motorcycle) notFound();
  const specifications = [{ label: "Fabricante", value: motorcycle.brand }, { label: "Modelo", value: motorcycle.model }, { label: "Ano", value: motorcycle.year }, { label: "Cor", value: motorcycle.color }, { label: "Cilindrada", value: motorcycle.engineCapacityCc + " cc" }];
  return <main id="main-content" className="page-container flex-1 py-8 sm:py-12">
    <Link href="/motocicletas" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><ArrowLeft className="size-3.5" />Voltar ao catálogo</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <div><div className="relative aspect-[1.25] overflow-hidden rounded-2xl border border-border bg-[#f0f2ed]"><span className="absolute left-5 top-5 z-10 rounded-md bg-white px-3 py-1.5 text-xs font-semibold">{motorcycle.year}</span><MotorcycleImage motorcycle={motorcycle} preload className="p-8 mix-blend-multiply" /></div><p className="mt-3 text-center text-[10px] text-muted-foreground">Imagem ilustrativa. Versão, ano e cor podem variar.</p></div>
      <div className="py-3"><p className="eyebrow">{motorcycle.brand}</p><h1 className="mt-3 text-5xl font-semibold tracking-[-2px]">{motorcycle.model}<span className="text-primary">.</span></h1><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Gauge className="size-4 text-primary" />{motorcycle.engineCapacityCc} cc<span className="mx-1 text-border">/</span>{motorcycle.year}<span className="mx-1 text-border">/</span>{motorcycle.color}</p>
        <h2 className="mb-3 mt-9 text-lg font-semibold">Ficha técnica</h2><dl className="overflow-hidden rounded-xl border border-border bg-white">{specifications.map(({ label, value }) => <div key={label} className="flex justify-between gap-4 border-b border-border px-5 py-3.5 last:border-0"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>)}</dl>
        <CompareButton motorcycle={motorcycle} className="mt-5 h-12" /><Link href="/comparar" className="mt-4 flex items-center justify-center gap-2 py-2 text-xs font-medium text-primary">Ir para o comparador<ArrowRight className="size-3.5" /></Link>
      </div>
    </div>
    <div className="mb-8 mt-10 flex gap-3 rounded-xl border border-border bg-white px-5 py-4 text-xs leading-6 text-muted-foreground"><Info className="mt-1 size-4 shrink-0 text-primary" /><p>Esta ficha usa dados demonstrativos do Motos na Web. São exibidas apenas as informações disponíveis no catálogo original. Outras especificações não foram informadas.</p></div>
  </main>;
}

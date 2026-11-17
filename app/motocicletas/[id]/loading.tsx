import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MotorcycleLoading() {
  return (
    <main id="main-content" className="page-container flex-1 py-8 sm:py-12" aria-busy="true">
      <Link href="/motocicletas" className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ArrowLeft className="size-3.5" /> Voltar ao catálogo
      </Link>
      <p role="status" className="sr-only">Carregando ficha da motocicleta.</p>
      <div aria-hidden="true" className="mt-8 grid animate-pulse gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
        <div className="aspect-[1.25] rounded-2xl bg-border/60" />
        <div className="space-y-5 py-3">
          <div className="h-3 w-20 rounded bg-border" />
          <div className="h-12 w-3/4 rounded bg-border" />
          <div className="h-4 w-1/2 rounded bg-border" />
          <div className="mt-9 h-60 rounded-xl border border-border bg-white" />
          <div className="h-12 rounded-lg bg-border" />
        </div>
      </div>
    </main>
  );
}

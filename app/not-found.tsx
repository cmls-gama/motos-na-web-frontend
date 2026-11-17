import Link from "next/link";
import { ArrowLeft, RouteOff } from "lucide-react";
export default function NotFound() {
  return <main id="main-content" className="page-container flex min-h-[60vh] flex-1 flex-col items-center justify-center py-16 text-center"><span className="flex size-20 items-center justify-center rounded-full bg-secondary text-primary"><RouteOff className="size-9" /></span><p className="eyebrow mt-7">404 · Fora da rota</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">Esse caminho não foi encontrado.</h1><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">A página ou motocicleta que você procura não está no catálogo. Vamos encontrar um novo caminho?</p><Link href="/motocicletas" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white"><ArrowLeft className="size-4" />Voltar ao catálogo</Link></main>;
}

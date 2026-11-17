"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, GitCompareArrows, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useComparison } from "@/hooks/use-comparison";
import { cn } from "@/lib/utils";

export function Brand() {
  return <span className="inline-flex items-center gap-2.5"><span aria-hidden="true" className="brand-mark"><span /><span /><span /></span><span className="text-[21px] font-extrabold tracking-[-1px]">motos<span className="text-primary">naweb.</span></span></span>;
}
export function SiteHeader() {
  const pathname = usePathname();
  const { ids } = useComparison();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{ href: "/", label: "Início" }, { href: "/motocicletas", label: "Motocicletas" }, { href: "/comparar", label: "Comparar" }];
  return <header className="relative z-30 border-b border-border bg-white">
    <div className="page-container flex h-20 items-center justify-between gap-5">
      <Link href="/" aria-label="Motos na Web — início" onClick={() => setMenuOpen(false)}><Brand /></Link>
      <nav aria-label="Menu principal" className="hidden h-full items-center gap-9 md:flex">
        {links.map(({ href, label }) => {
          const active = href === "/" ? pathname === href : pathname.startsWith(href);
          return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={cn("relative flex h-full items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary", active && "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-primary")}>{label}{href === "/comparar" && ids.length > 0 && <span className="ml-2 rounded bg-secondary px-1.5 py-0.5 text-[10px]">{ids.length}</span>}</Link>;
        })}
      </nav>
      <Link href="/comparar" className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 md:inline-flex"><GitCompareArrows className="size-4" />Comparar motos<ArrowUpRight className="ml-2 size-4" /></Link>
      <Button variant="outline" size="icon-lg" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X /> : <Menu />}</Button>
    </div>
    {menuOpen && <nav id="mobile-menu" aria-label="Menu principal móvel" className="absolute inset-x-0 top-full border-b border-border bg-white px-5 py-3 shadow-lg md:hidden">{links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">{label}{href === "/comparar" && <span>{ids.length}/4</span>}</Link>)}</nav>}
  </header>;
}

"use client";

import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MAX_COMPARISON, useComparison } from "@/hooks/use-comparison";
import { cn } from "@/lib/utils";
import type { Motorcycle } from "@/types/motorcycle";

export function CompareButton({ motorcycle, className }: { motorcycle: Motorcycle; className?: string }) {
  const { ids, toggle } = useComparison();
  const selected = ids.includes(motorcycle.id);
  const full = ids.length >= MAX_COMPARISON && !selected;
  return <Button variant="outline" className={cn("h-10 w-full gap-2 text-xs", selected && "border-primary/30 bg-secondary text-primary hover:bg-secondary", className)} onClick={() => toggle(motorcycle.id)} disabled={full} aria-pressed={selected} aria-label={(selected ? "Remover " : "Adicionar ") + motorcycle.brand + " " + motorcycle.model + (selected ? " do" : " ao") + " comparador"} title={full ? "Limite de 4 motos. Remova uma seleção para adicionar outra." : undefined}>{selected ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}{selected ? "No comparador" : full ? "Comparador cheio" : "Adicionar ao comparador"}</Button>;
}

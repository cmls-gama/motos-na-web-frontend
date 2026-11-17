"use client";

import Image from "next/image";
import { Bike } from "lucide-react";
import { useState } from "react";
import { motorcycleImages } from "@/data/motorcycle-images";
import type { Motorcycle } from "@/types/motorcycle";
import { cn } from "@/lib/utils";

export function MotorcycleImage({ motorcycle, className, preload = false }: { motorcycle: Motorcycle; className?: string; preload?: boolean }) {
  const [failed, setFailed] = useState(false);
  const image = motorcycleImages[motorcycle.id];
  if (!image || failed) return <div className="flex size-full flex-col items-center justify-center gap-3 text-muted-foreground"><Bike className="size-16 stroke-1" /><span className="text-xs">Imagem indisponível</span></div>;
  return <Image src={image.src} alt={motorcycle.brand + " " + motorcycle.model + " — imagem ilustrativa"} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 32vw" className={cn("object-contain p-5", className)} preload={preload} onError={() => setFailed(true)} />;
}

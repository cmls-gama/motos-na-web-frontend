import { demoMotorcycles } from "@/data/motorcycles";
import type { Motorcycle } from "@/types/motorcycle";

/** Ponto de acesso aos dados: substituir por um adaptador REST na integração. */
export function getMotorcycles(): readonly Motorcycle[] { return demoMotorcycles; }
export function getMotorcycle(id: string): Motorcycle | undefined {
  return getMotorcycles().find((motorcycle) => motorcycle.id === id);
}
export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}
export const displacementRanges = [
  { value: "all", label: "Todas as cilindradas", min: 0, max: Infinity },
  { value: "up-to-200", label: "Até 200 cc", min: 0, max: 200 },
  { value: "201-350", label: "De 201 a 350 cc", min: 201, max: 350 },
  { value: "351-500", label: "De 351 a 500 cc", min: 351, max: 500 },
  { value: "above-500", label: "Acima de 500 cc", min: 501, max: Infinity },
] as const;

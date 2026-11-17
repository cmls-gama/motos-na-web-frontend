import type { Motorcycle } from "@/types/motorcycle";

/**
 * Massa inicial de src/server.js do motos-na-web-api.
 * Fonte: commit ad85aa8247e668cf65577606c33197bc8db8f3d1 (17/11/2026).
 * IDs exclusivos do frontend demonstrativo; a API gera UUIDs.
 * Nenhuma especificação adicional foi acrescentada.
 */
export const demoMotorcycles: readonly Motorcycle[] = [
  { id: "yamaha-mt-03", brand: "Yamaha", model: "MT-03", year: 2025, color: "Azul", engineCapacityCc: 321 },
  { id: "honda-cb-500f", brand: "Honda", model: "CB 500F", year: 2025, color: "Vermelha", engineCapacityCc: 471 },
  { id: "bmw-g-310-r", brand: "BMW", model: "G 310 R", year: 2025, color: "Branca", engineCapacityCc: 313 },
  { id: "bajaj-dominar-400", brand: "Bajaj", model: "Dominar 400", year: 2025, color: "Preta", engineCapacityCc: 373 },
  { id: "royal-enfield-himalayan-450", brand: "Royal Enfield", model: "Himalayan 450", year: 2025, color: "Cinza", engineCapacityCc: 452 },
  { id: "suzuki-gsx-s750", brand: "Suzuki", model: "GSX-S750", year: 2025, color: "Azul", engineCapacityCc: 749 },
  { id: "zontes-r350", brand: "Zontes", model: "R350", year: 2025, color: "Preta", engineCapacityCc: 348 },
  { id: "sym-nh-300", brand: "SYM (Dafra)", model: "NH 300", year: 2025, color: "Vermelha", engineCapacityCc: 278 },
  { id: "haojue-dr-160", brand: "Haojue", model: "DR 160", year: 2025, color: "Cinza", engineCapacityCc: 162 },
  { id: "cfmoto-450nk", brand: "CFMoto", model: "450NK", year: 2025, color: "Branca", engineCapacityCc: 449 },
];

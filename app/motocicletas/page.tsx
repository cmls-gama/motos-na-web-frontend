import type { Metadata } from "next";
import { MotorcycleCatalog } from "@/components/motorcycles/motorcycle-catalog";
import { getMotorcycles } from "@/lib/motorcycles";
export const metadata: Metadata = { title: "Catálogo de motocicletas" };
export default function MotorcyclesPage() { return <MotorcycleCatalog motorcycles={getMotorcycles()} />; }

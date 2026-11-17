import type { Metadata } from "next";
import { ComparisonPage } from "@/components/comparison/comparison-page";
import { getMotorcycles } from "@/lib/motorcycles";
export const metadata: Metadata = { title: "Comparar motocicletas" };
export default function ComparePage() { return <ComparisonPage catalog={getMotorcycles()} />; }

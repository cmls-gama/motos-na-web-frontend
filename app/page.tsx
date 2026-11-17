import { MotorcycleCatalog } from "@/components/motorcycles/motorcycle-catalog";
import { getMotorcycles } from "@/lib/motorcycles";

export default function Home() {
  return <MotorcycleCatalog motorcycles={getMotorcycles()} withHero />;
}
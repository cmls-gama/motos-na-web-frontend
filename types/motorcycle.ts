/** Campos de negócio disponíveis no contrato REST do backend. */
export interface Motorcycle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  engineCapacityCc: number;
}

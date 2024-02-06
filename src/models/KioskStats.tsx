
interface Sale {
  id: number,
  uuid: string,
  amount: number,
  currency: string,
  last_4_digits: string,
  created_at: Date
}

interface SaleAggregation {
  date: number,
  subtotal: number,
  numtrx: number
}

interface KioskStats {
  // version: string
  sales: Sale[]
  groups: SaleAggregation[]
}

export default KioskStats;
export type { Sale };

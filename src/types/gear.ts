export interface GearItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitWeight: number; // in grams
}

export interface CategorySummary {
  category: string;
  totalWeight: number; // in grams
  totalQuantity: number;
  percentage: number; // 0 to 100
  itemsCount: number;
}

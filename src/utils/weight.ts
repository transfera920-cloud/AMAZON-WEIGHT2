/**
 * Utility functions for weight calculation and formatting
 */

/**
 * Calculates total weight of an item: quantity * unitWeight
 * Handles precision to avoid floating point issues
 */
export function calculateItemTotal(quantity: number, unitWeight: number): number {
  const safeQty = Math.max(1, Math.floor(Number(quantity) || 1));
  const safeWeight = Math.max(0, Number(unitWeight) || 0);
  // Round to 1 decimal place internally for sub-gram accuracy without floating quirks
  return Math.round(safeQty * safeWeight * 10) / 10;
}

/**
 * Formats weight in grams (g)
 * If integer, display integer (e.g. 700 g, 12,350 g)
 * If has decimals, display up to 1 decimal place (e.g. 700.5 g)
 */
export function formatGrams(grams: number): string {
  const safe = Math.max(0, Number(grams) || 0);
  const rounded = Math.round(safe * 10) / 10;
  return new Intl.NumberFormat('zh-TW', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(rounded);
}

/**
 * Converts grams to kilograms (kg), rounded to 2 decimal places
 * Example: 12350 g -> 12.35 kg; 700 g -> 0.70 kg
 */
export function formatKilograms(grams: number): string {
  const safe = Math.max(0, Number(grams) || 0);
  const kg = safe / 1000;
  return kg.toFixed(2);
}

/**
 * Format percentage (e.g. 15.4%)
 */
export function formatPercentage(part: number, total: number): string {
  if (!total || total <= 0 || !part || part <= 0) return '0.0%';
  const pct = (part / total) * 100;
  return `${pct.toFixed(1)}%`;
}

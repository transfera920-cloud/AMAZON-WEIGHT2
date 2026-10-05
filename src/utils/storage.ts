import { GearItem } from '../types/gear';
import { DEFAULT_CATEGORIES, SAMPLE_GEAR_ITEMS } from '../constants/defaultCategories';

export const STORAGE_KEY_GEAR = 'amazon-hike-tool01-gear-list-v1';
export const STORAGE_KEY_CATEGORIES = 'amazon-hike-tool01-categories-v1';

/**
 * Loads gear items from localStorage.
 * - If the key does not exist at all (first-time user), returns a deep copy of SAMPLE_GEAR_ITEMS.
 * - If the key exists (even if empty array []), faithfully returns the stored array.
 * - If corrupted or exception occurs, falls back to deep copy of default list to prevent white screen.
 */
export function loadGearItemsFromStorage(): GearItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GEAR);
    // Key does not exist -> first time visiting, load default 12kg gear list
    if (raw === null) {
      return SAMPLE_GEAR_ITEMS.map((item) => ({ ...item }));
    }

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => ({
        id: String(item.id || 'gear_' + Math.random().toString(36).substring(2, 9)),
        name: String(item.name || '').trim(),
        category: String(item.category || '其他').trim(),
        quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
        unitWeight: Math.max(0, Number(item.unitWeight) || 0),
      }));
    }
  } catch (error) {
    console.warn('Failed to load gear items from localStorage:', error);
    // Fallback to default list on exception to avoid blank page
    return SAMPLE_GEAR_ITEMS.map((item) => ({ ...item }));
  }

  return SAMPLE_GEAR_ITEMS.map((item) => ({ ...item }));
}

export function saveGearItemsToStorage(items: GearItem[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_GEAR, JSON.stringify(items));
    return true;
  } catch (error) {
    console.warn('Failed to save gear items to localStorage:', error);
    return false;
  }
}

export function loadCategoriesFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (!raw) return [...DEFAULT_CATEGORIES];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // sanitize and deduplicate
      const unique = Array.from(
        new Set(
          parsed
            .map((c) => String(c).trim())
            .filter((c) => c.length > 0)
        )
      );
      if (unique.length > 0) {
        return unique;
      }
    }
  } catch (error) {
    console.warn('Failed to load categories from localStorage:', error);
  }
  return [...DEFAULT_CATEGORIES];
}

export function saveCategoriesToStorage(categories: string[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    return true;
  } catch (error) {
    console.warn('Failed to save categories to localStorage:', error);
    return false;
  }
}

/**
 * Clears gear items from storage.
 * Explicitly sets key to "[]" instead of removeItem, so that after clearing
 * and refreshing, it stays empty and does not reload the default list.
 */
export function clearTool01Storage(): boolean {
  try {
    localStorage.setItem(STORAGE_KEY_GEAR, JSON.stringify([]));
    // Keep or reset categories to default
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    return true;
  } catch (error) {
    console.warn('Failed to clear tool01 storage:', error);
    return false;
  }
}

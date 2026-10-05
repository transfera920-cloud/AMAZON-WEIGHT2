import React, { useState, useEffect } from 'react';
import { GearItem } from '../types/gear';
import {
  loadGearItemsFromStorage,
  saveGearItemsToStorage,
  loadCategoriesFromStorage,
  saveCategoriesToStorage,
  clearTool01Storage,
} from '../utils/storage';
import { DEFAULT_CATEGORIES, SAMPLE_GEAR_ITEMS } from '../constants/defaultCategories';
import { WeightSummary } from './WeightSummary';
import { GearList } from './GearList';
import { CategoryManagerModal } from './CategoryManagerModal';
import { EditGearModal } from './EditGearModal';
import { Lightbulb, Compass, ShieldCheck } from 'lucide-react';

export const Tool01Page: React.FC = () => {
  // State: Gear items
  const [items, setItems] = useState<GearItem[]>(() => loadGearItemsFromStorage());
  // State: Categories
  const [categories, setCategories] = useState<string[]>(() => loadCategoriesFromStorage());

  // Category filter selection for clicking on category cards
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Modals state
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);

  // Save to localStorage whenever items change
  useEffect(() => {
    saveGearItemsToStorage(items);
  }, [items]);

  // Save to localStorage whenever categories change
  useEffect(() => {
    saveCategoriesToStorage(categories);
  }, [categories]);

  // Handlers for Items
  const handleAddItem = (newItemData: Omit<GearItem, 'id'>) => {
    const newItem: GearItem = {
      ...newItemData,
      id: 'gear_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const handleEditItem = (updatedItem: GearItem) => {
    setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Categories
  const handleAddCategory = (newCatName: string): boolean => {
    if (categories.includes(newCatName)) return false;
    setCategories((prev) => [...prev, newCatName]);
    return true;
  };

  const handleRenameCategory = (oldName: string, newName: string): boolean => {
    if (categories.includes(newName) && oldName !== newName) return false;
    setCategories((prev) => prev.map((c) => (c === oldName ? newName : c)));
    // Also rename in existing items
    setItems((prev) =>
      prev.map((item) => (item.category === oldName ? { ...item, category: newName } : item))
    );
    if (selectedCategory === oldName) {
      setSelectedCategory(newName);
    }
    return true;
  };

  const handleDeleteCategory = (
    categoryToDelete: string,
    action: 'delete_items' | 'move_items',
    targetCategory?: string
  ) => {
    // Filter out category
    setCategories((prev) => prev.filter((c) => c !== categoryToDelete));

    if (action === 'delete_items') {
      setItems((prev) => prev.filter((item) => item.category !== categoryToDelete));
    } else if (action === 'move_items' && targetCategory) {
      setItems((prev) =>
        prev.map((item) =>
          item.category === categoryToDelete ? { ...item, category: targetCategory } : item
        )
      );
    }

    if (selectedCategory === categoryToDelete) {
      setSelectedCategory(null);
    }
  };

  const handleResetDefaultCategories = () => {
    setCategories([...DEFAULT_CATEGORIES]);
    // Move any items whose category is not in default categories to '其他'
    setItems((prev) =>
      prev.map((item) =>
        DEFAULT_CATEGORIES.includes(item.category) ? item : { ...item, category: '其他' }
      )
    );
  };

  // Clear all items
  const handleClearAll = () => {
    setItems([]);
    clearTool01Storage();
  };

  // Load sample packing list (only when explicitly requested by user)
  const handleLoadSampleData = () => {
    setItems(SAMPLE_GEAR_ITEMS.map((item) => ({ ...item })));
    // Ensure all sample categories exist
    const newCats = Array.from(new Set([...categories, ...SAMPLE_GEAR_ITEMS.map((i) => i.category)]));
    setCategories(newCats);
    // Smoothly scroll to weight summary section
    setTimeout(() => {
      const el = document.getElementById('weight-summary-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Main Title Section - Only ONE H1 */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 tracking-tight">
          登山裝備重量計算工具
        </h1>
        <p className="mt-2 text-stone-300 text-sm sm:text-base leading-relaxed max-w-4xl">
          實用的登山裝備重量計算工具，可依分類自訂整理背包各項裝備，即時自動統計單件、類別與整體背包重量，資料安全儲存於瀏覽器，是您規劃百岳與長程縱走輕量化的最佳幫手。
        </p>
      </div>

      {/* Weight Summary Section (Grand total, Heaviest category, Progress Bar) */}
      <div id="weight-summary-section">
        <WeightSummary
          items={items}
          categories={categories}
          onSelectCategory={(cat) => setSelectedCategory(cat || null)}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Main Gear List and Operations */}
      <div className="mt-8">
        <GearList
          items={items}
          categories={categories}
          selectedCategory={selectedCategory}
          onAddItem={handleAddItem}
          onEditItem={(item) => setEditingItem(item)}
          onDeleteItem={handleDeleteItem}
          onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
          onClearAll={handleClearAll}
          onLoadSampleData={handleLoadSampleData}
        />
      </div>

      {/* Lightweight Guide & Mountain Tips Section (Helpful, dark styling) */}
      <section aria-label="工具使用指引與輕量化提醒" className="mt-12 pt-8 border-t border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 shadow-2xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Compass className="w-4 h-4" />
              <span>快速使用 3 步驟</span>
            </div>
            <ol className="text-xs text-stone-400 space-y-1.5 list-decimal pl-4 leading-relaxed">
              <li>於上方輸入裝備品名、分類、數量與單重（g）。</li>
              <li>系統將自動以公克為基準精準計算，並同步換算公斤（kg）。</li>
              <li>點擊各分類卡片可單獨篩選檢視，隨時管理自訂分類。</li>
            </ol>
          </div>

          <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 shadow-2xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>輕量化三大件原則</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              登山背包重量主要來自「三大件」（帳篷遮蔽、睡眠系統、背負系統）。在上方統計中特別留意這三個類別的占比，往往是減少負重最顯著的突破口。
            </p>
          </div>

          <div className="bg-stone-900 p-5 rounded-xl border border-stone-800 shadow-2xs">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>無痕山林與安全儲存</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              本工具完全在您的瀏覽器端本機執行，無需註冊或連線資料庫，尊重隱私。精確打包避免攜帶過度無用冗餘物，同時確保必備安全急救裝備不被忽視。
            </p>
          </div>
        </div>
      </section>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        categories={categories}
        items={items}
        onAddCategory={handleAddCategory}
        onRenameCategory={handleRenameCategory}
        onDeleteCategory={handleDeleteCategory}
        onResetDefaultCategories={handleResetDefaultCategories}
      />

      {/* Edit Gear Modal */}
      <EditGearModal
        isOpen={!!editingItem}
        gearItem={editingItem}
        categories={categories}
        onClose={() => setEditingItem(null)}
        onSave={handleEditItem}
      />
    </div>
  );
};

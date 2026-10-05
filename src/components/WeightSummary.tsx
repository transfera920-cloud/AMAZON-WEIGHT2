import React, { useMemo } from 'react';
import { GearItem, CategorySummary } from '../types/gear';
import { formatGrams, formatKilograms, formatPercentage, calculateItemTotal } from '../utils/weight';
import { Scale, PackageCheck, Flame, BarChart3 } from 'lucide-react';

interface WeightSummaryProps {
  items: GearItem[];
  categories: string[];
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string | null;
}

// Visual color palette for top categories (clean mountain/earth tone)
const CATEGORY_COLORS = [
  'bg-emerald-600',
  'bg-teal-600',
  'bg-amber-600',
  'bg-orange-600',
  'bg-sky-600',
  'bg-indigo-600',
  'bg-rose-600',
  'bg-stone-600',
  'bg-lime-600',
  'bg-cyan-600',
  'bg-violet-600',
  'bg-yellow-600',
];

export const WeightSummary: React.FC<WeightSummaryProps> = ({
  items,
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  // Calculate total grand weight
  const totalWeight = useMemo(() => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.unitWeight), 0);
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (Math.max(1, Math.floor(Number(item.quantity) || 1))), 0);
  }, [items]);

  // Calculate summaries per category
  const categorySummaries: CategorySummary[] = useMemo(() => {
    // Group weights
    const map = new Map<string, { weight: number; qty: number; count: number }>();
    
    // Initialize all existing categories
    categories.forEach((cat) => {
      map.set(cat, { weight: 0, qty: 0, count: 0 });
    });

    items.forEach((item) => {
      const cat = item.category || '其他';
      const current = map.get(cat) || { weight: 0, qty: 0, count: 0 };
      const itemWeight = calculateItemTotal(item.quantity, item.unitWeight);
      map.set(cat, {
        weight: current.weight + itemWeight,
        qty: current.qty + (Math.max(1, Math.floor(Number(item.quantity) || 1))),
        count: current.count + 1,
      });
    });

    const result: CategorySummary[] = [];
    map.forEach((data, cat) => {
      if (data.count > 0 || categories.includes(cat)) {
        const pct = totalWeight > 0 ? (data.weight / totalWeight) * 100 : 0;
        result.push({
          category: cat,
          totalWeight: data.weight,
          totalQuantity: data.qty,
          percentage: pct,
          itemsCount: data.count,
        });
      }
    });

    // Sort by weight descending
    result.sort((a, b) => b.totalWeight - a.totalWeight);
    return result;
  }, [items, categories, totalWeight]);

  // Identify heaviest category among those with items > 0
  const activeCategories = categorySummaries.filter((c) => c.itemsCount > 0 && c.totalWeight > 0);
  const heaviestCategory = activeCategories.length > 0 ? activeCategories[0] : null;

  return (
    <section aria-label="裝備重量總覽與分類統計" className="space-y-6">
      {/* Top Prominent Weight Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Main Grand Total */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-1">
              <Scale className="w-4 h-4" />
              <span>整體裝備總重量 (Total Pack Weight)</span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-mono">
                {formatGrams(totalWeight)}
                <span className="text-xl sm:text-2xl font-bold ml-1.5 text-stone-400">g</span>
              </div>
            </div>
          </div>

          {/* Quick Stats: Items count & Heaviest category */}
          <div className="bg-stone-800/80 rounded-xl p-4 border border-stone-700/60 flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-stone-300 text-xs sm:text-sm">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>裝備總件數</span>
              </div>
              <span className="text-lg font-bold text-white font-mono">
                {items.length} <span className="text-xs font-normal text-stone-400">項 ({totalQuantity} 件)</span>
              </span>
            </div>

            <div className="pt-2 border-t border-stone-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-stone-300 text-xs sm:text-sm">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>重量榜首</span>
              </div>
              {heaviestCategory ? (
                <div className="text-right">
                  <span className="inline-block bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2 py-0.5 rounded font-semibold">
                    {heaviestCategory.category}
                  </span>
                  <div className="text-xs text-stone-400 mt-0.5 font-mono">
                    {formatPercentage(heaviestCategory.totalWeight, totalWeight)} ({formatKilograms(heaviestCategory.totalWeight)} kg)
                  </div>
                </div>
              ) : (
                <span className="text-xs text-stone-500">尚無裝備資料</span>
              )}
            </div>
          </div>
        </div>

        {/* Lightweight Pure CSS Segmented Progress Bar */}
        {totalWeight > 0 && activeCategories.length > 0 && (
          <div className="mt-6 pt-5 border-t border-stone-800">
            <div className="flex justify-between items-center text-xs text-stone-300 mb-2">
              <span className="flex items-center space-x-1 font-medium">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>各類別重量占比長條</span>
              </span>
              <span className="text-stone-400">共 {activeCategories.length} 個類別有裝備</span>
            </div>
            
            {/* Multi-segment bar */}
            <div className="w-full h-3.5 bg-stone-800 rounded-full overflow-hidden flex shadow-inner">
              {activeCategories.map((cat, idx) => {
                const colorClass = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
                const widthPct = Math.max(1, (cat.totalWeight / totalWeight) * 100);
                return (
                  <div
                    key={cat.category}
                    style={{ width: `${widthPct}%` }}
                    className={`${colorClass} h-full transition-all duration-300 relative group cursor-pointer`}
                    title={`${cat.category}: ${formatGrams(cat.totalWeight)} g (${cat.percentage.toFixed(1)}%)`}
                    onClick={() => onSelectCategory && onSelectCategory(cat.category === selectedCategory ? '' : cat.category)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Category Breakdown Cards (Sorted by Weight Descending) */}
      <div className="bg-stone-900 rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-2">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center space-x-2">
              <span>各分類重量統計與排序</span>
              <span className="text-xs font-normal text-stone-400">（依重量由重到輕排列）</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              清楚掌握哪一類最重，幫助快速鎖定輕量化切入點。
            </p>
          </div>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => onSelectCategory && onSelectCategory('')}
              className="text-xs font-medium text-emerald-400 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/50 px-2.5 py-1 rounded transition-colors self-start sm:self-auto"
            >
              清除分類篩選（目前顯示：{selectedCategory}）
            </button>
          )}
        </div>

        {activeCategories.length === 0 ? (
          <div className="py-8 text-center text-stone-400 text-sm">
            目前尚未新增裝備，請於下方新增裝備或點選「載入 12 公斤建議清單」立即體驗。
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4">
            {activeCategories.map((cat, idx) => {
              const isHeaviest = idx === 0;
              const colorClass = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
              const isSelected = selectedCategory === cat.category;

              return (
                <div
                  key={cat.category}
                  onClick={() => onSelectCategory && onSelectCategory(isSelected ? '' : cat.category)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-950/50 ring-2 ring-emerald-500/20'
                      : isHeaviest
                      ? 'border-amber-600/50 bg-amber-950/30 hover:bg-amber-950/50 shadow-2xs'
                      : 'border-stone-800 bg-stone-800/60 hover:bg-stone-800/90'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className={`w-3 h-3 rounded-full shrink-0 ${colorClass}`} />
                        <span className="font-bold text-stone-100 text-sm truncate">
                          {cat.category}
                        </span>
                      </div>
                      {isHeaviest && (
                        <span className="shrink-0 text-[11px] font-bold text-amber-300 bg-amber-900/60 border border-amber-600/40 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                          <Flame className="w-3 h-3" />
                          <span>最重類別</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-extrabold text-stone-100 font-mono">
                        {formatGrams(cat.totalWeight)} <span className="text-xs font-medium text-stone-400">g</span>
                      </span>
                      <span className="text-sm font-semibold text-emerald-400 font-mono">
                        {formatKilograms(cat.totalWeight)} kg
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-700/50">
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span>占比 {formatPercentage(cat.totalWeight, totalWeight)}</span>
                      <span>{cat.itemsCount} 項 ({cat.totalQuantity} 件)</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-stone-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${colorClass} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${Math.min(100, Math.max(2, cat.percentage))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

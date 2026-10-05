import React, { useState } from 'react';
import { GearItem } from '../types/gear';
import { calculateItemTotal, formatGrams, formatKilograms, formatPercentage } from '../utils/weight';
import { GEAR_PRESETS, DEFAULT_PRESET_KG } from '../constants/presets';
import {
  Plus,
  Trash2,
  Edit2,
  FolderCog,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Info,
  AlertCircle,
} from 'lucide-react';

interface GearListProps {
  items: GearItem[];
  categories: string[];
  selectedCategory: string | null;
  onAddItem: (item: Omit<GearItem, 'id'>) => void;
  onEditItem: (item: GearItem) => void;
  onDeleteItem: (id: string) => void;
  onOpenCategoryManager: () => void;
  onClearAll: () => void;
  onLoadSampleData: (items: GearItem[]) => void;
}

export const GearList: React.FC<GearListProps> = ({
  items,
  categories,
  selectedCategory,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onOpenCategoryManager,
  onClearAll,
  onLoadSampleData,
}) => {
  // Preset selection state
  const [selectedPresetKg, setSelectedPresetKg] = useState<number>(DEFAULT_PRESET_KG);
  const currentPreset =
    GEAR_PRESETS.find((p) => p.kg === selectedPresetKg) || GEAR_PRESETS[1];

  // New Item Quick Form State
  const [quickName, setQuickName] = useState('');
  const [quickCategory, setQuickCategory] = useState(categories[0] || '其他');
  const [quickQty, setQuickQty] = useState<number | string>(1);
  const [quickWeight, setQuickWeight] = useState<number | string>('');
  const [quickError, setQuickError] = useState('');

  // Delete confirmation state
  const [itemToDelete, setItemToDelete] = useState<GearItem | null>(null);

  // Clear all confirmation state
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load suggested list confirmation state (when items already exist)
  const [showLoadConfirm, setShowLoadConfirm] = useState(false);

  // Collapsed categories state
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryCollapse = (cat: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  // Grand total weight for percentages
  const grandTotalWeight = items.reduce(
    (sum, item) => sum + calculateItemTotal(item.quantity, item.unitWeight),
    0
  );

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickName.trim();
    if (!trimmed) {
      setQuickError('請輸入裝備名稱');
      return;
    }

    const qty = Math.max(1, Math.floor(Number(quickQty) || 1));
    const weight = Math.max(0, Number(quickWeight) || 0);

    onAddItem({
      name: trimmed,
      category: quickCategory || categories[0] || '其他',
      quantity: qty,
      unitWeight: weight,
    });

    setQuickName('');
    setQuickWeight('');
    setQuickQty(1);
    setQuickError('');
  };

  // Click handler for suggested list button
  const handleLoadSuggestedClick = () => {
    if (items.length === 0) {
      // If list is empty, directly load without confirmation
      onLoadSampleData(currentPreset.items);
    } else {
      // If items exist, show confirmation dialog first
      setShowLoadConfirm(true);
    }
  };

  // Filtered categories to display
  const displayCategories = selectedCategory
    ? categories.filter((c) => c === selectedCategory)
    : categories;

  return (
    <section aria-label="裝備清單與操作" className="space-y-6">
      {/* Quick Add Gear Box */}
      <div className="bg-stone-900 rounded-2xl p-5 sm:p-6 shadow-xs border border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-stone-800 gap-3">
          <div>
            <h2 className="text-lg font-bold text-stone-100 flex items-center space-x-2">
              <span>快速新增裝備</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              輸入裝備名稱、分類、數量與單件重量（g），系統即時計算。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
            {/* Preset Selector */}
            <select
              value={selectedPresetKg}
              onChange={(e) => setSelectedPresetKg(Number(e.target.value))}
              aria-label="選擇建議裝備清單"
              className="flex-1 sm:flex-none min-h-[44px] px-3 py-2 text-xs sm:text-sm font-medium border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {GEAR_PRESETS.map((preset) => (
                <option key={preset.kg} value={preset.kg}>
                  {preset.label}
                </option>
              ))}
            </select>

            {/* Primary prominent button: 載入 {所選公斤數} 公斤建議清單 */}
            <button
              type="button"
              onClick={handleLoadSuggestedClick}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 min-h-[44px] text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
              title={currentPreset.description}
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              <span>載入 {currentPreset.kg} 公斤建議清單</span>
            </button>

            {/* Manage categories button */}
            <button
              type="button"
              onClick={onOpenCategoryManager}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 min-h-[44px] text-xs sm:text-sm font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 hover:text-white border border-stone-700 rounded-lg transition-colors"
            >
              <FolderCog className="w-4 h-4 text-emerald-400" />
              <span>管理分類</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleQuickAdd} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            {/* Category Select */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                分類
              </label>
              <select
                value={quickCategory}
                onChange={(e) => setQuickCategory(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Gear Name Input */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                裝備品名 <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={quickName}
                onChange={(e) => {
                  setQuickName(e.target.value);
                  if (quickError) setQuickError('');
                }}
                placeholder="例如：登山攻頂爐頭、防水外套"
                className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Quantity Input */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                數量（件）
              </label>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quickQty}
                onChange={(e) => setQuickQty(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center"
              />
            </div>

            {/* Unit Weight Input */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                單重 (g)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={quickWeight}
                  onChange={(e) => setQuickWeight(e.target.value)}
                  placeholder="0"
                  className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-right"
                />
                <button
                  type="submit"
                  className="shrink-0 min-h-[44px] px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center space-x-1 shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>加入</span>
                </button>
              </div>
            </div>
          </div>

          {quickError && <p className="text-xs text-rose-400">{quickError}</p>}
        </form>
      </div>

      {/* Main Gear List or Empty State */}
      {items.length === 0 ? (
        /* Empty State Card with Suggested List Action */
        <div className="bg-stone-900 rounded-2xl p-8 sm:p-12 border border-stone-800 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-800/80 mx-auto flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-stone-100">目前沒有裝備</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              目前沒有裝備。可以自己新增，或在上方選擇 10.5 至 15 公斤的建議清單（含飲水與糧食）作為起點，目前選擇：{currentPreset.kg} 公斤（{currentPreset.description}）。
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleLoadSuggestedClick}
              className="inline-flex items-center space-x-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-xs"
              title={currentPreset.description}
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              <span>載入 {currentPreset.kg} 公斤建議清單</span>
            </button>
          </div>
        </div>
      ) : (
        /* Grouped by Category */
        <div className="space-y-4">
          {displayCategories.map((category) => {
            const catItems = items.filter((i) => i.category === category);
            const isCollapsed = collapsedCategories[category];

            const catWeight = catItems.reduce(
              (sum, item) => sum + calculateItemTotal(item.quantity, item.unitWeight),
              0
            );
            const catQty = catItems.reduce(
              (sum, item) => sum + (Math.max(1, Math.floor(Number(item.quantity) || 1))),
              0
            );
            const catPercentage =
              grandTotalWeight > 0 ? (catWeight / grandTotalWeight) * 100 : 0;

            // If no items in category and filtering is active, show notice
            if (catItems.length === 0 && selectedCategory) {
              return (
                <div key={category} className="bg-stone-900 rounded-xl p-6 text-center text-stone-400 text-sm border border-stone-800">
                  此分類「{category}」目前尚無裝備。
                </div>
              );
            }

            return (
              <div
                key={category}
                className="bg-stone-900 rounded-xl shadow-xs border border-stone-800 overflow-hidden"
              >
                {/* Category Group Header */}
                <div
                  onClick={() => toggleCategoryCollapse(category)}
                  className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-stone-850 hover:bg-stone-800 cursor-pointer transition-colors border-b border-stone-800 select-none"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <button
                      type="button"
                      className="text-stone-400 hover:text-stone-200 p-0.5"
                      aria-label={isCollapsed ? '展開分類' : '收合分類'}
                    >
                      {isCollapsed ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <span className="font-bold text-stone-100 text-sm sm:text-base truncate">
                      {category}
                    </span>
                    <span className="text-xs text-stone-400 bg-stone-800 border border-stone-700/60 px-2 py-0.5 rounded-full font-mono">
                      {catItems.length} 項 ({catQty} 件)
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-right">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
                      <span className="text-sm sm:text-base font-extrabold text-stone-100 font-mono">
                        {formatGrams(catWeight)} g
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        ({formatKilograms(catWeight)} kg · {catPercentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items List inside Category */}
                {!isCollapsed && (
                  <div className="p-0">
                    {catItems.length === 0 ? (
                      <div className="py-4 px-5 text-xs text-stone-400 italic flex items-center justify-between">
                        <span>此分類目前無裝備項目</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickCategory(category);
                            const inputEl = document.querySelector('input[placeholder*="登山攻頂爐頭"]') as HTMLInputElement;
                            inputEl?.focus();
                          }}
                          className="text-emerald-400 hover:underline inline-flex items-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>在此分類新增</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="bg-stone-900/80 text-stone-400 text-xs border-b border-stone-800 font-medium">
                                <th className="py-2.5 px-4">品名</th>
                                <th className="py-2.5 px-3 text-center w-20">數量</th>
                                <th className="py-2.5 px-3 text-right w-28">單件重量</th>
                                <th className="py-2.5 px-3 text-right w-32">該項總重</th>
                                <th className="py-2.5 px-3 text-right w-24">占背包</th>
                                <th className="py-2.5 px-4 text-center w-24">操作</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-800">
                              {catItems.map((item) => {
                                const itemTotal = calculateItemTotal(item.quantity, item.unitWeight);
                                const pct = grandTotalWeight > 0 ? (itemTotal / grandTotalWeight) * 100 : 0;

                                return (
                                  <tr key={item.id} className="hover:bg-stone-800/60 transition-colors group">
                                    <td className="py-3 px-4 font-medium text-stone-200">
                                      {item.name}
                                    </td>
                                    <td className="py-3 px-3 text-center font-mono text-stone-300">
                                      {item.quantity}
                                    </td>
                                    <td className="py-3 px-3 text-right font-mono text-stone-400">
                                      {formatGrams(item.unitWeight)} g
                                    </td>
                                    <td className="py-3 px-3 text-right font-mono">
                                      <div className="font-bold text-stone-100">
                                        {formatGrams(itemTotal)} g
                                      </div>
                                      <div className="text-[11px] text-stone-400">
                                        {formatKilograms(itemTotal)} kg
                                      </div>
                                    </td>
                                    <td className="py-3 px-3 text-right font-mono text-xs text-stone-400">
                                      {pct.toFixed(1)}%
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                      <div className="inline-flex items-center space-x-1">
                                        <button
                                          type="button"
                                          onClick={() => onEditItem(item)}
                                          className="p-1.5 text-stone-400 hover:text-emerald-400 hover:bg-emerald-950/60 rounded transition-colors"
                                          title="修改裝備"
                                          aria-label={`修改 ${item.name}`}
                                        >
                                          <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setItemToDelete(item)}
                                          className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-rose-950/60 rounded transition-colors"
                                          title="刪除裝備"
                                          aria-label={`刪除 ${item.name}`}
                                        >
                                          <Trash2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Mobile Card / High Density Stacked View */}
                        <div className="md:hidden divide-y divide-stone-800">
                          {catItems.map((item) => {
                            const itemTotal = calculateItemTotal(item.quantity, item.unitWeight);
                            const pct = grandTotalWeight > 0 ? (itemTotal / grandTotalWeight) * 100 : 0;

                            return (
                              <div key={item.id} className="p-4 hover:bg-stone-800/40 transition-colors">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-stone-100 break-words">
                                      {item.name}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-stone-400 mt-1 font-mono">
                                      <span>數量: {item.quantity}</span>
                                      <span>·</span>
                                      <span>單重: {formatGrams(item.unitWeight)} g</span>
                                      <span>·</span>
                                      <span>占比: {pct.toFixed(1)}%</span>
                                    </div>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <div className="text-base font-bold text-stone-100 font-mono">
                                      {formatGrams(itemTotal)} g
                                    </div>
                                    <div className="text-xs text-emerald-400 font-mono">
                                      {formatKilograms(itemTotal)} kg
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-end space-x-2 mt-3 pt-2 border-t border-stone-800">
                                  <button
                                    type="button"
                                    onClick={() => onEditItem(item)}
                                    className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-lg inline-flex items-center space-x-1 border border-stone-700/60"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                    <span>修改</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setItemToDelete(item)}
                                    className="min-h-[40px] px-3 py-1.5 text-xs font-medium text-rose-400 bg-rose-950/50 hover:bg-rose-900/60 rounded-lg inline-flex items-center space-x-1 border border-rose-800/50"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>刪除</span>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Auxiliary Actions & Storage Note */}
      <div className="bg-stone-900 rounded-2xl p-5 border border-stone-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Clear All Data Button (only when items exist) */}
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-rose-400 bg-stone-800 hover:bg-rose-950/60 border border-rose-800/60 rounded-lg transition-colors shadow-2xs min-h-[40px]"
              >
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <span>清空全部裝備資料</span>
              </button>
            )}
          </div>

          <div className="text-xs text-stone-400 font-mono">
            目前共有 {items.length} 項裝備清單
          </div>
        </div>

        {/* LocalStorage Note */}
        <div className="flex items-start space-x-2 text-xs text-stone-400 pt-2 border-t border-stone-800">
          <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <p>
            本工具資料僅儲存於此瀏覽器中，不會上傳至伺服器；更換裝置或清除瀏覽器快取紀錄將會重置裝備清單。
          </p>
        </div>
      </div>

      {/* Load Suggested List Confirmation Modal */}
      {showLoadConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-800 space-y-4">
            <div className="flex items-start space-x-3 text-stone-100">
              <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-100">載入建議清單？</h4>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                  目前清單的 {items.length} 項裝備將被取代為 {currentPreset.items.length} 項建議裝備（{currentPreset.description}，總重 {currentPreset.kg} kg）。此動作無法復原。
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setShowLoadConfirm(false)}
                className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium text-stone-300 bg-stone-800 border border-stone-700 hover:bg-stone-700 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  onLoadSampleData(currentPreset.items);
                  setShowLoadConfirm(false);
                }}
                className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-2xs"
              >
                確定載入
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Item Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-800 space-y-4">
            <div className="flex items-start space-x-3 text-stone-100">
              <div className="w-10 h-10 rounded-full bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-100">確認刪除此裝備？</h4>
                <p className="text-sm text-stone-300 mt-1">
                  「<strong className="text-white">{itemToDelete.name}</strong>」（{itemToDelete.quantity} 件，單重 {formatGrams(itemToDelete.unitWeight)} g）將從清單中移除。
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium text-stone-300 bg-stone-800 border border-stone-700 hover:bg-stone-700 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteItem(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors shadow-2xs"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-800 space-y-4">
            <div className="flex items-start space-x-3 text-stone-100">
              <div className="w-10 h-10 rounded-full bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-100">確定要清空所有裝備資料？</h4>
                <p className="text-xs text-stone-300 mt-1">
                  此操作將清除全部 {items.length} 項裝備，且無法復原。分類設定將予以保留。
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium text-stone-300 bg-stone-800 border border-stone-700 hover:bg-stone-700 rounded-lg"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                }}
                className="min-h-[40px] px-4 py-2 text-xs sm:text-sm font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-2xs"
              >
                確認全部清空
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

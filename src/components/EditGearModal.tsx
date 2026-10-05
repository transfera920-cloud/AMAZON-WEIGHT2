import React, { useState, useEffect } from 'react';
import { GearItem } from '../types/gear';
import { calculateItemTotal, formatGrams, formatKilograms } from '../utils/weight';
import { X, Check } from 'lucide-react';

interface EditGearModalProps {
  isOpen: boolean;
  onClose: () => void;
  gearItem: GearItem | null;
  categories: string[];
  onSave: (updatedItem: GearItem) => void;
}

export const EditGearModal: React.FC<EditGearModalProps> = ({
  isOpen,
  onClose,
  gearItem,
  categories,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number | string>(1);
  const [unitWeight, setUnitWeight] = useState<number | string>(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (gearItem) {
      setName(gearItem.name);
      setCategory(gearItem.category || categories[0] || '其他');
      setQuantity(gearItem.quantity);
      setUnitWeight(gearItem.unitWeight);
      setError('');
    }
  }, [gearItem, categories]);

  if (!isOpen || !gearItem) return null;

  const numQty = Math.max(1, Math.floor(Number(quantity) || 1));
  const numWeight = Math.max(0, Number(unitWeight) || 0);
  const subtotal = calculateItemTotal(numQty, numWeight);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('請輸入裝備名稱');
      return;
    }

    onSave({
      id: gearItem.id,
      name: trimmedName,
      category: category || '其他',
      quantity: numQty,
      unitWeight: numWeight,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-stone-900 rounded-2xl max-w-md w-full shadow-2xl border border-stone-800 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-850">
          <div>
            <h3 className="text-lg font-bold text-stone-100">編輯裝備</h3>
            <p className="text-xs text-stone-400 mt-0.5">修改品名、分類、數量與單件重量</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200 p-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              裝備分類
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">
              裝備名稱 <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="例如：超輕量雙人帳篷"
              className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
          </div>

          {/* Quantity and Unit Weight side-by-side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                數量（正整數）
              </label>
              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                單件重量 (g)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={unitWeight}
                onChange={(e) => setUnitWeight(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-right"
              />
            </div>
          </div>

          {/* Real-time Subtotal Preview */}
          <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-xl p-3.5 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300">
              該項總重量（{numQty} 件 × {numWeight} g）
            </span>
            <div className="text-right">
              <span className="text-base font-bold text-emerald-400 font-mono">
                {formatGrams(subtotal)} g
              </span>
              <span className="text-xs text-emerald-300/80 font-mono ml-1.5">
                ({formatKilograms(subtotal)} kg)
              </span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2 text-sm font-medium text-stone-300 bg-stone-800 border border-stone-700 hover:bg-stone-750 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="min-h-[44px] inline-flex items-center space-x-1.5 px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-2xs"
            >
              <Check className="w-4 h-4" />
              <span>儲存變更</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GearItem } from '../types/gear';
import { X, Plus, Edit2, Trash2, Check, AlertTriangle, RefreshCw } from 'lucide-react';
import { DEFAULT_CATEGORIES } from '../constants/defaultCategories';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  items: GearItem[];
  onAddCategory: (name: string) => boolean;
  onRenameCategory: (oldName: string, newName: string) => boolean;
  onDeleteCategory: (categoryToDelete: string, action: 'delete_items' | 'move_items', targetCategory?: string) => void;
  onResetDefaultCategories: () => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  categories,
  items,
  onAddCategory,
  onRenameCategory,
  onDeleteCategory,
  onResetDefaultCategories,
}) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatError, setNewCatError] = useState('');

  // Editing state
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editingNewName, setEditingNewName] = useState('');
  const [renameError, setRenameError] = useState('');

  // Deleting confirmation state
  const [deletingCat, setDeletingCat] = useState<string | null>(null);
  const [deleteResolution, setDeleteResolution] = useState<'move' | 'delete'>('move');
  const [targetCategory, setTargetCategory] = useState<string>('');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) {
      setNewCatError('分類名稱不可為空白');
      return;
    }
    if (categories.includes(trimmed)) {
      setNewCatError('已有相同名稱的分類');
      return;
    }
    const success = onAddCategory(trimmed);
    if (success) {
      setNewCatName('');
      setNewCatError('');
    }
  };

  const startRename = (cat: string) => {
    setEditingCat(cat);
    setEditingNewName(cat);
    setRenameError('');
  };

  const handleSaveRename = (cat: string) => {
    const trimmed = editingNewName.trim();
    if (!trimmed) {
      setRenameError('分類名稱不可為空白');
      return;
    }
    if (trimmed !== cat && categories.includes(trimmed)) {
      setRenameError('已有相同名稱的分類');
      return;
    }
    const success = onRenameCategory(cat, trimmed);
    if (success) {
      setEditingCat(null);
      setEditingNewName('');
      setRenameError('');
    }
  };

  const startDelete = (cat: string) => {
    // Check if category has items
    const count = items.filter((i) => i.category === cat).length;
    if (categories.length <= 1) {
      alert('至少需保留一個分類');
      return;
    }
    setDeletingCat(cat);
    if (count > 0) {
      // Find a default target category other than this one
      const fallback = categories.find((c) => c !== cat) || '';
      setTargetCategory(fallback);
      setDeleteResolution('move');
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingCat) return;
    const count = items.filter((i) => i.category === deletingCat).length;
    if (count === 0) {
      onDeleteCategory(deletingCat, 'delete_items');
      setDeletingCat(null);
      return;
    }

    if (deleteResolution === 'move') {
      if (!targetCategory || targetCategory === deletingCat) {
        alert('請選擇要移至的有效目標分類');
        return;
      }
      onDeleteCategory(deletingCat, 'move_items', targetCategory);
    } else {
      onDeleteCategory(deletingCat, 'delete_items');
    }
    setDeletingCat(null);
  };

  const deletingCatItemCount = deletingCat ? items.filter((i) => i.category === deletingCat).length : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-stone-900 rounded-2xl max-w-lg w-full shadow-2xl border border-stone-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-850">
          <div>
            <h3 className="text-lg font-bold text-stone-100">分類管理</h3>
            <p className="text-xs text-stone-400 mt-0.5">新增、重新命名或刪除裝備分類</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-200 p-2 rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Add Category Form */}
          <form onSubmit={handleAdd} className="space-y-2">
            <label className="block text-xs font-semibold text-stone-300">新增分類</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => {
                  setNewCatName(e.target.value);
                  if (newCatError) setNewCatError('');
                }}
                placeholder="輸入新分類名稱（如：攝影器材）"
                className="flex-1 px-3 py-2 text-sm border border-stone-700 rounded-lg bg-stone-800 text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" />
                <span>新增</span>
              </button>
            </div>
            {newCatError && <p className="text-xs text-rose-400">{newCatError}</p>}
          </form>

          {/* Existing Categories List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-stone-300">
                現有分類清單（共 {categories.length} 個）
              </label>
              <button
                type="button"
                onClick={() => {
                  if (confirm('確定要將分類清單重置回系統預設的 15 個標準分類嗎？現有屬於被移除分類的裝備將會移至「其他」。')) {
                    onResetDefaultCategories();
                  }
                }}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center space-x-1 underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>恢復 15 種預設分類</span>
              </button>
            </div>

            <div className="divide-y divide-stone-800 border border-stone-800 rounded-xl max-h-64 overflow-y-auto bg-stone-850/50">
              {categories.map((cat) => {
                const count = items.filter((i) => i.category === cat).length;
                const isEditing = editingCat === cat;

                return (
                  <div key={cat} className="flex items-center justify-between px-3.5 py-2.5 bg-stone-900 hover:bg-stone-850 transition-colors">
                    {isEditing ? (
                      <div className="flex-1 flex flex-col gap-1 mr-2">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editingNewName}
                            onChange={(e) => setEditingNewName(e.target.value)}
                            className="flex-1 px-2.5 py-1 text-sm border border-emerald-500 rounded bg-stone-800 text-stone-100 focus:outline-none"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(cat)}
                            className="p-1.5 text-emerald-400 hover:bg-emerald-950/60 rounded"
                            title="儲存"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCat(null);
                              setRenameError('');
                            }}
                            className="p-1.5 text-stone-400 hover:bg-stone-800 rounded"
                            title="取消"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {renameError && <p className="text-[11px] text-rose-400">{renameError}</p>}
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="text-sm font-medium text-stone-100 truncate">{cat}</span>
                          <span className="text-xs text-stone-400 bg-stone-800 border border-stone-700/60 px-1.5 py-0.5 rounded">
                            {count} 件裝備
                          </span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => startRename(cat)}
                            className="p-1.5 text-stone-400 hover:text-emerald-400 hover:bg-stone-800 rounded transition-colors"
                            title="重新命名"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => startDelete(cat)}
                            disabled={categories.length <= 1}
                            className={`p-1.5 rounded transition-colors ${
                              categories.length <= 1
                                ? 'text-stone-600 cursor-not-allowed'
                                : 'text-stone-500 hover:text-rose-400 hover:bg-rose-950/50'
                            }`}
                            title="刪除分類"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Delete Resolution Submodal / Confirm Panel */}
        {deletingCat && (
          <div className="p-4 bg-amber-950/40 border-t border-amber-800/80 space-y-3">
            <div className="flex items-start space-x-2.5 text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">確認刪除分類：「{deletingCat}」？</h4>
                {deletingCatItemCount > 0 ? (
                  <p className="text-xs text-amber-300/90 mt-1">
                    此分類內目前有 <strong>{deletingCatItemCount} 件裝備</strong>。請選擇如何處理這些裝備（避免產生孤兒資料）：
                  </p>
                ) : (
                  <p className="text-xs text-amber-300/90 mt-1">此分類內目前無裝備，可以直接安全刪除。</p>
                )}
              </div>
            </div>

            {deletingCatItemCount > 0 && (
              <div className="space-y-2 pl-7">
                <label className="flex items-center space-x-2 text-xs text-stone-200 cursor-pointer">
                  <input
                    type="radio"
                    name="delete-action"
                    checked={deleteResolution === 'move'}
                    onChange={() => setDeleteResolution('move')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>將這些裝備移至其他分類：</span>
                </label>

                {deleteResolution === 'move' && (
                  <select
                    value={targetCategory}
                    onChange={(e) => setTargetCategory(e.target.value)}
                    className="block w-full text-xs border border-stone-700 rounded px-2.5 py-1.5 bg-stone-800 text-stone-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {categories
                      .filter((c) => c !== deletingCat)
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                )}

                <label className="flex items-center space-x-2 text-xs text-rose-300 cursor-pointer pt-1">
                  <input
                    type="radio"
                    name="delete-action"
                    checked={deleteResolution === 'delete'}
                    onChange={() => setDeleteResolution('delete')}
                    className="text-rose-500 focus:ring-rose-500"
                  />
                  <span>一併刪除分類內的這 {deletingCatItemCount} 件裝備（不可復原）</span>
                </label>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2 border-t border-amber-800/60">
              <button
                type="button"
                onClick={() => setDeletingCat(null)}
                className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-white bg-stone-800 border border-stone-700 rounded-lg hover:bg-stone-700"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow-2xs"
              >
                確認刪除
              </button>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-850 border-t border-stone-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-stone-300 bg-stone-800 border border-stone-700 hover:bg-stone-750 hover:text-white rounded-lg transition-colors"
          >
            完成並關閉
          </button>
        </div>
      </div>
    </div>
  );
};

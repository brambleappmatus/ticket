import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Category } from '../types/category';
import { EditableField } from './EditableField';
import { RetroMessage } from './RetroMessage';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (category: { name: string; category_id: string }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function CategoryManager({ categories, onAdd, onRemove }: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState({ name: '', category_id: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    if (!newCategory.name.trim() || !newCategory.category_id.trim()) return;
    
    try {
      setError(null);
      await onAdd({
        name: newCategory.name.trim(),
        category_id: newCategory.category_id.trim()
      });
      setNewCategory({ name: '', category_id: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add category');
    }
  };

  const handleRemove = async (id: string) => {
    try {
      setError(null);
      await onRemove(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove category');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Manage Categories</h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="flex-1">{category.name}</span>
            <span className="text-sm text-gray-500">{category.category_id}</span>
            <button
              onClick={() => handleRemove(category.id)}
              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <EditableField
            value={newCategory.name}
            onChange={(value) => setNewCategory(prev => ({ ...prev, name: value }))}
            placeholder="Category Name"
          />
        </div>
        <div className="flex-1">
          <EditableField
            value={newCategory.category_id}
            onChange={(value) => setNewCategory(prev => ({ ...prev, category_id: value }))}
            placeholder="Category ID"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newCategory.name.trim() || !newCategory.category_id.trim()}
          className="p-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
        >
          <Plus size={20} />
        </button>
      </div>

      {error && <RetroMessage type="error" message={error} />}
      {success && <RetroMessage type="success" message="Category added successfully!" />}
    </div>
  );
}
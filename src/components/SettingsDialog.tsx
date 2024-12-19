import React from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { ApiSettings } from '../types/settings';
import { CategoryManager } from './CategoryManager';
import { useCategories } from '../hooks/useCategories';

interface Props {
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export function SettingsDialog({ settings, onSave }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(settings);
  const { categories, addCategory, removeCategory } = useCategories();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors text-black dark:text-white"
        title="Settings"
      >
        <SettingsIcon size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-black rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-black dark:text-white">Settings</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded text-black dark:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    Instance URL
                  </label>
                  <input
                    type="text"
                    value={formData.instanceUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, instanceUrl: e.target.value }))}
                    className="w-full p-2 border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-1">
                    API Key
                  </label>
                  <input
                    type="text"
                    value={formData.apiKey}
                    onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                    className="w-full p-2 border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    Save API Settings
                  </button>
                </div>
              </form>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <CategoryManager
                  categories={categories}
                  onAdd={addCategory}
                  onRemove={removeCategory}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
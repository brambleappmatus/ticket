import React from 'react';
import { CategoryManager } from '../components/CategoryManager';
import { StatusManager } from '../components/StatusManager';
import { ApiSettingsForm } from '../components/ApiSettingsForm';
import { useAdminData } from '../hooks/useAdminData';
import { GlitchText } from '../components/GlitchText';

export function AdminPanel() {
  const {
    settings,
    categories,
    statuses,
    loading,
    error,
    updateSettings,
    addCategory,
    removeCategory,
    addStatus,
    removeStatus,
  } = useAdminData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GlitchText
        as="h1"
        className="text-2xl font-bold text-center mb-8 text-black dark:text-white font-terminal border-b-2 border-black dark:border-white pb-4 inline-block"
      >
        Admin Panel
      </GlitchText>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">API Settings</h2>
          <ApiSettingsForm settings={settings} onSave={updateSettings} />
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6">
          <CategoryManager
            categories={categories}
            onAdd={addCategory}
            onRemove={removeCategory}
          />
        </div>

        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6">
          <StatusManager
            statuses={statuses}
            onAdd={addStatus}
            onRemove={removeStatus}
          />
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { useAdminSettings } from './useAdminSettings';
import { useAdminCategories } from './useAdminCategories';
import { useAdminStatuses } from './useAdminStatuses';
import type { ApiSettings } from '../types/settings';
import type { Category } from '../types/category';
import type { Status } from '../types/status';

export function useAdminData() {
  const [error, setError] = useState<string | null>(null);

  const { 
    settings, 
    loading: settingsLoading, 
    updateSettings 
  } = useAdminSettings();

  const { 
    categories, 
    loading: categoriesLoading, 
    addCategory, 
    removeCategory 
  } = useAdminCategories();

  const { 
    statuses, 
    loading: statusesLoading, 
    addStatus, 
    removeStatus 
  } = useAdminStatuses();

  const loading = settingsLoading || categoriesLoading || statusesLoading;

  return {
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
  };
}
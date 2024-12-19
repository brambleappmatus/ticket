import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Category, CategoryState } from '../types/category';

export function useCategories() {
  const [state, setState] = useState<CategoryState>({
    categories: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      setState({
        categories: data || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      }));
    }
  }

  async function addCategory(category: { name: string }) {
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: category.name }]);

      if (error) throw error;
      await fetchCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  }

  async function removeCategory(id: string) {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchCategories();
    } catch (error) {
      console.error('Error removing category:', error);
      throw error;
    }
  }

  return {
    ...state,
    addCategory,
    removeCategory,
  };
}
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Category } from '../types/category';

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }

  const addCategory = async (category: { name: string; category_id: string }) => {
    try {
      const { error: insertError } = await supabase
        .from('categories')
        .insert([{
          name: category.name,
          category_id: category.category_id,
        }]);

      if (insertError) throw insertError;
      await fetchCategories();
    } catch (err) {
      throw err;
    }
  };

  const removeCategory = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchCategories();
    } catch (err) {
      throw err;
    }
  };

  return { categories, loading, error, addCategory, removeCategory };
}
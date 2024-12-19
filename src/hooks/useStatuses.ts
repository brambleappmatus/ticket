import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Status, StatusState } from '../types/status';

export function useStatuses() {
  const [state, setState] = useState<StatusState>({
    statuses: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchStatuses();
  }, []);

  async function fetchStatuses() {
    try {
      const { data, error } = await supabase
        .from('statuses')
        .select('*')
        .order('name');

      if (error) throw error;

      setState({
        statuses: data || [],
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch statuses',
      }));
    }
  }

  async function addStatus(status: { name: string }) {
    try {
      const { error } = await supabase
        .from('statuses')
        .insert([{ name: status.name }]);

      if (error) throw error;
      await fetchStatuses();
    } catch (error) {
      console.error('Error adding status:', error);
      throw error;
    }
  }

  async function removeStatus(id: string) {
    try {
      const { error } = await supabase
        .from('statuses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchStatuses();
    } catch (error) {
      console.error('Error removing status:', error);
      throw error;
    }
  }

  return {
    ...state,
    addStatus,
    removeStatus,
  };
}
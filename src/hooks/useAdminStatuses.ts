import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Status } from '../types/status';

export function useAdminStatuses() {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatuses();
  }, []);

  async function fetchStatuses() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('statuses')
        .select('*')
        .order('name');

      if (fetchError) throw fetchError;
      setStatuses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch statuses');
    } finally {
      setLoading(false);
    }
  }

  const addStatus = async (status: { name: string; status_id: string }) => {
    try {
      const { error: insertError } = await supabase
        .from('statuses')
        .insert([{
          name: status.name,
          status_id: status.status_id,
        }]);

      if (insertError) throw insertError;
      await fetchStatuses();
    } catch (err) {
      throw err;
    }
  };

  const removeStatus = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('statuses')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      await fetchStatuses();
    } catch (err) {
      throw err;
    }
  };

  return { statuses, loading, error, addStatus, removeStatus };
}
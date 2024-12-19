import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ApiSettings } from '../types/settings';

const initialSettings: ApiSettings = {
  instanceUrl: '',
  apiKey: '',
};

export function useAdminSettings() {
  const [settings, setSettings] = useState<ApiSettings>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('api_settings')
        .select('*')
        .eq('active', true)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (data) {
        setSettings({
          instanceUrl: data.instance_url,
          apiKey: data.api_key,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }

  const updateSettings = async (newSettings: ApiSettings) => {
    try {
      const { error: updateError } = await supabase
        .from('api_settings')
        .insert([{
          instance_url: newSettings.instanceUrl,
          api_key: newSettings.apiKey,
          active: true
        }])
        .select();

      if (updateError) throw updateError;
      await fetchSettings();
    } catch (err) {
      throw err;
    }
  };

  return { settings, loading, error, updateSettings };
}
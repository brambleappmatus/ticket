import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ApiSettings } from '../types/settings';

const defaultSettings: ApiSettings = {
  instanceUrl: '',
  apiKey: '',
};

export function useSettings() {
  const [settings, setSettings] = useState<ApiSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from('api_settings')
        .select('instance_url, api_key')
        .limit(1)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings({
          instanceUrl: data.instance_url,
          apiKey: data.api_key,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(newSettings: ApiSettings) {
    try {
      const { error } = await supabase
        .from('api_settings')
        .upsert([{
          instance_url: newSettings.instanceUrl,
          api_key: newSettings.apiKey,
        }], {
          onConflict: 'id'
        });

      if (error) throw error;

      setSettings(newSettings);
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  return { 
    settings, 
    setSettings: updateSettings,
    loading 
  };
}
import React, { useState, useEffect } from 'react';
import { ApiSettings } from '../types/settings';
import { RetroMessage } from './RetroMessage';

interface ApiSettingsFormProps {
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => Promise<void>;
}

export function ApiSettingsForm({ settings, onSave }: ApiSettingsFormProps) {
  const [formData, setFormData] = useState(settings);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Update form when settings change
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setError(null);

    try {
      await onSave(formData);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    }
  };

  return (
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

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {settings.instanceUrl && (
            <span>Current URL: {settings.instanceUrl}</span>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'saving'}
          className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
        >
          {status === 'saving' ? 'Saving...' : 'Save API Settings'}
        </button>
      </div>

      {status === 'success' && (
        <RetroMessage type="success" message="Settings saved successfully!" />
      )}
      {status === 'error' && error && (
        <RetroMessage type="error" message={error} />
      )}
    </form>
  );
}
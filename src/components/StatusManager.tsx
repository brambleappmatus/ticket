import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Status } from '../types/status';
import { EditableField } from './EditableField';
import { RetroMessage } from './RetroMessage';

interface StatusManagerProps {
  statuses: Status[];
  onAdd: (status: { name: string; status_id: string }) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}

export function StatusManager({ statuses, onAdd, onRemove }: StatusManagerProps) {
  const [newStatus, setNewStatus] = useState({ name: '', status_id: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    if (!newStatus.name.trim() || !newStatus.status_id.trim()) return;
    
    try {
      setError(null);
      await onAdd({
        name: newStatus.name.trim(),
        status_id: newStatus.status_id.trim()
      });
      setNewStatus({ name: '', status_id: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add status');
    }
  };

  const handleRemove = async (id: string) => {
    try {
      setError(null);
      await onRemove(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove status');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Manage Statuses</h3>
      
      <div className="space-y-2">
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
            <span className="flex-1">{status.name}</span>
            <span className="text-sm text-gray-500">{status.status_id}</span>
            <button
              onClick={() => handleRemove(status.id)}
              className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <EditableField
            value={newStatus.name}
            onChange={(value) => setNewStatus(prev => ({ ...prev, name: value }))}
            placeholder="Status Name"
          />
        </div>
        <div className="flex-1">
          <EditableField
            value={newStatus.status_id}
            onChange={(value) => setNewStatus(prev => ({ ...prev, status_id: value }))}
            placeholder="Status ID"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newStatus.name.trim() || !newStatus.status_id.trim()}
          className="p-2 bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
        >
          <Plus size={20} />
        </button>
      </div>

      {error && <RetroMessage type="error" message={error} />}
      {success && <RetroMessage type="success" message="Status added successfully!" />}
    </div>
  );
}
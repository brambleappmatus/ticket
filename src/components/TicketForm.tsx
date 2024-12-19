import React from 'react';
import { Send } from 'lucide-react';
import { TicketFormData } from '../types/settings';
import { createTicket } from '../services/ticketService';
import { CategorySelect } from './CategorySelect';
import { StatusSelect } from './StatusSelect';
import { useCategories } from '../hooks/useCategories';
import { useStatuses } from '../hooks/useStatuses';
import { RetroMessage } from './RetroMessage';

export function TicketForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [hasParent, setHasParent] = React.useState(false);
  const { categories } = useCategories();
  const { statuses } = useStatuses();
  
  const [formData, setFormData] = React.useState<TicketFormData>({
    parentTicket: '',
    category: '',
    status: '',
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        status: formData.status || undefined,
        description: formData.description || undefined,
        stage: 'OPEN' as const,
        priority: 'LOW' as const,
        ...(hasParent && formData.parentTicket ? { parentTicket: formData.parentTicket } : {})
      };
      await createTicket(payload);
      setSuccess(true);
      setFormData(prev => ({
        parentTicket: '',
        category: prev.category,
        status: prev.status,
        title: '',
        description: '',
      }));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create ticket');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="hasParent"
            checked={hasParent}
            onChange={(e) => setHasParent(e.target.checked)}
            className="mac-checkbox"
          />
          <label htmlFor="hasParent" className="text-sm font-medium">
            Add Parent Ticket
          </label>
        </div>
        
        {hasParent && (
          <input
            type="number"
            value={formData.parentTicket}
            onChange={(e) => setFormData(prev => ({ ...prev, parentTicket: e.target.value }))}
            placeholder="Parent Ticket Number"
            className="mac-input w-full"
            required={hasParent}
          />
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Category
        </label>
        <CategorySelect
          categories={categories}
          value={formData.category}
          onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Status
        </label>
        <StatusSelect
          statuses={statuses}
          value={formData.status}
          onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter ticket title"
          className="mac-input w-full"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter ticket description"
          className="mac-input w-full min-h-[100px] resize-y"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mac-button w-full flex items-center justify-center gap-2 py-3 px-6"
      >
        <Send size={20} className={isLoading ? 'animate-spin' : ''} />
        {isLoading ? 'Creating...' : 'Create Ticket'}
      </button>

      {error && <RetroMessage type="error" message={error} />}
      {success && <RetroMessage type="success" message="Ticket created successfully!" />}
    </form>
  );
}
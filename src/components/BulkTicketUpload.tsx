import React from 'react';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';
import { createTicket } from '../services/ticketService';
import { ColumnMapper } from './ColumnMapper';
import { CategorySelect } from './CategorySelect';
import { StatusSelect } from './StatusSelect';
import { useCategories } from '../hooks/useCategories';
import { useStatuses } from '../hooks/useStatuses';
import { RetroMessage } from './RetroMessage';
import { DraggableDescriptionColumns } from './DraggableDescriptionColumns';

interface BulkUploadState {
  headers: string[];
  data: any[];
  selectedTitleColumn: string;
  selectedDescriptionColumns: string[];
  isLoading: boolean;
  error: string | null;
  success: boolean;
  hasParent: boolean;
  parentTicket: string;
  category: string;
  status: string;
}

const initialState: BulkUploadState = {
  headers: [],
  data: [],
  selectedTitleColumn: '',
  selectedDescriptionColumns: [],
  isLoading: false,
  error: null,
  success: false,
  hasParent: false,
  parentTicket: '',
  category: '',
  status: '',
};

export function BulkTicketUpload() {
  const [state, setState] = React.useState<BulkUploadState>(initialState);
  const { categories } = useCategories();
  const { statuses } = useStatuses();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = read(event.target?.result, { type: 'binary' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = utils.sheet_to_json(firstSheet);
        const headers = Object.keys(data[0] || {});

        setState(prev => ({
          ...prev,
          headers,
          data,
          selectedTitleColumn: headers[0] || '',
          error: null,
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: 'Failed to parse Excel file',
        }));
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.selectedTitleColumn || !state.category) {
      setState(prev => ({ ...prev, error: 'Please select a title column and category' }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      for (const row of state.data) {
        const title = row[state.selectedTitleColumn];
        if (!title) continue;

        const description = state.selectedDescriptionColumns
          .map(column => `${column}: ${row[column]}`)
          .join('\n');

        const payload = {
          title,
          category: state.category,
          status: state.status || undefined,
          description: description || undefined,
          stage: 'OPEN' as const,
          priority: 'LOW' as const,
          ...(state.hasParent && state.parentTicket ? { parentTicket: state.parentTicket } : {})
        };

        await createTicket(payload);
      }

      setState(prev => ({
        ...prev,
        success: true,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to create tickets',
        isLoading: false,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="bulkHasParent"
            checked={state.hasParent}
            onChange={(e) => setState(prev => ({ ...prev, hasParent: e.target.checked }))}
            className="rounded border-gray-300 text-black focus:ring-gray-500 dark:border-gray-700 dark:bg-black"
          />
          <label htmlFor="bulkHasParent" className="text-sm font-medium text-black dark:text-white">
            Add Parent Ticket
          </label>
        </div>
        
        {state.hasParent && (
          <input
            type="number"
            value={state.parentTicket}
            onChange={(e) => setState(prev => ({ ...prev, parentTicket: e.target.value }))}
            placeholder="Parent Ticket Number"
            className="w-full p-2 rounded font-terminal text-black dark:text-white bg-transparent border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required={state.hasParent}
          />
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-black dark:text-white">
          Category
        </label>
        <CategorySelect
          categories={categories}
          value={state.category}
          onChange={(value) => setState(prev => ({ ...prev, category: value }))}
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-black dark:text-white">
          Status
        </label>
        <StatusSelect
          statuses={statuses}
          value={state.status}
          onChange={(value) => setState(prev => ({ ...prev, status: value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-1">
          Excel File
        </label>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          className="w-full p-2 border rounded bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-black dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-black dark:file:bg-white file:text-white dark:file:text-black hover:file:bg-gray-800 dark:hover:file:bg-gray-200"
          required={state.data.length === 0}
        />
      </div>

      {state.headers.length > 0 && (
        <>
          <ColumnMapper
            label="Select Title Column"
            headers={state.headers}
            selectedColumn={state.selectedTitleColumn}
            onColumnSelect={(column) => setState(prev => ({ ...prev, selectedTitleColumn: column }))}
          />

          <DraggableDescriptionColumns
            headers={state.headers}
            selectedColumns={state.selectedDescriptionColumns}
            onColumnsChange={(columns) => setState(prev => ({ ...prev, selectedDescriptionColumns: columns }))}
          />
        </>
      )}

      {state.data.length > 0 && (
        <div className="text-sm text-black dark:text-white">
          {state.data.length} rows found in the Excel file
        </div>
      )}

      <button
        type="submit"
        disabled={state.isLoading || state.data.length === 0}
        className={`
          w-full flex items-center justify-center gap-2 bg-black dark:bg-white 
          text-white dark:text-black font-semibold py-3 px-6 rounded-lg
          transition-colors hover:bg-gray-800 dark:hover:bg-gray-200
          focus:outline-none focus:ring-2 focus:ring-gray-500
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <Upload size={20} className={state.isLoading ? 'animate-spin' : ''} />
        {state.isLoading ? 'Creating Tickets...' : 'Create Tickets'}
      </button>

      {state.error && <RetroMessage type="error" message={state.error} />}
      {state.success && <RetroMessage type="success" message="All tickets created successfully!" />}
    </form>
  );
}
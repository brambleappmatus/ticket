import React from 'react';
import { TicketForm } from './TicketForm';
import { BulkTicketUpload } from './BulkTicketUpload';
import { GlitchButton } from './GlitchButton';

export function TicketCreator() {
  const [mode, setMode] = React.useState<'manual' | 'bulk'>('manual');

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        <GlitchButton
          onClick={() => setMode('manual')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'manual'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          Manual Entry
        </GlitchButton>
        <GlitchButton
          onClick={() => setMode('bulk')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            mode === 'bulk'
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          Bulk Upload
        </GlitchButton>
      </div>

      {mode === 'manual' ? <TicketForm /> : <BulkTicketUpload />}
    </div>
  );
}
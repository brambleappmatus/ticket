import React from 'react';
import { TicketForm } from '../components/TicketForm';
import { BulkTicketUpload } from '../components/BulkTicketUpload';
import { GlitchButton } from '../components/GlitchButton';

export function TicketCreator() {
  const [mode, setMode] = React.useState<'manual' | 'bulk'>('manual');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-lg space-y-6">
          <div className="flex justify-center gap-4">
            <GlitchButton
              onClick={() => setMode('manual')}
              className={`flex-1 px-4 py-2 mac-button ${
                mode === 'manual'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : ''
              }`}
            >
              Manual Entry
            </GlitchButton>
            <GlitchButton
              onClick={() => setMode('bulk')}
              className={`flex-1 px-4 py-2 mac-button ${
                mode === 'bulk'
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : ''
              }`}
            >
              Bulk Upload
            </GlitchButton>
          </div>

          <div className="bg-white dark:bg-black border-[3px] border-black dark:border-white p-6">
            {mode === 'manual' ? <TicketForm /> : <BulkTicketUpload />}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { GlitchText } from './GlitchText';

const VERSION = '1.3.37';

export function SystemInfo() {
  return (
    <div className="fixed bottom-4 right-4 text-right">
      <GlitchText className="text-sm text-black dark:text-white opacity-50 hover:opacity-100 transition-opacity">
        TCS_v{VERSION}
      </GlitchText>
    </div>
  );
}
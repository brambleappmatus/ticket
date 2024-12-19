import React from 'react';

interface ColumnMapperProps {
  label: string;
  headers: string[];
  selectedColumn: string;
  onColumnSelect: (column: string) => void;
}

export function ColumnMapper({ label, headers, selectedColumn, onColumnSelect }: ColumnMapperProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-black dark:text-white mb-1">
        {label}
      </label>
      <select
        value={selectedColumn}
        onChange={(e) => onColumnSelect(e.target.value)}
        className="w-full p-2 rounded font-terminal text-black dark:text-white bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
        required={label.includes('Title')}
      >
        {headers.map((header) => (
          <option key={header} value={header}>
            {header || '-- None --'}
          </option>
        ))}
      </select>
    </div>
  );
}
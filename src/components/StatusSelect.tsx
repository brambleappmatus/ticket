import React from 'react';
import { Status } from '../types/status';

interface StatusSelectProps {
  statuses: Status[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function StatusSelect({ statuses, value, onChange, required = false }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mac-select w-full"
      required={required}
    >
      <option value="">Select a status</option>
      {statuses.map((status) => (
        <option key={status.id} value={status.id}>
          {status.name}
        </option>
      ))}
    </select>
  );
}
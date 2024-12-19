import React, { useState } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function EditableField({
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder,
  className = '',
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    if (!required || tempValue) {
      onChange(tempValue);
    }
    setIsEditing(false);
  };

  const baseClasses = "w-full min-h-[42px] p-2 rounded font-terminal text-black dark:text-white bg-transparent border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500";
  const containerClasses = "w-full";

  if (!isEditing) {
    return (
      <div className={containerClasses}>
        <div
          onClick={() => setIsEditing(true)}
          className={`${baseClasses} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 ${className}`}
        >
          {value || <span className="text-gray-400 dark:text-gray-600">{placeholder}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <input
        type={type}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        className={`${baseClasses} ${className}`}
        required={required}
        autoFocus
      />
    </div>
  );
}
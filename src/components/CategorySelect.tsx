import React from 'react';
import { Category } from '../types/category';
import { getRawCategoryId } from '../utils/categoryUtils';

interface CategorySelectProps {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export function CategorySelect({ categories, value, onChange, required = false }: CategorySelectProps) {
  // Convert the value to raw ID for comparison if it exists
  const currentValue = value ? getRawCategoryId(value) : '';

  return (
    <select
      value={currentValue}
      onChange={(e) => onChange(e.target.value)}
      className="mac-select w-full"
      required={required}
    >
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option 
          key={category.id} 
          value={getRawCategoryId(category.category_id)}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}
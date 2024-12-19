import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableDescriptionColumnProps {
  id: string;
  isSelected: boolean;
  onToggle: () => void;
  isDraggable?: boolean;
}

export function SortableDescriptionColumn({ 
  id, 
  isSelected, 
  onToggle,
  isDraggable = false 
}: SortableDescriptionColumnProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    disabled: !isDraggable
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={isDraggable ? style : undefined}
      className={`
        flex items-center gap-1 py-1 px-2 rounded text-sm
        ${isDragging ? 'bg-gray-100 dark:bg-gray-900' : 'bg-white dark:bg-black'}
        ${isSelected ? 'border border-black dark:border-white' : 'border border-gray-200 dark:border-gray-800'}
        ${isDraggable ? 'cursor-move' : 'cursor-pointer'}
        transition-colors
      `}
      {...(isDraggable ? attributes : {})}
    >
      {isDraggable && (
        <div {...listeners} className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-900 rounded">
          <GripVertical size={14} className="text-gray-400" />
        </div>
      )}
      
      <label className="flex items-center gap-1.5 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-gray-500 dark:border-gray-700 dark:bg-black"
        />
        <span className="text-xs text-black dark:text-white truncate">{id}</span>
      </label>
    </div>
  );
}
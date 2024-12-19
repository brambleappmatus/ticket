import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableDescriptionColumn } from './SortableDescriptionColumn';

interface DraggableDescriptionColumnsProps {
  headers: string[];
  selectedColumns: string[];
  onColumnsChange: (columns: string[]) => void;
}

export function DraggableDescriptionColumns({
  headers,
  selectedColumns,
  onColumnsChange,
}: DraggableDescriptionColumnsProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = selectedColumns.indexOf(active.id);
      const newIndex = selectedColumns.indexOf(over.id);
      onColumnsChange(arrayMove(selectedColumns, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      {/* Available columns */}
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Available Columns
        </label>
        <div className="space-y-1 max-h-40 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded p-2">
          {headers
            .filter(header => !selectedColumns.includes(header))
            .map((header) => (
              <SortableDescriptionColumn
                key={header}
                id={header}
                isSelected={false}
                onToggle={() => {
                  onColumnsChange([...selectedColumns, header]);
                }}
                isDraggable={false}
              />
            ))}
        </div>
      </div>

      {/* Selected columns with drag and drop */}
      <div>
        <label className="block text-sm font-medium text-black dark:text-white mb-2">
          Selected Columns {selectedColumns.length > 0 && `(${selectedColumns.length})`}
        </label>
        <div className="border border-gray-200 dark:border-gray-800 rounded p-2 min-h-[50px]">
          {selectedColumns.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={selectedColumns}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-1">
                  {selectedColumns.map((header) => (
                    <SortableDescriptionColumn
                      key={header}
                      id={header}
                      isSelected={true}
                      onToggle={() => {
                        onColumnsChange(selectedColumns.filter(col => col !== header));
                      }}
                      isDraggable={true}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
              No columns selected
            </div>
          )}
        </div>
        {selectedColumns.length > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Drag to reorder columns
          </div>
        )}
      </div>
    </div>
  );
}
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';

import { joinCode, shuffle, splitCode } from '@/utils/splitCode';

import type { DragDropProps } from '@/ts/interfaces';
import type { CodeItem } from '@/ts/types';

import styles from './DragDropCode.module.scss';

const SortableItem = ({ item }: { item: CodeItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.dragItem}
      data-dragging={isDragging}
    >
      {item.content || <span className={styles.empty}>empty line</span>}
    </div>
  );
};

export const DragDropCode = ({ referenceSolution, onChange }: DragDropProps) => {
  const initialItems = useMemo(() => {
    if (!referenceSolution) return [];
    return shuffle(splitCode(referenceSolution));
  }, [referenceSolution]);

  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === String(active.id));
    const newIndex = items.findIndex((i) => i.id === String(over.id));

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    onChange(joinCode(newItems));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div className={styles.dragList}>
          {items.map((item) => (
            <SortableItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

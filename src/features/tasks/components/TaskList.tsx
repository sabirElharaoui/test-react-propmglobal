import { TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { memo, useState } from 'react';
import { Table } from '../../../components/ui/Table/Table';
import SortableTaskItem from './SortableTaskItem';
import { Task } from '../../../shared/types/task.types';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  onToggleStatus: (id: string) => Promise<void>;
  onReorderTasks: (oldIndex: number, newIndex: number) => Promise<void>;
}

export const TaskList = memo(({ tasks, onUpdateTask, onToggleStatus, onReorderTasks }: TaskListProps) => {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));
  const [loadingTaskId, setLoadingTaskId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over?.id);
      onReorderTasks(oldIndex, newIndex);
    }
  };

  const handleToggleStatus = (id: string) => {
    setLoadingTaskId(id);
    onToggleStatus(id).finally(() => setLoadingTaskId(null));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map(task => (
              <SortableTaskItem
                key={task.id}
                task={task}
                loading={loadingTaskId === task.id}
                onEdit={(field, value) => onUpdateTask(task.id, { [field]: value })}
                onToggle={() => handleToggleStatus(task.id)}
              />
            ))}
          </SortableContext>
        </DndContext>
      </TableBody>
    </Table>
  );
});

export default TaskList;

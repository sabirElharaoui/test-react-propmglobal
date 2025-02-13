import { TableRow, TableCell, Checkbox, IconButton, CircularProgress } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCell } from './TaskCell';
import { Task } from '../../../shared/types/task.types';

interface SortableTaskItemProps {
  task: Task;
  loading?: boolean;
  onEdit: (field: string, value: string) => void;
  onToggle: () => void;
}

export const SortableTaskItem = ({ task, loading = false, onEdit, onToggle }: SortableTaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      sx={{
        '& td': {
          userSelect: 'none',
        },
      }}
    >
      <TableCell padding="checkbox">
        <IconButton
          {...attributes}
          {...listeners}
          disabled={loading}
          sx={{
            cursor: loading ? 'default' : 'grab',
            '&:active': { cursor: loading ? 'default' : 'grabbing' },
            opacity: loading ? 0.5 : 1,
          }}
        >
          <DragIndicatorIcon />
        </IconButton>
      </TableCell>
      <TableCell
        sx={{
          width: '48px',
        }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Checkbox
            checked={task.status === 'completed'}
            onChange={onToggle}
            disabled={loading}
          />
        )}
      </TableCell>

      <TableCell>
        <TaskCell
          value={task.title}
          onSave={value => onEdit('title', value)}
          isCompleted={task.status === 'completed'}
          disabled={loading}
        />
      </TableCell>
      <TableCell>
        <TaskCell
          value={task.description}
          onSave={value => onEdit('description', value)}
          isCompleted={task.status === 'completed'}
          disabled={loading}
        />
      </TableCell>
    </TableRow>
  );
};

export default SortableTaskItem;

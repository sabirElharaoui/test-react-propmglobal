import { Box } from '@mui/material';
import { EditableCell } from '../../../components/ui/EditableCell/EditableCell';
import { memo } from 'react';

interface TaskCellProps {
  value: string;
  onSave: (value: string) => void;
  isCompleted?: boolean;
  disabled?: boolean;
}

export const TaskCell = memo(({ value, onSave, isCompleted = false, disabled = false }: TaskCellProps) => {
  return (
    <Box
      sx={{
        textDecoration: isCompleted ? 'line-through' : 'none',
        color: isCompleted ? 'text.disabled' : 'text.primary',
      }}
    >
      <EditableCell value={value} onSave={onSave} disabled={disabled} />
    </Box>
  );
});

export default TaskCell;

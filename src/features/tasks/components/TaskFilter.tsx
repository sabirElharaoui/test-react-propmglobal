import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { TaskFilterType } from '../../../shared/types/task.types';
import { memo } from 'react';

interface TaskFilterProps {
  value: TaskFilterType;
  onChange: (value: TaskFilterType) => void;
}

export const TaskFilter = memo(({ value, onChange }: TaskFilterProps) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Filter</InputLabel>
      <Select value={value} label="Filter" onChange={e => onChange(e.target.value as TaskFilterType)}>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
    </FormControl>
  );
});

export default TaskFilter;

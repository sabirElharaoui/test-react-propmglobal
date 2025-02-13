import { useState } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { Table } from '../../../components/ui/Table/Table';
import { Input } from '../../../components/ui/Input';

interface NewTaskFormProps {
  onSubmit: (title: string, description: string) => void;
}

export const NewTaskForm = ({ onSubmit }: NewTaskFormProps) => {
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleSubmit = () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      onSubmit(newTask.title, newTask.description);
      setNewTask({ title: '', description: '' });
    }
  };

  const handleKeyDown = (field: 'title' | 'description') => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (field === 'description') {
        handleSubmit();
      } else {
        // Move focus to the next input when Enter is pressed in title field
        const nextInput = document.querySelector<HTMLInputElement>(
          `input[name="${field === 'title' ? 'description' : 'title'}"]`
        );
        nextInput?.focus();
      }
    }
  };

  return (
    <Table>
      <TableRow>
        <TableCell padding="checkbox" />
        <TableCell>
          <Input
            name="title"
            placeholder="New task title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            onKeyDown={handleKeyDown('title')}
          />
        </TableCell>
        <TableCell>
          <Input
            name="description"
            placeholder="New task description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            onKeyDown={handleKeyDown('description')}
          />
        </TableCell>
      </TableRow>
    </Table>
  );
};

export default NewTaskForm;

import { Box, CircularProgress, Alert } from '@mui/material';
import { useCallback } from 'react';
import { TaskList } from './TaskList';
import { TaskFilter } from './TaskFilter';
import { NewTaskForm } from './NewTaskForm';
import { useTasks } from '../hooks/useTasks';
import { useTask } from '../hooks/useTask';
import { Task, TaskFilterType } from '../../../shared/types/task.types';

export const TaskManager = () => {
  const { tasks, filter, loading, error, updateTaskFilter, reorderTaskList } = useTasks();
  const { createTask, updateTaskDetails, toggleTask } = useTask();

  // Memoize handlers to prevent unnecessary re-renders of child components
  const handleUpdateTask = useCallback(
    async (id: string, updates: Partial<Task>) => {
      await updateTaskDetails(id, updates);
    },
    [updateTaskDetails]
  );

  const handleToggleStatus = useCallback(
    async (id: string) => {
      await toggleTask(id);
    },
    [toggleTask]
  );

  const handleCreateTask = useCallback(
    async (title: string, description: string) => {
      await createTask(title, description);
    },
    [createTask]
  );

  const handleTaskCreated = useCallback(() => {
    updateTaskFilter('pending');
  }, [updateTaskFilter]);

  const handleFilterChange = useCallback(
    (newFilter: TaskFilterType) => {
      updateTaskFilter(newFilter);
    },
    [updateTaskFilter]
  );

  const handleReorderTasks = useCallback(
    async (fromIndex: number, toIndex: number) => {
      await reorderTaskList(fromIndex, toIndex);
    },
    [reorderTaskList]
  );

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        Note: There is a maximum limit of 4 tasks. Try creating more tasks to see the error handling in action!
      </Alert>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TaskFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onToggleStatus={handleToggleStatus}
          onReorderTasks={handleReorderTasks}
        />
      )}

      <NewTaskForm onSubmit={handleCreateTask} onTaskCreated={handleTaskCreated} />
    </Box>
  );
};

export default TaskManager;

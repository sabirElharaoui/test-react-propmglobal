import { Box, CircularProgress, Alert } from '@mui/material';
import { TaskList } from './TaskList';
import { TaskFilter } from './TaskFilter';
import { NewTaskForm } from './NewTaskForm';
import { useTasks } from '../hooks/useTasks';
import { useTask } from '../hooks/useTask';

export const TaskManager = () => {
  const { tasks, filter, loading, error, updateTaskFilter, reorderTaskList } = useTasks();
  const { createTask, updateTaskDetails, toggleTask } = useTask();

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
        <TaskFilter value={filter} onChange={updateTaskFilter} />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTaskDetails}
          onToggleStatus={toggleTask}
          onReorderTasks={reorderTaskList}
        />
      )}

      <NewTaskForm onSubmit={createTask} />
    </Box>
  );
};

export default TaskManager;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { taskService } from '../../services/tasks.service';
import { Task } from '../../shared/types/task.types';

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,
};

// Async Thunks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const tasks = await taskService.getTasks();
  return tasks;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ title, description }: { title: string; description: string }) => {
    const task = await taskService.createTask(title, description);
    return task;
  }
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const task = await taskService.updateTask(id, updates);
    return task;
  }
);

export const toggleTaskStatusAsync = createAsyncThunk('tasks/toggleStatus', async (id: string) => {
  const task = await taskService.toggleTaskStatus(id);
  return task;
});

export const reorderTasksAsync = createAsyncThunk(
  'tasks/reorder',
  async ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const tasks = await taskService.reorderTasks(oldIndex, newIndex);
    return tasks;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'pending'>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch Tasks
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      // Create Task
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to create task';})

      // Update Task
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // Toggle Task Status
      .addCase(toggleTaskStatusAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })

      // Reorder Tasks
      .addCase(reorderTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const { setFilter } = taskSlice.actions;
export default taskSlice.reducer;

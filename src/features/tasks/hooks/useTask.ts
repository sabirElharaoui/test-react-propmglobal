import { useAppDispatch } from '../../../shared/hooks/redux';
import { createTask, updateTaskAsync, toggleTaskStatusAsync } from '../../../store/slices/taskSlice';
import { Task } from '../../../shared/types/task.types';

export const useTask = () => {
  const dispatch = useAppDispatch();

  const createNewTask = async (title: string, description: string) => {
    if (title.trim() && description.trim()) {
      try {
        await dispatch(createTask({ title, description })).unwrap();
      } catch (error) {
        console.error('Failed to create task:', error);
      }
    }
    return false;
  };

  const updateTaskDetails = async (id: string, updates: Partial<Task>) => {
    try {
      await dispatch(updateTaskAsync({ id, updates })).unwrap();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      await dispatch(toggleTaskStatusAsync(id)).unwrap();
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  return {
    createTask: createNewTask,
    updateTaskDetails,
    toggleTask,
  };
};

import { useEffect, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/redux';
import {
  setFilter,
  fetchTasks,
  createTask,
  updateTaskAsync,
  toggleTaskStatusAsync,
  reorderTasksAsync,
} from '../../../store/slices/taskSlice';
import { Task, TaskFilterType } from '../../../shared/types/task.types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, filter, loading, error } = useAppSelector(state => state.tasks);

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task: Task) => {
      if (filter === 'completed') return task.status === 'completed';
      if (filter === 'pending') return task.status === 'pending';
      return true;
    });
  }, [tasks, filter]);

  const addTask = async (title: string, description: string) => {
    await dispatch(createTask({ title, description })).unwrap();
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await dispatch(updateTaskAsync({ id, updates })).unwrap();
  };

  const toggleTaskStatus = async (id: string) => {
    await dispatch(toggleTaskStatusAsync(id)).unwrap();
  };

  const updateTaskFilter = (newFilter: TaskFilterType) => {
    dispatch(setFilter(newFilter));
  };

  const reorderTaskList = async (fromIndex: number, toIndex: number) => {
    await dispatch(reorderTasksAsync({ oldIndex: fromIndex, newIndex: toIndex })).unwrap();
  };

  return {
    tasks: filteredTasks,
    filter,
    loading,
    error,
    addTask,
    updateTask,
    toggleTaskStatus,
    updateTaskFilter,
    reorderTaskList,
    totalTasks: filteredTasks.length,
    completedTasks: tasks.filter((task: Task) => task.status === 'completed').length,
    pendingTasks: tasks.filter((task: Task) => task.status === 'pending').length,
  };
};

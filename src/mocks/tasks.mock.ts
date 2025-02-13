import { Task } from '../shared/types/task.types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete technical test',
    description: 'Implement task management app with React',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review code',
    description: 'Check for best practices and optimization',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
] as const;

export default mockTasks;

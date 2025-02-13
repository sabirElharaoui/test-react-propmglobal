import { Task } from '../shared/types/task.types';
import { mockTasks } from '../mocks/tasks.mock';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TaskService {
  private tasks: Task[] = [...mockTasks];
  private readonly MAX_TASKS = 4;

  async getTasks(): Promise<Task[]> {
    await delay(500); // we're simulating a network delay as 500ms
    return [...this.tasks];
  }

  async createTask(title: string, description: string): Promise<Task> {
    await delay(500); // Simulate network delay
    
    if (this.tasks.length >= this.MAX_TASKS) {
      throw new Error('Maximum task limit reached (4 tasks).');
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
    };
    return this.tasks[taskIndex];
  }

  async toggleTaskStatus(id: string): Promise<Task> {
    await delay(300);
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      status: this.tasks[taskIndex].status === 'completed' ? 'pending' : 'completed',
    };
    return this.tasks[taskIndex];
  }

  async reorderTasks(oldIndex: number, newIndex: number): Promise<Task[]> {
    const [movedTask] = this.tasks.splice(oldIndex, 1);
    this.tasks.splice(newIndex, 0, movedTask);
    return [...this.tasks];
  }

  // in case we need to delete a task
  async deleteTask(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
  }
}

// Export a singleton instance
export const taskService = new TaskService();

export default taskService;

import { createContext, useState, type ReactNode } from "react";
import { api } from "../api/axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  tag: string;
  note: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  tag: string;
  note?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  tag?: string;
  note?: string;
}

interface TaskContextType {
  allTask: Task[];
  createTask: (formData: CreateTaskData) => Promise<Task>;
  getTasks: () => Promise<Task[]>;
  updateTask: (id: string, formData: UpdateTaskData) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export default function TaskProvider({
  children,
}: TaskProviderProps) {
  const [allTask, setAllTask] = useState<Task[]>([]);

  const createTask = async (
    formData: CreateTaskData
  ): Promise<Task> => {
    try {
      const response = await api.post<Task>("/api/tasks", formData);

      setAllTask((prev) => [...prev, response.data]);

      return response.data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await api.get<Task[]>("/api/tasks");

      setAllTask(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  const updateTask = async (
    id: string,
    formData: UpdateTaskData
  ): Promise<Task> => {
    try {
      const response = await api.put<Task>(
        `/api/tasks/${id}`,
        formData
      );

      setAllTask((prev) =>
        prev.map((task) =>
          task._id === id ? response.data : task
        )
      );

      return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/tasks/${id}`);

      setAllTask((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        allTask,
        createTask,
        getTasks,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
import { Todo } from "@/pages/interfaces/ITodo";
import apiClient from "../../../api/axiosConfig";

const ROUTE = "/todos";

const todoService = {
  getTodos: async (): Promise<Todo[]> => {
    try {
      const response = await apiClient.get<{ data: Todo[] }>(`${ROUTE}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getTodoById: async (todoId: number): Promise<Todo> => {
    try {
      const response = await apiClient.get<{ data: Todo }>(
        `${ROUTE}/${todoId}`
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createTodo: async (todoData: Partial<Todo>): Promise<Todo> => {
    try {
      const response = await apiClient.post<{ data: Todo }>(
        `${ROUTE}`,
        todoData
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateTodo: async (
    todoId: number,
    todoData: Partial<Todo>
  ): Promise<Todo> => {
    try {
      const response = await apiClient.put<{ data: Todo }>(
        `${ROUTE}/${todoId}`,
        todoData
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  //   deleteUser: async (todoId: number): Promise<void> => {
  //     try {
  //       const response = await apiClient.delete(`/users/${todoId}`);
  //       return response.data;
  //     } catch (error) {
  //       console.error(error);
  //       throw error;
  //     }
  //   },
};

export { todoService };

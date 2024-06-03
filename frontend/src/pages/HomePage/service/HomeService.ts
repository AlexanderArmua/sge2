import { User } from "@/pages/interfaces/IUser";
import apiClient from "../../../api/axiosConfig";

const userService = {
  getUser: async (userId: number): Promise<User> => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createUser: async (userData: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateUser: async (
    userId: number,
    userData: Partial<User>
  ): Promise<User> => {
    try {
      const response = await apiClient.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export { userService };

import { instance } from "../api/api";
import { CreateUserData, LoginFormData, Usuario } from "../types/types";


export const userService = {
  async getAll() {
    const response = await instance.get<Usuario[]>("/users");
    return response.data;
  },

  async create(payload: CreateUserData) {
    const response = await instance.post<Usuario>("/user", payload);
    return response.data;
  },

  async login(payload: LoginFormData) {
    const response = await instance.post<{ token: string; data: Usuario }>("/login", payload);
    return response.data;
  },

  async delete(id: string) {
    const response = await instance.delete(`/user/${id}`);
    return response.data;
  },

  async update(id: string, payload: CreateUserData) {
    const response = await instance.put<Usuario>(`/user/${id}`, payload);
    return response.data;
  },
};
import { instance } from "../api/api";
import { Usuario } from "../types/userType";

interface CreateUserPayload {
  nome: string;
  email: string;
  senha: string;
}

interface LoginPayload {
  email: string;
  senha: string;
}

interface UpdateUserPayload {
  data: Usuario;
}

export const userService = {
  async getAll() {
    const response = await instance.get<Usuario[]>("/users");
    return response.data;
  },

  async create(payload: CreateUserPayload) {
    const response = await instance.post<Usuario>("/user", payload);
    return response.data;
  },

  async login(payload: LoginPayload) {
    const response = await instance.post<{ token: string; data: Usuario }>("/login", payload);
    return response.data;
  },

  async delete(id: string) {
    const response = await instance.delete(`/user/${id}`);
    return response.data;
  },

  async update(id: string, payload: CreateUserPayload) {
    const response = await instance.put<UpdateUserPayload>(`/user/${id}`, payload);
    return response.data;
  },
};
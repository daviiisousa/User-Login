import axios from "axios";
import { toast } from "react-toastify";

export const instance = axios.create({
  baseURL: "https://usuarios-api-xz2w.onrender.com",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.mensagem) {
      toast.error(error.response.data.mensagem);
    } else if (error.message) {
      toast.error(error.message);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
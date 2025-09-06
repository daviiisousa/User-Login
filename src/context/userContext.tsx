import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Usuario } from "../types/userType";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/api";
import { toast } from "react-toastify";

interface UserContextInterface {
  usuarios: Usuario[];
  loading: boolean;
  getUsers: () => void;
  createUsuario: (e: React.FormEvent) => Promise<void>;
  login: (e: React.FormEvent) => Promise<void>;
  deleteUser: (id: string) => void;
  updateUser: (id: string) => void;
  setNome: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setSenha: Dispatch<SetStateAction<string>>;
  setIdUser: Dispatch<SetStateAction<string | undefined>>;
  idUser: string | undefined;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [idUser, setIdUser] = useState<string | undefined>();
  const navigate = useNavigate();

  async function getUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    setLoading(true);

    try {
      const resultado = await instance.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resultado.data;
      console.info(resultado.data);
      setUsuarios(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
        console.error("Erro:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function createUsuario(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      nome: nome,
      email: email,
      senha: senha,
    };

    if (!nome || !email || !senha) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      console.log("aqui");
      return;
    }

    try {
      const resultado = await instance.post("/user", payload);

      const data = await resultado.data;
      if (data) {
        toast.success("usuario criado com sucesso");
        return navigate("/login");
      }

      toast.error("Erro ao criar usuario");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
        console.error("Erro:", error.message);
      }
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      email: email,
      senha: senha,
    };

    try {
      const resultado = await instance.post("/login", payload);

      const data = await resultado.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("login realizado com sucesso");
        return navigate("/usuarios");
      }
      toast.error("Erro ao realizar login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
        console.error("Erro:", error.message);
      }
    }
  }

  async function deleteUser(id: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token invalido");
      return;
    }

    try {
      const resultado = await instance.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resultado.data;

      setUsuarios((prevUser) => prevUser.filter((u) => u.id != id));

      if (data) {
        toast.success("Usuario deletado com sucesso");
        return;
      }

      toast.error("Erro ao deletar usuario");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
        console.error("Erro:", error.message);
      }
    }
  }

  async function updateUser(id?: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token invalido");
      return;
    }

    try {
      const payload = {
        nome: nome,
        email: email,
        senha: senha,
      };
      const resultado = await instance.put(`/user/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resultado.data;
      setUsuarios((prevUsuario) =>
        prevUsuario.map((u) => (u.id === id ? data : u))
      );

      if (data) {
        toast.success("Usuario editado com sucesso");
        return;
      }

      toast.error("Erro ao editar usuario");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro: ${error.message}`);
        console.error("Erro:", error.message);
      }
    }
  }

  const valor: UserContextInterface = {
    usuarios,
    getUsers,
    loading,
    createUsuario,
    setNome,
    setEmail,
    setSenha,
    login,
    deleteUser,
    updateUser,
    setIdUser,
    idUser,
  };

  return <UserContext.Provider value={valor}>{children}</UserContext.Provider>;
};

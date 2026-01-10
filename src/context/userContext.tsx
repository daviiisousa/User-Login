import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Usuario } from "../types/userType";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyId, verifyPasswordLength, verifyRequiredFields } from "../helpers/verifications";
import { userService } from "../service/userService";

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
  nome: string;
  email: string;
  senha: string;
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
    setLoading(true);

    try {
      const data = await userService.getAll();

      if(!data) {
        toast.error('Nenhum usuario encontrado');
        return;
      };
      setUsuarios(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigate("/");
        console.error("Erro:", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function createUsuario(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!verifyRequiredFields(nome, email, senha)) {
      setLoading(false);
      return;
    }

    if (!verifyPasswordLength(senha)) {
      setLoading(false);
      return;
    }

    const payload = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      const data = await userService.create(payload);

      if (data) {
        toast.success("usuario criado com sucesso");
        setTimeout(() => {
          navigate("/login");
        }, 500);
        return;
      }

      toast.error("Erro ao se cadastrar");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro:", error.message);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setNome("");
      setSenha("");
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!verifyRequiredFields(email, senha)) {
      setLoading(false);
      return;
    }

    if (!verifyPasswordLength(senha)) {
      setLoading(false);
      return;
    }

    const payload = {
      email: email,
      senha: senha,
    };

    try {
      const data = await userService.login(payload);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("login realizado com sucesso");
        return navigate("/usuarios");
      }
      toast.error("Erro ao realizar login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro:", error.message);
      }
    } finally {
      setLoading(false);
      setEmail("");
      setSenha("");
    }
  }

  async function deleteUser(id: string) {
    if (!verifyId(id)) return;

    try {
      const data = await userService.delete(id);

      setUsuarios((prevUser) => prevUser.filter((u) => u.id != id));

      if (data) {
        toast.success("Usuario deletado com sucesso");
        return;
      }

      toast.error("Erro ao deletar usuario");
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigate("/");
        console.error("Erro:", error.message);
      }
    }
  }

  async function updateUser(id: string) {
    if (!verifyId(id)) return;

    if (!verifyRequiredFields(nome, email, senha)) return;

    if (!verifyPasswordLength(senha)) return;
    
    const payload = {
        nome: nome,
        email: email,
        senha: senha,
      };

    try {
      const data = await userService.update(id, payload);

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
        navigate("/");
        console.error("Erro:", error.message);
      }
    }
  }

  const valor: UserContextInterface = {
    nome,
    email,
    senha,
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

import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { CreateUserData, Usuario, LoginFormData } from "../types/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyId, verifyPasswordLength, verifyRequiredFields } from "../helpers/verifications";
import { userService } from "../service/userService";
import { userSchema } from "../schema/user.schema";
interface UserContextInterface {
  usuarios: Usuario[];
  loading: boolean;
  getUsers: () => void;
  createUsuario: (data: CreateUserData) => Promise<void>;
  login: (data: LoginFormData) => Promise<void>;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: CreateUserData) => void;
  setNome: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setSenha: Dispatch<SetStateAction<string>>;
  nome: string;
  email: string;
  senha: string;
  showModalDelete: boolean;
  setShowModalDelete: Dispatch<SetStateAction<boolean>>;
  showModalEdit: boolean;
  setShowModalEdit: Dispatch<SetStateAction<boolean>>;
  usuarioId: string;
  setUsuarioId: Dispatch<SetStateAction<string>>;
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
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [usuarioId, setUsuarioId] = useState("");
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

  async function createUsuario(data: CreateUserData) {
    setLoading(true);

    if (!verifyRequiredFields(data.nome, data.email, data.senha)) {
      setLoading(false);
      return;
    }

    if (!verifyPasswordLength(data.senha)) {
      setLoading(false);
      return;
    }

    const payload = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    };

    try {
      const data = await userService.create(payload);

      const result = userSchema.safeParse(data)

      if (!result.success) {
        toast.error("dados incorreto");
        return
      }

      if (result.success) {
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

  async function login(data: LoginFormData) {
    setLoading(true);

    const payload = {
      email: data.email,
      senha: data.senha,
    };

    try {
      const result = await userService.login(payload);

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.data));
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
    }
  }

  async function deleteUser(id: string) {
    if (!verifyId(id)) return;
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(id: string, data: CreateUserData) {
    if (!verifyId(id)) return;

    if (!verifyRequiredFields(data.nome, data.email, data.senha)) return;

    if (!verifyPasswordLength(data.senha)) return;
    
    const payload = {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      };

    setLoading(true);

    try {
      const data = await userService.update(id, payload);
      console.log(data);

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
    } finally {
      setLoading(false);
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
    showModalDelete,
    setShowModalDelete,
    showModalEdit,
    setShowModalEdit,
    usuarioId,
    setUsuarioId,
  };

  return <UserContext.Provider value={valor}>{children}</UserContext.Provider>;
};

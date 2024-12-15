import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Swal from "sweetalert2";
import { Usuario } from "../types/userType";
import { useNavigate } from "react-router-dom";

interface UserContextInterface {
  usuarios: Usuario[];
  loading: boolean;
  getUsers: () => void;
  createUsuario: (e: React.FormEvent) => Promise<void>;
  login: (e: React.FormEvent) => Promise<void>
  setNome: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setSenha: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextInterface >({} as UserContextInterface);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function getUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
      return Swal.fire({
        icon: "error",
        title: "Token inválido",
        text: "Você não está autorizado a acessar esta página.",
      });
    }

    setLoading(true);

    try {
      const resultado = await fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!resultado.ok) {
        Swal.fire({
          icon: "error",
          title: `Error ${resultado.status}`,
          text: `${resultado.statusText}`,
        });
        return;
      }

      const data = await resultado.json();
      setUsuarios(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Erro no servidor",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro desconhecido",
          text: "Algo deu errado.",
        });
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

    try {
      const resultado = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resultado.ok) {
        Swal.fire({
          icon: "error",
          title: `Erro ${resultado.status} `,
          text: ` ${resultado.statusText} `,
        });
        return;
      }

      const data = await resultado.json();
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Usuario criado",
          text: "Sucesso ao criar o usuario",
        });
        console.log("Usuário cadastrado com sucesso:", data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao criar usuario",
          text: "Não foi possivel criar usuario",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Erro no servidor",
          text: error.message,
        });
        console.error("Erro:", error.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro desconhecido",
          text: "Algo deu errado.",
        });
        console.error("Erro desconhecido:", error);
      }
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      email,
      senha,
    };

    try {
      const result = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        Swal.fire({
          icon: "error",
          title: `Erro ${result.status}`,
          text: `${result.statusText}`,
        });
        return;
      }

      const data = await result.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Armazena o token no localStorage
        Swal.fire({
          icon: "success",
          title: "Login bem-sucedido!",
          text: "Você foi autenticado com sucesso.",
        }).then(() => {
          navigate("/usuarios"); // Redireciona após o login
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Falha no login",
          text: "Não foi possível autenticar o usuário.",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Erro no servidor",
          text: error.message,
        });
        console.error("Erro:", error.message);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro desconhecido",
          text: "Algo deu errado.",
        });
        console.error("Erro desconhecido:", error);
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const valor: UserContextInterface = {
    usuarios,
    getUsers,
    loading,
    createUsuario,
    setNome,
    setEmail,
    setSenha,
    login
  };

  return <UserContext.Provider value={valor}>{children}</UserContext.Provider>;
};

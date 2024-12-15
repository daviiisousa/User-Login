import { BookUser } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

type Usuario = {
    nome: string,
    email: string
}

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <header className="bg-darkBlue text-white flex justify-around p-10 items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl">DBU</h1>
          <BookUser size={36} strokeWidth={1} />
        </div>
        <nav className="flex gap-4">
          <Link to={""}>GET</Link>
          <Link to={""}>POST</Link>
          <Link to={""}>PUT</Link>
          <Link to={""}>DELETE</Link>
        </nav>
      </header>
      <main>
        <section className="px-96 py-6">
          <h1 className="text-4xl font-bold text-center">Usuarios</h1>
          <div className="my-5 bg-darkBlue p-10 rounded-md">
            {loading ? (
              <p className="text-center text-white text-xl">Carregando usuários...</p>
            ) : usuarios.length === 0 ? (
              <p className="text-white text-center text-2xl">Nenhum usuário encontrado.</p>
            ) : (
              usuarios.map((usuario: Usuario) => (
                <div
                  className="flex justify-between text-white hover:bg-darkBlue2 px-3 py-2 rounded-md"
                  key={usuario.email}
                >
                  <p className="text-2xl">{usuario.nome}</p>
                  <p className="text-2xl font-bold">{usuario.email}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

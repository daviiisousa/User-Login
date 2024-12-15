import { BookUser } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([{
    nome:'',
    email: ''
  }]);

  async function getUsers() {
    const token = localStorage.getItem("token");

    if(!token){
        Swal.fire({
            icon:'error',
            title: 'token invalido',
            text: 'token invalido'
        })
        return
    }

    try {
      const resultado = await fetch("http://localhost:3000/usuarios", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Adiciona o token no cabeçalho
          "Content-Type": "application/json", // Define o tipo do conteúdo
        },
      });

      if (!resultado.ok) {
        Swal.fire({
          icon: "error",
          title: `Error ${resultado.status}`,
          text: `${resultado.statusText}`,
        });
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
              {usuarios.map(usuario => (
                <div className="flex justify-between text-white hover:bg-darkBlue2 px-3 py-2 rounded-md" key={usuario.email}>
                    <p className="text-2xl">{usuario.nome}</p>
                    <p className="text-2xl font-bold">{usuario.email}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

import { useContext } from "react";
import { Header } from "../components/layout/header";
import { Usuario } from "../types/userType";
import { Container } from "../components/layout/container";
import { UserContext } from "../context/userContext";

export const Usuarios = () => {
 
  const {loading, usuarios} = useContext(UserContext)

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-4xl font-bold text-center">Usuarios</h1>
          <div className="my-5 bg-darkBlue p-10 rounded-md overflow-y-scroll max-h-[650px] custom-scrollbar">
            {loading ? (
              <p className="text-center text-white text-xl">
                Carregando usuários...
              </p>
            ) : usuarios.length === 0 ? (
              <p className="text-white text-center text-2xl">
                Nenhum usuário encontrado.
              </p>
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
        </Container>
      </main>
    </>
  );
};

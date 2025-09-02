import { useContext } from "react";
import { Header } from "../components/layout/header";
import { Usuario } from "../types/userType";
import { Container } from "../components/layout/container";
import { UserContext } from "../context/userContext";
import { UserRoundPen, UserRoundX } from "lucide-react";
import { Modal } from "../components/layout/modal";
import { Footer } from "../components/layout/footer";
import { motion } from "framer-motion";

export const Usuarios = () => {
  const { setIdUser, loading, usuarios, deleteUser } = useContext(UserContext);
  console.log("usuarios: ", usuarios);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-6xl font-bold text-center">Usuarios</h1>
          <h2 className="text-center text-gray text-lg">
            total usuarios: {usuarios.length}
          </h2>
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
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex justify-between items-center text-white hover:bg-darkBlue2 px-3 py-2 rounded-md"
                  key={usuario.id}
                >
                  <p className="text-2xl">{usuario.nome}</p>
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold">{usuario.email}</p>
                    <UserRoundX
                      className="cursor-pointer"
                      onClick={() => deleteUser(usuario.id)}
                    />
                    <Modal>
                      <UserRoundPen onClick={() => setIdUser(usuario.id)} />
                    </Modal>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </Container>
      </main>
      <Footer>Todos os direitos Reservados</Footer>
    </>
  );
};

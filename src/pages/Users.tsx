import React, { useContext, useEffect } from "react";
import { Usuario } from "../types/userType";
import { Container } from "../components/layout/container";
import { UserContext } from "../context/userContext";
import { UserRoundPen, UserRoundX } from "lucide-react";
import { Modal } from "../components/layout/modal";
import { motion } from "framer-motion";
import { TableSkeleton } from "../components/skeletons/tableSkeletons";
import { InputForm } from "../components/forms/input";

export const Usuarios = () => {
  const { setIdUser, loading, usuarios, deleteUser, getUsers } =
    useContext(UserContext);

  const [textSearch, setTextSearch] = React.useState("");
  const [usersFiltered, setUsersFiltered] = React.useState<Usuario[]>([]);

  function handleSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setTextSearch(e.target.value);

    const filtered = usuarios.filter((usuario) => {
      return usuario.nome
        .toLocaleLowerCase()
        .includes(textSearch.toLocaleLowerCase());
    });

    setUsersFiltered(filtered);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <h1 className="text-5xl md:text-7xl font-bold text-center">Usuarios</h1>
        <h2 className="text-center text-gray text-lg">
          total usuarios: {usuarios.length}
        </h2>
        <div className="my-5 w-full bg-darkBlue p-5 rounded-md overflow-y-scroll max-h-[650px] custom-scrollbar">
          <div>
            <InputForm
              placeholder="Nome do usuario"
              onChange={handleSearchText}
            />
          </div>
          {loading ? (
            <TableSkeleton />
          ) : textSearch ? (
            usersFiltered.map((usuario) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-between items-center text-white hover:bg-darkBlue2 px-3 py-2  gap-2 md:gap-0 border-b border-gray hover:cursor-pointer"
                key={usuario.id}
              >
                <p className="text-sm md:text-2xl">{usuario.nome}</p>
                <div className="flex items-center gap-2 md:gap-4">
                  <p className="text-sm md:text-2xl font-bold">
                    {usuario.email}
                  </p>
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
          ) : (
            usuarios.map((usuario) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex justify-between items-center text-white hover:bg-darkBlue2 px-3 py-2  gap-2 md:gap-0 border-b border-gray hover:cursor-pointer"
                key={usuario.id}
              >
                <p className="text-sm md:text-2xl">{usuario.nome}</p>
                <div className="flex items-center gap-2 md:gap-4">
                  <p className="text-sm md:text-2xl font-bold">
                    {usuario.email}
                  </p>
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
    </>
  );
};

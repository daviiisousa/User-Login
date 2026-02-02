import { useContext, useEffect } from "react";
import { Usuario } from "../types/types";
import { Container } from "../components/layout/container";
import { UserContext } from "../context/userContext";
import { TableSkeleton } from "../components/skeletons/tableSkeletons";
import { InputForm } from "../components/forms/input";
import { useSearch } from "../hooks/useSearch";
import { ModalDelete } from "../components/modals/modalDelete";
import { ModalEdit } from "../components/modals/modalEdit";
import { TableUsuarios } from "../components/tableUsuarios";

export const Usuarios = () => {
  const {
    loading,
    usuarios,
    getUsers,
  } = useContext(UserContext);

    const { searchText, filteredItems, handleSearch } = useSearch<Usuario>(usuarios, "nome");

  useEffect(() => {
    getUsers();
  }, []);

  const usuariosExibidos = searchText ? filteredItems : usuarios;

  return (
    <>
      <Container>
        <h1 className="text-5xl md:text-7xl font-bold text-center">Usuarios</h1>
        <h2 className="text-center text-gray text-lg">
          total de usuarios: {usuarios.length}
        </h2>
        <div className="my-5 w-full bg-darkBlue p-5 rounded-2xl overflow-hidden max-h-[650px]">
          <div>
            <InputForm
              placeholder="Nome do usuario"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {loading ? ( <TableSkeleton /> ) : ( <TableUsuarios usuarios={usuariosExibidos} 
          /> )}
        </div>
        <ModalDelete />
        <ModalEdit />
      </Container>
    </>
  );
};

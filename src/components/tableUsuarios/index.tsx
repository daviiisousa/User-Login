import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { UserRoundPen, UserRoundX } from "lucide-react";
import { Usuario } from "../../types/types";

type TableUsuariosProps = {
    usuarios: Usuario[]
}

export function TableUsuarios({usuarios}: TableUsuariosProps) {
    const { setShowModalDelete, setShowModalEdit, setUsuarioId } = useContext(UserContext);
    
    function handleShowModalDelete(id: string) {
        setUsuarioId(id);
        setShowModalDelete(true);
    }
    
    function handleShowModalEdit(id: string) {
        setUsuarioId(id);
        setShowModalEdit(true);
    }

    return (
        <>
            {usuarios.length > 0 ? (
                <div className="overflow-y-auto max-h-[500px] w-full rounded-lg">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-black">
                                <th className="text-left p-2 bg-slate-200">Nome</th>
                                <th className="text-left p-2 bg-slate-200">Email</th>
                                <th className="text-left p-2 bg-slate-200">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id} className="text-black bg-white even:bg-zinc-200">
                                    <td className="p-2">{usuario.nome}</td>
                                    <td className="p-2">{usuario.email}</td>
                                    <td className="flex gap-3 p-2">
                                        <UserRoundX
                                            size={20}
                                            className="cursor-pointer"
                                            onClick={() => handleShowModalDelete(usuario.id)}
                                        />
                                        <UserRoundPen
                                            size={20}
                                            className="cursor-pointer"
                                            onClick={() => handleShowModalEdit(usuario.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-white text-center mt-3">Nenhum usuário encontrado.</p>
            )}
        </>
    )
}
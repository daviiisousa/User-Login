import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Modal } from "../modal";

export function ModalDelete() {
    const {deleteUser, loading, showModalDelete, setShowModalDelete, usuarioId} = useContext(UserContext);

    async function handleDeleteUser(){
       await deleteUser(usuarioId);
        setShowModalDelete(false);
    }
    
    return (
    <>
        {showModalDelete && (
            <Modal>
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Confirmar Exclusão</h2>
                <p className="mb-6">Tem certeza de que deseja excluir este item? Esta ação não pode ser desfeita.</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600" onClick={() => setShowModalDelete(false)}>Cancelar</button>
                    <button 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" 
                        onClick={handleDeleteUser}
                        disabled={loading}
                    >
                        {loading ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </Modal>
        )}
    </>
    );
}
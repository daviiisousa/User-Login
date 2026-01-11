import { useContext } from "react";
import { InputForm } from "../../forms/input";
import { LabelForm } from "../../forms/label";
import { Modal } from "../modal";
import { UserContext } from "../../../context/userContext";

type ModalEditProps = {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    id: string;
};

export function ModalEdit({ showModal, setShowModal, id }: ModalEditProps) {
    const { setNome, updateUser, setEmail, setSenha, loading} = useContext(UserContext);

    async function handleSave(event: React.FormEvent) {
        event.preventDefault();
        await updateUser(id);
        setShowModal(false);
    }


    return (
        <>
            {showModal && (
                <Modal>
                    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg min-w-[800px] ">
                        <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>
                        <p className="mb-6">Aqui você pode editar as informações do usuário.</p>
                        <form onSubmit={handleSave} className="flex flex-col gap-4">
                            <LabelForm className="text-white" htmlFor="nome">
                                Nome:
                            </LabelForm>
                            <InputForm
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                type="text"
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <LabelForm className="text-white" htmlFor="email">
                                Email:
                            </LabelForm>
                            <InputForm
                                id="email"
                                name="email"
                                placeholder="Digite seu email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <LabelForm className="text-white" htmlFor="senha">
                                Senha:
                            </LabelForm>
                            <InputForm
                                id="senha"
                                name="senha"
                                placeholder="Digite sua senha"
                                type="password"
                                onChange={(e) => setSenha(e.target.value)}
                            />

                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button"
                                    className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600" 
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? 'Salvando...' : 'Salvar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )
}
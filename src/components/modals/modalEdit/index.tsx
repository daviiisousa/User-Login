import { useContext } from "react";
import { InputForm } from "../../forms/input";
import { LabelForm } from "../../forms/label";
import { Modal } from "../modal";
import { UserContext } from "../../../context/userContext";
import { useForm } from "react-hook-form";
import { CreateUserData } from "../../../types/types";
import { Errors } from "../../erros";

export function ModalEdit() {
    const {  updateUser, loading, usuarioId, setShowModalEdit, showModalEdit } = useContext(UserContext);

    const {register, handleSubmit, formState: { errors }} = useForm<CreateUserData>();

    async function handleSave(data: CreateUserData) {
        await updateUser(usuarioId, data);
        setShowModalEdit(false);
    }

    return (
        <>
            {showModalEdit && (
                <Modal>
                    <div className="bg-zinc-800 p-6 rounded-lg shadow-lg min-w-[800px] ">
                        <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>
                        <p className="mb-6">Aqui você pode editar as informações do usuário.</p>
                        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-4">
                            <LabelForm className="text-white" htmlFor="nome">
                                Nome:
                            </LabelForm>
                            <InputForm
                                id="nome"
                                placeholder="Digite seu nome"
                                type="text"
                                {...register("nome", {
                                    required: "Nome é obrigatório",
                                    minLength: {
                                        value: 2,
                                        message: "Nome deve ter pelo menos 2 caracteres",
                                    },
                                })}
                            />
                            {errors.nome && ( <Errors error={String(errors.nome.message)} />)}
                            <LabelForm className="text-white" htmlFor="email">
                                Email:
                            </LabelForm>
                            <InputForm
                                id="email"
                                placeholder="Digite seu email"
                                type="email"
                                {...register("email", {
                                    required: "Email é obrigatório",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Email inválido",
                                    }
                                })}
                            />
                            {errors.email && ( <Errors error={String(errors.email.message)} />)}
                            <LabelForm className="text-white" htmlFor="senha">
                                Senha:
                            </LabelForm>
                            <InputForm
                                id="senha"
                                placeholder="Digite sua senha"
                                type="password"
                                {...register("senha", {
                                    required: "Senha é obrigatória",
                                    minLength: {
                                        value: 6,
                                        message: "Senha deve ter pelo menos 6 caracteres",
                                    },
                                })}
                            />
                            {errors.senha && ( <Errors error={String(errors.senha.message)} />)}
                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button"
                                    className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600" 
                                    onClick={() =>  setShowModalEdit(false)}
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
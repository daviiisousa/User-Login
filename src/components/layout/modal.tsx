import React, { useContext, useState } from "react";
import { LabelForm } from "../forms/label";
import { InputForm } from "../forms/input";
import { ButtonSend } from "../butoes/button";
import { UserContext } from "../../context/userContext";
import Swal from "sweetalert2";

interface ModalInterface {
  children: React.ReactNode;
}

export const Modal = ({ children }: ModalInterface) => {
  const [modal, setModal] = useState(false);

  const { updateUser, idUser, setNome, setEmail, setSenha } =
    useContext(UserContext);

  return (
    <>
      {modal ? (
        <div>
          {/* Overlay de fundo */}
          <div
            className="fixed w-screen h-screen inset-0 bg-black/60 z-40"
            onClick={() => setModal(true)} // Fecha ao clicar fora do modal
          ></div>

          {/* Modal */}
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="bg-darkBlue p-10 rounded-xl w-full max-w-5xl  shadow-lg">
              <form
                onSubmit={() => {
                  if (idUser) {
                    updateUser(idUser);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'id invalido',
                      text: 'id nao fornecido ou invalido'
                    })
                  }
                }}
                className="flex flex-col gap-4"
              >
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
                  E-mail:
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
                <ButtonSend type="submit">Enviar</ButtonSend>
                <ButtonSend type="button" onClick={() => setModal(false)}>
                  Fechar
                </ButtonSend>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {/* Botão para abrir modal */}
      <ButtonSend
        className="mt-[0rem] p-[0rem] w-[0rem] hover:border-none bg-black/0 relative bottom-0"
        onClick={() => setModal(!modal)}
        type="button"
      >
        {children}
      </ButtonSend>
    </>
  );
};

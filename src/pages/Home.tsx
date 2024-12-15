import { LabelForm } from "../layout/label";
import { InputForm } from "../layout/input";
import { ButtonSend } from "../components/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export const Home = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function createUsuario(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      const resultado = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resultado.ok) {
        Swal.fire({
          icon: "error",
          title: `Erro ${resultado.status} `,
          text: ` ${resultado.statusText} `,
        });
        return;
      }

      const data = await resultado.json();
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Usuario ciado",
          text: "Sucesso ao criar o usuario",
        });
        console.log("Usuário cadastrado com sucesso:", data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao criar usuario",
          text: "Não foi possivel criar usuario",
        });
      }
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

  return (
    <main className="h-screen flex justify-center items-center bg-darkBlue">
      <div className="w-4/5 h-4/5">
        <div className="w-full h-full rounded-md bg-bottom bg-hero-pattern bg-cover">
          <h1 className="text-center text-7xl font-bold text-lightGraay my-5">
            Cadastre-se
          </h1>
          <div className="flex justify-center items-center w-full">
            <form
              className="border-4 w-3/5 p-10 rounded-xl border-gray"
              onSubmit={createUsuario}
            >
              <div className="flex flex-col">
                <LabelForm htmlFor="nome">Nome:</LabelForm>
                <InputForm
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite seu nome"
                  id="nome"
                  name="nome"
                  type="text"
                />
                <LabelForm htmlFor="email">E-mail:</LabelForm>
                <InputForm
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu email"
                  id="email"
                  name="email"
                  type="email"
                />
                <LabelForm htmlFor="senha">Senha:</LabelForm>
                <InputForm
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  id="senha"
                  name="senha"
                  type="password"
                />
                <ButtonSend type="submit">Cadastrar</ButtonSend>
                <p className="text-white mt-3 text-center">
                  Já tem conta?
                  <Link className=" pl-2 text-darkBlue2" to={"/login"}>
                    Entre
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

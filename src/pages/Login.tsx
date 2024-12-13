import { useState } from "react";
import { InputForm } from "../layout/input";
import { LabelForm } from "../layout/label";
import { ButtonSend } from "../components/button";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      email,
      senha,
    };

    try {
      const result = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(!result.ok){
        throw new Error(`Erro: ${result.status} - ${result.statusText}`)
      }

      const data = await result.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Login bem-sucedido, token armazenado:", data.token);
      } else {
        console.log("login falhou");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  }
  return (
    <main className="h-screen flex justify-center items-center bg-darkBlue">
      <div className="w-4/5 h-4/5">
        <div className="w-full h-full rounded-md bg-bottom bg-hero-pattern bg-cover">
          <h1 className="text-center text-7xl font-bold text-lightGraay my-5">
            Login
          </h1>
          <div className="flex justify-center items-center w-full">
            <form
              className="border-4 w-3/5 p-10 rounded-xl border-gray"
              onSubmit={login}
            >
              <div className="flex flex-col">
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
                <ButtonSend type="submit">Entrar</ButtonSend>
                <p className="text-white mt-3 text-center">
                  não tem conta?
                  <Link className=" pl-2 text-darkBlue2" to={"/"}>
                    Cadastre-se
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

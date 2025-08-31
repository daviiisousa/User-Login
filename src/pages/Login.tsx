import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Login = () => {
  const { login, setEmail, setSenha } = useContext(UserContext);

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-darkBlue ">
      <div className="bg-bottom bg-hero-pattern bg-cover w-[70%] p-10 rounded-2xl space-y-5">
        <h1 className="text-7xl text-lightGraay font-bold ">Login</h1>
        <div className="flex justify-center items-center w-full">
          <form
            className="border-4 p-10 rounded-2xl w-full border-gray backdrop-blur-md"
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
                Não tem conta?
                <Link className="pl-2 text-darkBlue2 font-bold" to={"/"}>
                  Cadastre-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

import { LabelForm } from "../components/forms/label";
import { InputForm } from "../components/forms/input";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const Home = () => {
  const { createUsuario, setNome, setEmail, setSenha } =
    useContext(UserContext);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-darkBlue">
      <div className="bg-bottom bg-hero-pattern bg-cover p-5 md:p-10 rounded-2xl space-y-5 mx-10 md:my-10">
        <h1 className="text-5xl md:text-7xl font-bold text-lightGraay">
          Cadastre-se
        </h1>
        <div className="flex items-center justify-center">
          <form
            onSubmit={createUsuario}
            className="w-full p-5 md:p-10 rounded-2xl border-4 border-gray backdrop-blur-md flex flex-col"
          >
            <div className="">
              <LabelForm htmlFor="nome" children={"Nome"} />
              <InputForm
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setNome(e.target.value)}
              />
              <LabelForm children={"Email"} htmlFor="email" />
              <InputForm
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <LabelForm children={"senha"} htmlFor="senha" />
              <InputForm
                id="senha"
                name="senha"
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setSenha(e.target.value)}
              />
              <ButtonSend type="submit" children={"Cadastrar"} />
              <Link
                to="/login"
                className="text-white text-center block mt-4 text-sm"
              >
                Já tem uma conta?{" "}
                <span className="pl-2 text-darkBlue2 font-bold text-sm">
                  Faça login
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

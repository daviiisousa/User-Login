import { LabelForm } from "../layout/label";
import { InputForm } from "../layout/input";
import { ButtonSend } from "../components/button";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <body className="h-screen">
      <main className="flex justify-center items-center bg-darkBlue h-full">
        <div className="w-4/5 h-4/5">
          <div className="w-full h-full rounded-md bg-bottom bg-hero-pattern bg-cover ">
            <h1 className="text-center text-7xl font-bold text-lightGraay my-5">
              Cadastre-se
            </h1>
            <div className="flex justify-center items-center w-full ">
              <form className="border-4 w-3/5 p-10 rounded-xl border-gray">
                <div className="flex flex-col">
                  <LabelForm htmlFor="nome">Nome:</LabelForm>
                  <InputForm
                    placeholder="Digite seu nome"
                    id="nome"
                    name="nome"
                    type="text"
                  />
                  <LabelForm htmlFor="email">E-mail:</LabelForm>
                  <InputForm
                    placeholder="Digite seu email"
                    id="email"
                    name="email"
                    type="email"
                  />
                  <LabelForm htmlFor="senha">Senha:</LabelForm>
                  <InputForm
                    placeholder="Digite sua senha"
                    id="senha"
                    name="senha"
                    type="password"
                  />
                  <ButtonSend type="submit">Cadastrar</ButtonSend>
                  <p className="text-white mt-3 text-center">
                    ja tem conta ?{" "}
                    <Link className="text-darkBlue2" to={"/login"}>
                      Entre
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};

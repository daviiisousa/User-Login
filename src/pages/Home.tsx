import { LabelForm } from "../components/forms/label";
import { InputForm } from "../components/forms/input";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


export const Home = () => {

 const {createUsuario, setNome, setEmail, setSenha} = useContext(UserContext)

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

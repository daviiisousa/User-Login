import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import {motion} from 'framer-motion'


export const Login = () => {

  const {login, setEmail, setSenha} = useContext(UserContext)

  return (
    <main className="h-screen flex justify-center items-center bg-darkBlue">
      <div className="w-4/5 h-4/5">
        <motion.div
         initial={{opacity: 0, y: 0}}
         animate={{opacity: 1, y: -20}}
         transition={{duration: 1.5}}
          className="w-full h-full rounded-md bg-bottom bg-hero-pattern bg-cover"
         >
          <h1 className="text-center text-8xl text-lightGraay font-bold text-lightGray py-10">
            Login
          </h1>
          <div className="flex justify-center items-center w-full">
            <form
              className="border-4 w-3/5 p-10 rounded-md border-gray"
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
        </motion.div>
      </div>
    </main>
  );
};

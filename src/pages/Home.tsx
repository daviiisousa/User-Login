import { LabelForm } from "../components/forms/label";
import { InputForm } from "../components/forms/input";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { motion } from 'framer-motion'

export const Home = () => {

  const { createUsuario, setNome, setEmail, setSenha } = useContext(UserContext)

  return (
    <div className="h-screen w-full flex justify-center items-center bg-darkBlue">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ duration: 1.5 }}
        className="rounded-md bg-bottom bg-hero-pattern bg-cover w-4/5 h-[90%] flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-lightGraay mb-10">
          Cadastre-se
        </h1>
        <form onSubmit={createUsuario} className=" w-3/5 p-10 rounded-md border-4 border-gray flex flex-col ">
          <div>
            <LabelForm htmlFor="nome" children={'Nome'} />
            <InputForm
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <LabelForm children={'Email'} htmlFor="email" />
            <InputForm
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <LabelForm children={'senha'} htmlFor="senha" />
            <InputForm
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <ButtonSend type="submit" children={"Enviar"} />
            <Link to="/login" className="text-lightGraay text-center block mt-4">
              Já tem uma conta? <span className="pl-2 text-darkBlue2 font-bold">Faça login</span>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

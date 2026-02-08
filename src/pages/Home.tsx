import { LabelForm } from "../components/forms/label";
import { InputForm } from "../components/forms/input";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { Errors } from "../components/erros";
import { CreateUserData, registerSchema } from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const Home = () => {
  const { createUsuario} = useContext(UserContext);

  const {
      register,
      handleSubmit,
      formState: {errors, isSubmitting}
    } = useForm<CreateUserData>({
      resolver: zodResolver(registerSchema)
    });

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-darkBlue">
      <div 
        className="w-[70%] bg-bottom bg-cover p-5 md:p-10 rounded-2xl space-y-5 mx-5 md:mx-10  md:my-10"
        style={{ backgroundImage: 'url(/montanha.jpg)' }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-lightGraay">
          Cadastre-se
        </h1>
        <div className="flex items-center justify-center">
          <form
            onSubmit={handleSubmit(createUsuario)}
            className="w-full p-5 md:p-10 rounded-2xl border-4 border-gray backdrop-blur-md flex flex-col"
          >
            <div className="">
              <div className="mb-4">
                <LabelForm htmlFor="nome" children={"Nome"} />
                <InputForm
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  {...register("nome")}
                />
                {errors.nome && ( <Errors error={errors.nome.message} />)}
              </div>
              <div className="mb-4">
                <LabelForm children={"Email"} htmlFor="email" />
                <InputForm
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  {...register("email")}
                />
                {errors.email && ( <Errors error={errors.email.message} />)}
              </div>
              <div className="mb-4">
                <LabelForm children={"senha"} htmlFor="senha" />
                <InputForm
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  {...register("senha")}
                />
                {errors.senha && ( <Errors error={errors.senha.message} />)}
              </div>
              <ButtonSend
                disabled={isSubmitting}
                variant="primary"
                type="submit"
                children={isSubmitting ? "Cadastrando..." : "Cadastrar"}
              />
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

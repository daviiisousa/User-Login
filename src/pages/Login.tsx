import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { ButtonSend } from "../components/butoes/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { LoginFormData } from "../types/types";

export const Login = () => {
  const { login } = useContext(UserContext);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-darkBlue ">
      <div 
       className="bg-bottom bg-cover w-full mx-5 p-5 md:p-10 md:w-[60%]  border rounded-2xl space-y-5"
       style={{ backgroundImage: 'url(/montanha.jpg)' }}
      >
        <h1 className="text-5xl md:text-7xl text-lightGraay font-bold ">
          Login
        </h1>
        <div className="flex justify-center items-center w-full">
          <form
            className="border-4 p-5 md:p-10 rounded-2xl w-full border-gray backdrop-blur-md"
            onSubmit={handleSubmit(login)}
          >
            <div className="flex flex-col">
              <div className="mb-4">
                <LabelForm htmlFor="email">E-mail:</LabelForm>
                <InputForm
                  placeholder="Digite seu email"
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "E-mail inválido",
                    }
                  })}
                />
                {errors.email && ( <span className="text-red-500">{String(errors.email.message)}</span>)}
              </div>
              <div className="mb-4">
                <LabelForm htmlFor="senha">Senha:</LabelForm>
                <InputForm
                  placeholder="Digite sua senha"
                  id="senha"
                  type="password"
                  {...register("senha", {
                    required: "Senha é obrigatória",
                    minLength: {
                      value: 6,
                      message: "A senha deve ter no mínimo 6 caracteres",
                    },
                  })}
                />
                {errors.senha && ( <span className="text-red-500">{String(errors.senha.message)}</span>)}
              </div>
              <ButtonSend variant="primary" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Entrando..." : "Entrar"}
              </ButtonSend>
              <p className="text-white mt-3 text-center text-sm">
                Não tem conta?
                <Link
                  className="pl-2 text-darkBlue2 font-bold text-sm"
                  to={"/"}
                >
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

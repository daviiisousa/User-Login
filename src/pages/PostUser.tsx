import { UserPlus } from "lucide-react";
import { ButtonSend } from "../components/butoes/button";
import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { Container } from "../components/layout/container";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { CreateUserData } from "../types/types";
import { Errors } from "../components/erros";

export const PostUsers = () => {
  const {createUsuario,} = useContext(UserContext);

  const {register, handleSubmit, formState: {errors, isSubmitting} } = useForm<CreateUserData>();

  return (
    <Container>
      <h1 className="text-5xl md:text-7xl font-bold my-6 flex items-center flex-wrap gap-4">
        Criar Usuario <UserPlus size={48} strokeWidth={3} />
      </h1>
      <form className="bg-lightGraay p-10 rounded-2xl" onSubmit={handleSubmit(createUsuario)}>
        <LabelForm htmlFor="nome">Nome:</LabelForm>
        <InputForm
          id="nome"
          placeholder="Digite seu nome"
          type="text"
          {...register("nome",
            { required: "Nome é obrigatório",
                minLength: {
                  value: 2,
                  message: "Nome deve ter pelo menos 2 caracteres",
                }
            })
          }
        />
        {errors.nome && <Errors error={String(errors.nome?.message)} />}
        <LabelForm htmlFor="email">E-mail:</LabelForm>
        <InputForm
          id="email"
          placeholder="Digite seu email"
          type="email"
          {...register("email",
            { required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "E-mail inválido",
              }
            })
          }
        />{errors.email && <Errors error={String(errors.email?.message)} />}
        <LabelForm htmlFor="senha">Senha:</LabelForm>
        <InputForm
          id="senha"
          placeholder="Digite sua senha"
          type="password"
          {...register("senha",
            { required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter pelo menos 6 caracteres",
              }
            })
          }
        />
        {errors.senha && <Errors error={String(errors.senha?.message)} />}
        <ButtonSend variant="primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Carregando..." : "Enviar"}
        </ButtonSend>
      </form>
    </Container>
  );
};

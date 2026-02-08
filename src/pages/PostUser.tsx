import { UserPlus } from "lucide-react";
import { ButtonSend } from "../components/butoes/button";
import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { Container } from "../components/layout/container";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { useForm } from "react-hook-form";
import { Errors } from "../components/erros";
import { CreateUserData, registerSchema } from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const PostUsers = () => {
  const {createUsuario} = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<CreateUserData>({
    resolver: zodResolver(registerSchema)
  });

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
          {...register("nome")}
        />
        {errors.nome && <Errors error={errors.nome.message} />}
        <LabelForm htmlFor="email">E-mail:</LabelForm>
        <InputForm
          id="email"
          placeholder="Digite seu email"
          type="email"
          {...register("email")}
        />
        {errors.email && <Errors error={errors.email.message} />}
        <LabelForm htmlFor="senha">Senha:</LabelForm>
        <InputForm
          id="senha"
          placeholder="Digite sua senha"
          type="password"
          {...register("senha")}
        />
        {errors.senha && <Errors error={errors.senha.message} />}
        <ButtonSend variant="primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Carregando..." : "Enviar"}
        </ButtonSend>
      </form>
    </Container>
  );
};

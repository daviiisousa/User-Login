import { UserPlus } from "lucide-react";
import { ButtonSend } from "../components/butoes/button";
import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { Container } from "../components/layout/container";
import { Header } from "../components/layout/header";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Footer } from "../components/layout/footer";

export const PostUsers = () => {
  const { createUsuario, setNome, setEmail, setSenha } =
    useContext(UserContext);

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-6xl font-bold my-6 flex items-center gap-4">
            Criar Usuario <UserPlus size={48} strokeWidth={3} />
          </h1>
          <form
            className="bg-zinc-300 p-10 rounded-lg"
            onSubmit={createUsuario}
          >
            <LabelForm htmlFor="nome">Nome:</LabelForm>
            <InputForm
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              type="text"
              onChange={(e) => setNome(e.target.value)}
            />
            <LabelForm htmlFor="email">E-mail:</LabelForm>
            <InputForm
              id="email"
              name="emal"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              type="email"
            />
            <LabelForm htmlFor="senha">Senha:</LabelForm>
            <InputForm
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              type="password"
              onChange={(e) => setSenha(e.target.value)}
            />
            <ButtonSend type="submit">Enviar</ButtonSend>
          </form>
        </Container>
      </main>
      <Footer>Todos os direitos Reservados</Footer>
    </>
  );
};

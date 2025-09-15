import { UserPlus } from "lucide-react";
import { ButtonSend } from "../components/butoes/button";
import { InputForm } from "../components/forms/input";
import { LabelForm } from "../components/forms/label";
import { Container } from "../components/layout/container";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const PostUsers = () => {
  const {
    createUsuario,
    setNome,
    setEmail,
    setSenha,
    loading,
    nome,
    email,
    senha,
  } = useContext(UserContext);

  return (
    <Container>
      <h1 className="text-5xl md:text-7xl font-bold my-6 flex items-center flex-wrap gap-4">
        Criar Usuario <UserPlus size={48} strokeWidth={3} />
      </h1>
      <form className="bg-lightGraay p-10 rounded-2xl" onSubmit={createUsuario}>
        <LabelForm htmlFor="nome">Nome:</LabelForm>
        <InputForm
          value={nome}
          id="nome"
          name="nome"
          placeholder="Digite seu nome"
          type="text"
          onChange={(e) => setNome(e.target.value)}
        />
        <LabelForm htmlFor="email">E-mail:</LabelForm>
        <InputForm
          value={email}
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          type="email"
        />
        <LabelForm htmlFor="senha">Senha:</LabelForm>
        <InputForm
          value={senha}
          id="senha"
          name="senha"
          placeholder="Digite sua senha"
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
        <ButtonSend variant="primary" disabled={loading} type="submit">
          {loading ? "Carregando..." : "Enviar"}
        </ButtonSend>
      </form>
    </Container>
  );
};

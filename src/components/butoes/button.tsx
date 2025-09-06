import { ReactNode, MouseEvent } from "react";

interface ButtonSendInterface {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string; // Permite adicionar estilos personalizados
}

export const ButtonSend = ({
  children,
  type = "button", // Valor padrão definido como "button"
  onClick,
  className = "", // Valor padrão vazio
}: ButtonSendInterface) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-darkBlue w-full text-white p-2 md:p-5 text-sm md:text-3xl mt-3 rounded-2xl hover:ring ring-white transition-all hover:bg-transparent
         ${className}`}
    >
      {children}
    </button>
  );
};

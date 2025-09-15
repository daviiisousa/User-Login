import React, { ReactNode } from "react";

type ButtonSendInterface = {
  children: ReactNode;
  variant: "primary" | "secondary";
  className?: string; // Permite adicionar estilos personalizados
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonSend = ({
  children,
  className,
  variant,
  ...props
}: ButtonSendInterface) => {
  function getVariant() {
    switch (variant) {
      case "primary":
        return "bg-darkBlue hover:bg-transparent";
      case "secondary":
        return "bg-lightGraay hover:bg-slate-700";
      default:
        return "";
    }
  }
  return (
    <button
      {...props}
      className={`w-full text-white p-2 md:p-5 text-sm md:text-3xl mt-3 rounded-2xl hover:ring ring-white transition-all ${getVariant()} ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      }
         ${className}`}
    >
      {children}
    </button>
  );
};

import { InputHTMLAttributes } from "react";

type InputFormInterface = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({ className, ...props }: InputFormInterface) => {
  return (
    <input
      className={`mb-3 w-full rounded-2xl py-3 px-2 text-black bg-zinc-200 hover:ring ring-lightGraay ${className}`}
      {...props}
    />
  );
};

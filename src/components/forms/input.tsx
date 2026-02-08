import { InputHTMLAttributes, forwardRef } from "react";

type InputFormInterface = {
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = forwardRef<HTMLInputElement, InputFormInterface>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`mb-3 w-full rounded-md py-3 px-2 text-black bg-zinc-200 hover:ring ring-lightGraay ${className}`}
        {...props}
      />
    );
  }
);

InputForm.displayName = "InputForm";

import { ReactNode } from "react";

interface LabelFormProps {
  children: ReactNode;
  htmlFor: string;
  className?: string;
}

export const LabelForm = ({
  children,
  htmlFor,
  className = "",
}: LabelFormProps) => {
  return (
    <label
      className={`text-sm md:text-2xl font-medium text-slate-900 ${className} `}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

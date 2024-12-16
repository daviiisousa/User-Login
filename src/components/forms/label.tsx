import { ReactNode } from "react";

interface LabelFormProps {
    children: ReactNode;
    htmlFor: string;
    className?: string
}

export const LabelForm = ({ children, htmlFor, className = '' }: LabelFormProps) => {
    return (
        <label className={`text-2xl mt-3 font-light ${className} `} htmlFor={htmlFor}>{children}</label>
    );
};

import { ReactNode } from "react";

interface LabelFormProps {
    children: ReactNode;
    htmlFor: string
}

export const LabelForm = ({ children, htmlFor }: LabelFormProps) => {
    return (
        <label className="text-2xl mt-3 font-light" htmlFor={htmlFor}>{children}</label>
    );
};

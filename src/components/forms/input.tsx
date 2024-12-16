import { ChangeEvent } from "react";

interface InputFormInterface  {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const InputForm = ({type, name, id, placeholder, onChange}: InputFormInterface) => {
    return(
        <input className="mt-3 mb-3 w-full rounded-md p-1 text-black" onChange={onChange}  placeholder={placeholder} type={type} name={name} id={id} required/>
    )
}
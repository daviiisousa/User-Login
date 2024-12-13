interface InputFormInterface  {
    type: string,
    name: string,
    id: string,
    placeholder: string,
}

export const InputForm = ({type, name, id, placeholder}: InputFormInterface) => {
    return(
        <input className="mt-3 w-full rounded-md p-1" placeholder={placeholder} type={type} name={name} id={id} required/>
    )
}
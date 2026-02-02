export interface LoginFormData {
  email: string;
  senha: string;
}

export interface Usuario  {
    id: string
    nome: string;
    email: string;
};

export interface CreateUserData {
    nome: string;
    email: string;
    senha: string;
}
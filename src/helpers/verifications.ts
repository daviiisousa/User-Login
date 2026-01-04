import { toast } from "react-toastify";

export function verifyToken(token: string | null): boolean {
    if (!token) {
        toast.error("Permissão negada");
        return false;
    }
    return true;
}

export function verifyId(id: string | undefined): boolean {
    if (!id) {
        toast.error("ID do usuario não fornecido");
        return false;
    }
    return true;
}

export function verifyRequiredFields(...fields: (string | undefined)[]): boolean {
    if (fields.some(field => !field || field.trim() === "")) {
        toast.error("Preencha todos os campos");
        return false;
    }
    return true;
}

export function verifyPasswordLength(password: string): boolean {
    if (password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres");
        return false;
    }
    return true;
}
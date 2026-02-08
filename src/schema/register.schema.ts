import { z } from "zod";
import { loginSchema } from "./login.schema";

export const registerSchema = loginSchema.extend({
    nome: z.string().min(2, "O nome é obrigatório"),
})

export type CreateUserData = z.infer<typeof registerSchema>;
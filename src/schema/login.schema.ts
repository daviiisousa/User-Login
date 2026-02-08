import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string()
            .min(1, "O email é obrigatório")
            .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "O email deve ser válido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;    
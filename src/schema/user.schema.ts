import { z } from "zod"
 
export const userSchema = z.object({
    id: z.number(),
    nome: z.string(),
    email: z.string()
})
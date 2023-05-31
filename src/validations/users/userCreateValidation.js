import { z } from "zod";

const userCreateSchema = z.object({
    firstName: z.string().max(35).trim(),
    lastName: z.string().max(35).trim(),
    email: z.string().email().toLowerCase().trim(),
    age: z.number(),
    password: z.string().trim()
});

export default userCreateSchema;

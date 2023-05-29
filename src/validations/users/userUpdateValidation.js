import { z } from "zod";

const userUpdateSchema = z.object({
    uid: z.string().length(24).trim(),
    firstName: z.string().max(35).trim(),
    lastName: z.string().max(35).trim(),
    email: z.string().email().toLowerCase().trim(),
    age: z.number(),
    password: z.string().trim()
});

export default userUpdateSchema;
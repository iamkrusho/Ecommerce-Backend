import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().trim()
});

export default loginSchema;

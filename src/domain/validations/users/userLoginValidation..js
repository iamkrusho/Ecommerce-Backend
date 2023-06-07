import { z } from "zod";

const userLoginSchema = z.object({
    email: z.string().email().toLowerCase().trim(),
    password: z.string().trim()
});

export default userLoginSchema;

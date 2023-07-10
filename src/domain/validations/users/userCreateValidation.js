import { z } from "zod";

import idSchema from "../shared/idValidation.js";

const userCreateSchema = z.object({
    firstName: z.string().max(35).trim(),
    lastName: z.string().max(35).trim(),
    email: z.string().email().toLowerCase().trim(),
    age: z.number().optional(),
    role: idSchema.default(null).optional(),
    isAdmin: z.boolean().default(false).optional(),
    password: z.string().trim()
});

export default userCreateSchema;

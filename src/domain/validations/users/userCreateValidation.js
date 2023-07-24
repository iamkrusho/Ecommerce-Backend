import { z } from "zod";

import idSchema from "../shared/idValidation.js";
import emailSchema from "../shared/emailValidation.js";

const userCreateSchema = z.object({
    firstName: z.string().nonempty().max(35).trim(),
    lastName: z.string().nonempty().max(35).trim(),
    email: emailSchema,
    age: z.number().optional(),
    role: idSchema.default(null).optional(),
    isAdmin: z.boolean().default(false).optional(),
    password: z.string().nonempty().trim()
});

export default userCreateSchema;

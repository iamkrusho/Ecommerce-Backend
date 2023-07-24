import { z } from "zod";

import emailSchema from "../shared/emailValidation.js";

const userLoginSchema = z.object({
    email: emailSchema,
    password: z.string().nonempty().trim()
});

export default userLoginSchema;

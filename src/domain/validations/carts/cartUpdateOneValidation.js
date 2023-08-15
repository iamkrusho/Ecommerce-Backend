import { z } from "zod";

import idSchema from "../shared/idValidation.js";

const cartUpdateOneSchema = z.object({
    cid: idSchema,
    pid: idSchema,
    quantity: z.number().refine(val => val > 0, { message: "Quantity value must to be greater than 0" })
});

export default cartUpdateOneSchema;

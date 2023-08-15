import { z } from "zod";

import idSchema from "../shared/idValidation.js";

const cartUpdateSchema = z.object({
    cid: idSchema,
    products: z.object({
        product: z.string().length(24),
        quantity: z.number().refine(val => val > 0, { message: "Quantity value must to be greater than 0" })
    }).array().nonempty()
});

export default cartUpdateSchema;

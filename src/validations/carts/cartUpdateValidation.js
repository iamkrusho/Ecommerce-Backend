import { z } from "zod";

const cartUpdateSchema = z.object({
    cid: z.string().length(24).trim(),
    products: z.object({
        product: z.string().length(24),
        quantity: z.number().refine(val => val > 0, {message: "Quantity value must to be greater than 0"})
    }).array().nonempty()
});

export default cartUpdateSchema;

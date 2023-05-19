import { z } from "zod";

const cartUpdateOneSchema = z.object({
    cid: z.string().length(24).trim(),
    pid: z.string().length(24).trim(),
    quantity: z.number().refine(val => val > 0, {message: "Quantity value must to be greater than 0"})
});

export default cartUpdateOneSchema;

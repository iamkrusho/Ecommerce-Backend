import { z } from "zod";

const productCreateSchema = z.object({
    title: z.string().nonempty().max(40).trim(),
    description: z.string().nonempty().max(200).trim(),
    price: z.number(),
    thumbnails: z.string().trim().or(z.string().trim().array()).optional(),
    category: z.string().nonempty().trim(),
    status: z.boolean().optional().default(true),
    stock: z.number()
});

export default productCreateSchema;

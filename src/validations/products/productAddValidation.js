import { z } from "zod";

const productAddSchema = z.object({
    title: z.string().max(40).trim(),
    description: z.string().max(200).trim(),
    price: z.number(),
    thumbnails: z.string().trim().or(z.string().trim().array()).optional(),
    category: z.string().trim(),
    status: z.boolean().optional().default(true),
    stock: z.number()
});

export default productAddSchema;

import { z } from "zod";

const productUpdateSchema = z.object({
    pid: z.string().length(24).trim(),
    title: z.string().max(40).trim().optional(),
    description: z.string().max(150).trim().optional(),
    price: z.number().optional(),
    thumbnails: z.string().trim().or(z.string().trim().array()).optional(),
    category: z.string().trim().optional(),
    status: z.boolean().optional(),
    stock: z.number().optional()
});

export default productUpdateSchema;

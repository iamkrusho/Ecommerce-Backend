import { z } from "zod";

const productIdSchema = z.object({
    pid: z.string().length(24).trim()
});

export default productIdSchema;

import { z } from "zod";

const cartProductSchema = z.object({
    cid: z.string().length(24).trim(),
    pid: z.string().length(24).trim()
});

export default cartProductSchema;

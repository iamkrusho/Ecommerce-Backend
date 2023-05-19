import { z } from "zod";

const cartIdSchema = z.object({
    cid: z.string().length(24).trim()
});

export default cartIdSchema;

import { z } from "zod";

const userIdSchema = z.object({
    uid: z.string().length(24).trim()
});

export default userIdSchema;

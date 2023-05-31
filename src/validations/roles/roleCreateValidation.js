import { z } from "zod";

const roleCreateSchema = z.object({
    name: z.string().max(15).trim(),
    permissions: z.string().trim().array().nonempty()
});

export default roleCreateSchema;

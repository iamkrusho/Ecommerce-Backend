import { z } from "zod";

const roleCreateSchema = z.object({
    name: z.string().nonempty().max(15).trim(),
    permissions: z.string().trim().array().nonempty()
});

export default roleCreateSchema;

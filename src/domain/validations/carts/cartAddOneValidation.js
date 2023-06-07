import { z } from "zod";

import idSchema from "../shared/idValidation.js";

const cartAddOneSchema = z.object({
    cid: idSchema,
    pid: idSchema
});

export default cartAddOneSchema;

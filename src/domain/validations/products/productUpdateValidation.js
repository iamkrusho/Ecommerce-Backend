import { z } from "zod";

import idSchema from "../shared/idValidation.js";
import productCreateSchema from "./productCreateValidation.js";

const productUpdateSchema = z.intersection(
    z.object({ pid: idSchema }),
    productCreateSchema
);

export default productUpdateSchema;

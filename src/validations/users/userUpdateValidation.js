import { z } from "zod";

import idSchema from "../shared/idValidation.js";
import userCreateSchema from "./userCreateValidation.js";

const userUpdateSchema = z.intersection(
    z.object({uid: idSchema }),
    userCreateSchema
);

export default userUpdateSchema;
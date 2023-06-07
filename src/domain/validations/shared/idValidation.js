import { z } from "zod";

const idSchema = z.string().length(24).trim();

export default idSchema;

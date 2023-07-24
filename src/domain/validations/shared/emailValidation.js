import { z } from "zod";

const emailSchema = z.string().email().toLowerCase().trim();

export default emailSchema;

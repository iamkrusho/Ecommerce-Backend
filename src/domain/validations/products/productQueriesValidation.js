import { z } from "zod";

const productQueriesSchema = z.object({
    limit: z.string().refine(val => val > 0, { message: "Limit must to be greater than 0" }).transform(val => +val).optional().default("5"),
    query: z.string().regex(/^([^:\n]+):([^:\n]+)$/, "Query must to have this format: 'type:value'").transform(val => {
        if (val === "null:null") return {};
        const [key, value] = val.split(":");
        return { [key]: value };
    }).optional().default("null:null"),
    page: z.string().refine(val => val > 0, { message: "Page must to be greater than 0" }).transform(val => +val).optional().default("1"),
    sort: z.string().toLowerCase().trim().refine(val => ["asc", "desc"].includes(val),
    { message: "Invalid option, try using: 'asc' or 'desc'" }).optional().default("asc")
});

export default productQueriesSchema;

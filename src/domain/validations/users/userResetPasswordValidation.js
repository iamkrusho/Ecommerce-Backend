import { z } from "zod";

const userResetPasswordSchema = z.object({
    token: z.string().nonempty(),
    newPassword: z.string().nonempty().trim(),
    confirmNewPassword: z.string().nonempty().trim()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"]
});

export default userResetPasswordSchema;

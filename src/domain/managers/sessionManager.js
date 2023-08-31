import jwt from "jsonwebtoken";

import container from "../../container.js";
import EmailManager from "./emailManager.js";

import { createHash, generateResetToken, isValidPassword, generateAccessToken, generateLogoutToken } from "../../shared/index.js";

import emailSchema from "../validations/shared/emailValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";
import userResetPasswordSchema from "../validations/users/userResetPasswordValidation.js";

class SessionManager {
    #UserRepository = container.resolve("UserRepository");

    async signup(data) {
        const user = await userCreateSchema.parseAsync(data);

        const userExists = await this.#UserRepository.findByEmail(user.email);

        if (userExists) throw new Error("User already exist");

        return await this.#UserRepository.insertOne(
            { ...user, role: null, isAdmin: false, isPremium: false, password: await createHash(user.password) }
        );
    }

    async login(data) {
        const { email, password } = await userLoginSchema.parseAsync(data);

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("Incorrect user");

        const validation = await isValidPassword(user, password);

        if (!validation) throw new Error("Incorrect password");

        await this.#UserRepository.update({ uid: user.id, update: { last_connection: Date.now() } });

        return generateAccessToken(user);
    }

    async forgotPassword(data) {
        const email = await emailSchema.parseAsync(data);

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("User not found");

        const token = generateResetToken(user);

        await EmailManager.send({
            templateFile: "forgotPasswordTemplate.hbs",
            payload: {
                email,
                subject: "Cambio de contraseña",
                token,
                serverPort: process.env.NODE_PORT
            }
        });

        return true;
    }

    async resetPassword(data) {
        const { token, newPassword } = await userResetPasswordSchema.parseAsync(data);

        let uid;

        jwt.verify(token, process.env.JWT_RESET_KEY, (err, credentials) => {
            if (err) throw new Error("Your token has expired");

            uid = credentials.user.id;
        });

        const userUpdated = await this.#UserRepository.update({ uid, update: { password: await createHash(newPassword) } });

        if (!userUpdated) throw new Error("User not found");

        return true;
    }

    async logout(data) {
        const email = await emailSchema.parseAsync(data);

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("Incorrect user");

        await this.#UserRepository.update({ uid: user.id, update: { last_connection: Date.now() } });

        return generateLogoutToken();
    }
}

export default SessionManager;

import jwt from "jsonwebtoken";

import container from "../../container.js";
import EmailManager from "./emailManager.js";

import { createHash, generateResetToken, isValidPassword, transport } from "../../shared/index.js";

import emailSchema from "../validations/shared/emailValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";
import userResetPasswordSchema from "../validations/users/userResetPasswordValidation.js";

class SessionManager {
    #UserRepository = container.resolve("UserRepository");

    async create(data) {
        const user = await userCreateSchema.parseAsync(data);

        const exits = await this.#UserRepository.findByEmail(user.email);

        if (exits) throw new Error("User already exist");

        return await this.#UserRepository.insertOne({...user, password: await createHash(user.password)});
    }

    async validate(data) {
        const { email, password } = await userLoginSchema.parseAsync(data);

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("Incorrect user");

        const validation = await isValidPassword(user, password);
        
        if (!validation) throw new Error("Incorrect password"); 

        return user;
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
                token
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

        const userUpdated = await this.#UserRepository.update({ uid, update: { password: await createHash(newPassword) }});
        
        if (!userUpdated) throw new Error("User not found");

        return true;
    } 
}

export default SessionManager;

import jwt from "jsonwebtoken";

import container from "../../container.js";

import { createHash, generateResetToken, isValidPassword, transport } from "../../shared/index.js";

import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";

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
        const { email } = data;

        const user = await this.#UserRepository.findByEmail(email);

        if (!user) throw new Error("User not found");

        const token = generateResetToken(user); 

        await transport.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Cambio de contraseña",
            html: 
            `<div>
                <h1>Has solicitado un cambio de contraseña</h1>
                <br>
                <p>Por favor ingresa al siguiente enlace: <a href="http://localhost:${process.env.NODE_PORT}/api/session/resetPassword?token=${token}">Link</a></p>
            </div>`
        });

        return true;
    }

    async resetPassword(data) {
        const { token, newPassword, confirmNewPassword } = data;

        let uid;

        jwt.verify(token, process.env.JWT_RESET_KEY, (err, credentials) => {
            if (err) throw new Error("Your token has expired");
    
            uid = credentials.user.id;
        });

        if (newPassword !== confirmNewPassword) throw new Error("Passwords don't match");

        const userUpdated = await this.#UserRepository.update({ uid, update: { password: await createHash(newPassword) }});
        
        if (!userUpdated) throw new Error("User not found");

        return true;
    } 
}

export default SessionManager;

import UsersMongooseDao from "../daos/UsersMongooseDao.js";

import { createHash, isValidPassword } from "../shared/index.js";

import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";

class SessionManager {
    #dao = new UsersMongooseDao();

    async create(data) {
        const user = await userCreateSchema.parseAsync(data);

        const exits = await this.#dao.findByEmail(user.email);

        if (exits) throw new Error("User already exits");

        return await this.#dao.insertOne({...user, password: await createHash(user.password)});
    }

    async validate(data) {
        const { email, password } = await userLoginSchema.parseAsync(data);

        const user = await this.#dao.findByEmail(email);

        if (!user) throw new Error("User not found");

        const validation = await isValidPassword(user, password);
        
        if (!validation) throw new Error("Incorrect password"); 

        return user;
    }
}

export default SessionManager;

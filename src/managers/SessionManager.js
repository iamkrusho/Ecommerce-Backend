import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

import { createHash, isValidPassword } from "../shared/index.js";

import userCreateSchema from "../validations/users/userCreateValidation.js";
import userLoginSchema from "../validations/users/userLoginValidation..js";

class SessionManager {
    #dao = new UsersMongooseDao();

    async create(data) {
        const user = await userCreateSchema.parseAsync(data);

        const userExists = await this.#dao.findByEmail(user.email);

        if (userExists) throw new Error("User already exits");

        return await this.#dao.insertOne({...user, password: await createHash(user.password)});
    }

    async validate(data) {
        const { email, password } = await userLoginSchema.parseAsync(data);

        const user = await this.#dao.findByEmail(email);
        
        if (!(await isValidPassword(user, password))) {
            throw("Incorrect password");
        } 

        return user;
    }
}

export default SessionManager;

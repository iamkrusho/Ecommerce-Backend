import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

import { createHash, isValidPassword } from "../shared/index.js";

class SessionManager {
    #dao = new UsersMongooseDao();

    async create(user) {
        const userExists = await this.#dao.findByEmail(user.email);

        if (userExists) throw new Error("User already exits");

        return await this.#dao.insertOne({...user, password: createHash(user.password)});
    }

    async validate(data) {
        const { email, password } = data;

        const user = await this.#dao.findByEmail(email);
        
        if(!isValidPassword(user, password)) {
            throw("Incorrect password");
        } 

        return true;
    }
}

export default SessionManager;

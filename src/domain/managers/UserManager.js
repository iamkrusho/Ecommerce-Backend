import UsersMongooseDao from "../../data/daos/usersMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userUpdateSchema from "../validations/users/userUpdateValidation.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getAll() {
        const result = await this.#dao.find();

        if (!result) throw new Error("Users not found");

        return result;
    }

    async getOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        const result = await this.#dao.findOne(uid);

        if (!result) throw new Error("User not found");

        return result;
    }

    async getOneByEmail(email) {
        const result = await this.#dao.findByEmail(email);

        if (!result) throw new Error("User not found");

        return result;
    }

    async addOne(data) {
        const user = await userCreateSchema.parseAsync(data);
        
        return await this.#dao.insertOne(user);
    }
    
    async updateOne(data) {
        const { uid, ...update} = await userUpdateSchema.parseAsync(data);

        return await this.#dao.update(uid, update);
    }

    async deleteOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        const result = await this.#dao.delete(uid);

        if (!result) throw new Error("User not found");

        return result;
    }
}

export default UserManager;

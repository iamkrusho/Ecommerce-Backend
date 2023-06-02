import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userUpdateSchema from "../validations/users/userUpdateValidation.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getAll() {
        const users = await this.#dao.find();

        if (!users) throw new Error("Users not found");

        return users;
    }

    async getOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        const user = await this.#dao.findOne(uid);

        if (!user) throw new Error("User not found");

        return user;
    }

    async getOneByEmail(email) {
        const user = await this.#dao.findByEmail(email);

        if (!user) throw new Error("User not found");

        return user;
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

        const user = await this.#dao.delete(uid);

        if (!user) throw new Error("User not found");

        return user;
    }
}

export default UserManager;

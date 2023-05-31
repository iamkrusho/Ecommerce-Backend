import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userUpdateSchema from "../validations/users/userUpdateValidation.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getAll() {
        return await this.#dao.find();
    }

    async getOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        return await this.#dao.findOne(uid);
    }

    async getOneByEmail(email) {
        return await this.#dao.findByEmail(email);
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

        return await this.#dao.delete(uid);
    }
}

export default UserManager;

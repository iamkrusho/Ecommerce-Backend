import RolesMongooseDao from "../dao/roles/RolesMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import roleCreateSchema from "../validations/roles/roleCreateValidation.js";

class UserManager {
    #dao = new RolesMongooseDao();

    async getAll() {
        return await this.#dao.find();
    }

    async getOne(id) {
        const { rid } = await idSchema.parseAsync(id);

        return await this.#dao.findOne(rid);
    }

    async addOne(data) {
        const role = await roleCreateSchema.parseAsync(data);

        return await this.#dao.insertOne(role);
    }

    async deleteOne(id) {
        const { rid } = await idSchema.parseAsync(id);

        return await this.#dao.delete(rid);
    }
}

export default UserManager;

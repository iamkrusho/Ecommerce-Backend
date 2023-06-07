import RolesMongooseDao from "../../data/daos/RolesMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import roleCreateSchema from "../validations/roles/roleCreateValidation.js";

class UserManager {
    #dao = new RolesMongooseDao();

    async getAll() {
        const result = await this.#dao.find();

        if (!result) throw new Error("Roles not found");

        return result;
    }

    async getOne(id) {
        const { rid } = await idSchema.parseAsync(id);

        const result = await this.#dao.findOne(rid);

        if (!result) throw new Error("Role not found");

        return result;
    }

    async addOne(data) {
        const role = await roleCreateSchema.parseAsync(data);

        return await this.#dao.insertOne(role);
    }

    async deleteOne(id) {
        const { rid } = await idSchema.parseAsync(id);

        const result = await this.#dao.delete(rid);

        if (!result) throw new Error("Role not found");

        return result;
    }
}

export default UserManager;

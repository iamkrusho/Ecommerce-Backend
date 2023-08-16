import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import roleCreateSchema from "../validations/roles/roleCreateValidation.js";

class RoleManager {
    #RoleRepository = container.resolve("RoleRepository");

    async getAll() {
        const result = await this.#RoleRepository.find();

        if (!result) throw new Error("Roles not found");

        return result;
    }

    async getOne(id) {
        const rid = await idSchema.parseAsync(id);

        const result = await this.#RoleRepository.findOne(rid);

        if (!result) throw new Error("Role not found");

        return result;
    }

    async getOneByName(data) {
        const result = await this.#RoleRepository.findOneByName(data);

        if (!result) throw new Error("Role not found");

        return result;
    }

    async addOne(data) {
        const role = await roleCreateSchema.parseAsync(data);

        return await this.#RoleRepository.insertOne(role);
    }

    async deleteOne(id) {
        const rid = await idSchema.parseAsync(id);

        const result = await this.#RoleRepository.delete(rid);

        if (!result) throw new Error("Role not found");

        return result;
    }
}

export default RoleManager;

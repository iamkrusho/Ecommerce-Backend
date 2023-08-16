import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userUpdateSchema from "../validations/users/userUpdateValidation.js";

class UserManager {
    #UserRepository = container.resolve("UserRepository");
    #RoleRepository = container.resolve("RoleRepository");

    async getAll() {
        const result = await this.#UserRepository.find();

        if (!result) throw new Error("Users not found");

        return result;
    }

    async getOne(id) {
        const uid = await idSchema.parseAsync(id);

        const result = await this.#UserRepository.findOne(uid);

        if (!result) throw new Error("User not found");

        return result;
    }

    async getOneByEmail(data) {
        const result = await this.#UserRepository.findByEmail(data);

        if (!result) throw new Error("User not found");

        return result;
    }

    async changePremium(id) {
        const user = await this.#UserRepository.findOne(id);

        if (!user) throw new Error("User not found");

        const role = this.#RoleRepository.findOneByName("Premium");

        if (!role) throw new Error("Role not found");

        const result = await this.#UserRepository.update({ uid: id, update: { role: role.id, isPremium: !user.isPremium } });

        return true;
    }

    async addOne(data) {
        const user = await userCreateSchema.parseAsync(data);

        return await this.#UserRepository.insertOne(user);
    }

    async updateOne(data) {
        const { uid, ...update } = await userUpdateSchema.parseAsync(data);

        return await this.#UserRepository.update({ uid, update });
    }

    async deleteOne(id) {
        const uid = await idSchema.parseAsync(id);

        const result = await this.#UserRepository.delete(uid);

        if (!result) throw new Error("User not found");

        return result;
    }
}

export default UserManager;

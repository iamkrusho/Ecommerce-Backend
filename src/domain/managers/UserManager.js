import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import userCreateSchema from "../validations/users/userCreateValidation.js";
import userUpdateSchema from "../validations/users/userUpdateValidation.js";

class UserManager {
    #repository = container.resolve("UserRepository");

    async getAll() {
        const result = await this.#repository.find();

        if (!result) throw new Error("Users not found");

        return result;
    }

    async getOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        const result = await this.#repository.findOne(uid);

        if (!result) throw new Error("User not found");

        return result;
    }

    async getOneByEmail(email) {
        const result = await this.#repository.findByEmail(email);

        if (!result) throw new Error("User not found");

        return result;
    }

    async addOne(data) {
        const user = await userCreateSchema.parseAsync(data);
        
        return await this.#repository.insertOne(user);
    }
    
    async updateOne(data) {
        const { uid, ...update} = await userUpdateSchema.parseAsync(data);

        return await this.#repository.update(uid, update);
    }

    async deleteOne(id) {
        const { uid } = await idSchema.parseAsync(id);

        const result = await this.#repository.delete(uid);

        if (!result) throw new Error("User not found");

        return result;
    }
}

export default UserManager;

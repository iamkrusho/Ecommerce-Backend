import dayjs from "dayjs";

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

    async changePremium(data) {
        const user = await this.#UserRepository.findOne(data.id);

        if (!user) throw new Error("User not found");

        if (user.isPremium) throw new Error("User is already premium");

        const role = this.#RoleRepository.findOneByName("Premium");

        if (!role) throw new Error("Role not found");

        const requiredDocs = ["dni", "address", "account"];

        const docsFilter = requiredDocs.map((requiredDoc) => user.documents.some((doc) => doc.name.includes(requiredDoc)));

        const userHasRequiredDocs = docsFilter.every((value) => value);

        if (!userHasRequiredDocs) throw new Error("User documents are required.");

        await this.#UserRepository.update({ uid: user.id, update: { role: role.id, isPremium: true } });

        return true;
    }

    async addDocuments(data) {
        const { id, files } = data;

        if (!files) throw new Error("The files are required");

        const user = await this.#UserRepository.findOne(id);

        if (!user) throw new Error("User not found");

        await this.#UserRepository.update(
            {
                uid: user.id,
                update: { documents: files.map((file) => ({ name: file.filename, reference: `public/images/${file.fieldname}` })) }
            }
        );

        return true;
    }

    async removeInactives() {
        const users = await this.#UserRepository.find();

        if (!users) throw new Error("Users not found");

        const dateNow = dayjs(Date.now());

        let deletedUsers = 0;

        for (const user of users) {
            const dateLastConnection = dayjs(user.last_connection);

            const inactiveDays = dateNow.diff(dateLastConnection, "day");

            if (inactiveDays >= 30) {
                await this.#UserRepository.delete(user.id);
                deletedUsers++;
            }
        }

        return deletedUsers;
    }

    async addOne(data) {
        const user = await userCreateSchema.parseAsync(data);

        const userExists = await this.#UserRepository.findOneByEmail(user.email);

        if (userExists) throw new Error("User already exist");

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

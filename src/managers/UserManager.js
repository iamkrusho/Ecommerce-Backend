import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getAll() {
        return await this.#dao.find();
    }

    async getOne(id) {
        return await this.#dao.findOne(id);
    }

    async getOneByEmail(email) {
        return await this.#dao.findByEmail(email);
    }

    async addOne(user) {
        return await this.#dao.insertOne(user);
    }
    
    async updateOne(id, update) {
        return await this.#dao.update(id, update);
    }

    async deleteOne(id) {
        return await this.#dao.delete(id);
    }
}

export default UserManager;

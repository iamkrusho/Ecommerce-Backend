import UsersMongooseDao from "../dao/users/UsersMongooseDao.js";

class UserManager {
    #dao = new UsersMongooseDao();

    async getOne(id) {
        return await this.#dao.findOne(id);
    }

    async getOneByEmail(email) {
        return await this.#dao.findByEmail(email);
    }

    async add(user) {
        return await this.#dao.insertOne(user);
    } 
}

export default UserManager;

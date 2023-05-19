import CartsMongooseDao from "../dao/carts/CartsMongooseDao.js";

class CartManager {
    #dao = new CartsMongooseDao()

    async getOne(id) {
        return await this.#dao.findOne(id);
    }

    async addOne() {
        return await this.#dao.save();
    }

    async addProduct(cid, pid) {
        return await this.#dao.insertOne(cid, pid);
    }

    async updateOne(cid, update) {
        return await this.#dao.update(cid, update);
    }

    async updateProduct(cid, pid, update) {
        return await this.#dao.updateOne(cid, pid, update);
    }

    async deleteOne(cid) {
        return await this.#dao.remove(cid);
    }

    async deleteProduct(cid, pid) {
        return await this.#dao.removeOne(cid, pid);
    }
}

export default CartManager;

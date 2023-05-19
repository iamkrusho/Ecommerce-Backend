import ProductsMongooseDao from "../dao/products/ProductsMongooseDao.js";

import { nanoid } from "nanoid";

class ProductManager {
    #dao = new ProductsMongooseDao();

    async getAll(queries) {
        return await this.#dao.find(queries); 
    }

    async getOne(id) {
        return await this.#dao.findOne(id);
    }

    async addOne(data) {
        const product = {...data, code: nanoid(13)}
        return await this.#dao.insertOne(product);
    }

    async updateOne(id, update) {
        return await this.#dao.update(id, update);
    }

    async deleteOne(id) {
        return await this.#dao.delete(id);
    }
}

export default ProductManager;

import ProductsMongooseDao from "../dao/products/ProductsMongooseDao.js";

import { nanoid } from "nanoid";

import idSchema from "../validations/shared/idValidation.js";
import productQueriesSchema from "../validations/products/productQueriesValidation.js";
import productCreateSchema from "../validations/products/productCreateValidation.js";
import productUpdateSchema from "../validations/products/productUpdateValidation.js";

class ProductManager {
    #dao = new ProductsMongooseDao();

    async getAll(data) {
        const queries = await productQueriesSchema.parseAsync(data);

        return await this.#dao.find(queries); 
    }

    async getOne(id) {
        const pid = await idSchema.parseAsync(id)

        return await this.#dao.findOne(pid);
    }

    async addOne(data) {
        const product = await productCreateSchema.parseAsync(data);

        return await this.#dao.insertOne({...product, code: nanoid(13)});
    }

    async updateOne(data) {
        const { pid, ...update} = await productUpdateSchema.parseAsync(data);

        return await this.#dao.update(pid, update);
    }

    async deleteOne(id) {
        const pid = await idSchema.parseAsync(id);

        return await this.#dao.delete(pid);
    }
}

export default ProductManager;

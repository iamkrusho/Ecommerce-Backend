import { nanoid } from "nanoid";

import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import productQueriesSchema from "../validations/products/productQueriesValidation.js";
import productCreateSchema from "../validations/products/productCreateValidation.js";
import productUpdateSchema from "../validations/products/productUpdateValidation.js";

class ProductManager {
    #ProductRepository = container.resolve("ProductRepository");

    async getAll(data) {
        const queries = await productQueriesSchema.parseAsync(data);

        const result = await this.#ProductRepository.find(queries);

        if (!result) throw new Error("Products not found");

        return result; 
    }

    async getOne(id) {
        const pid = await idSchema.parseAsync(id);

        const result = await this.#ProductRepository.findOne(pid);

        if (!result) throw new Error("Product not found");

        return result;
    }

    async addOne(data) {
        const product = await productCreateSchema.parseAsync(data);

        return await this.#ProductRepository.insertOne({...product, code: nanoid(13)});
    }

    async updateOne(data) {
        const { pid, ...update} = await productUpdateSchema.parseAsync(data);

        const result = await this.#ProductRepository.update({ pid, update });

        if (!result) throw new Error("Product not found");

        return result;
    }

    async deleteOne(id) {
        const pid = await idSchema.parseAsync(id);

        const result = await this.#ProductRepository.delete(pid);

        if (!result) throw new Error("Product not found");

        return result;
    }
}

export default ProductManager;

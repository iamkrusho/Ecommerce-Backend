import CartsMongooseDao from "../dao/CartsMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartManager {
    #dao = new CartsMongooseDao()

    async getOne(id) {
        const cid = await idSchema.parseAsync(id);

        return await this.#dao.findOne(cid);
    }

    async addOne() {
        return await this.#dao.save();
    }

    async addProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        return await this.#dao.insertOne(cid, pid);
    }

    async updateOne(data) {
        const { cid, products: update} = await cartUpdateSchema.parseAsync(data);

        return await this.#dao.update(cid, update);
    }

    async updateProduct(data) {
        const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync(data);

        return await this.#dao.updateOne(cid, pid, update);
    }

    async deleteOne(id) {
        const cid = await idSchema.parseAsync(id);

        return await this.#dao.remove(cid);
    }

    async deleteProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        return await this.#dao.removeOne(cid, pid);
    }
}

export default CartManager;

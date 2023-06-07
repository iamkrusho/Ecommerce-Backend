import CartsMongooseDao from "../../data/daos/CartsMongooseDao.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartManager {
    #dao = new CartsMongooseDao()

    async getOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#dao.findOne(cid)

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async addOne() {
        return await this.#dao.save();
    }

    async addProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const result = await this.#dao.insertOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateOne(data) {
        const { cid, products: update} = await cartUpdateSchema.parseAsync(data);

        const result = await this.#dao.update(cid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateProduct(data) {
        const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync(data);

        const result = await this.#dao.updateOne(cid, pid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#dao.remove(cid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const result = await this.#dao.removeOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }
}

export default CartManager;

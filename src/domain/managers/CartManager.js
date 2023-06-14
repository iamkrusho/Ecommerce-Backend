import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartManager {
    #repository = container.resolve("CartRepository");

    async getOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#repository.findOne(cid)

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async addOne() {
        return await this.#repository.save();
    }

    async addProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const result = await this.#repository.insertOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateOne(data) {
        const { cid, products: update} = await cartUpdateSchema.parseAsync(data);

        const result = await this.#repository.update(cid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateProduct(data) {
        const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync(data);

        const result = await this.#repository.updateOne(cid, pid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#repository.remove(cid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const result = await this.#repository.removeOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }
}

export default CartManager;

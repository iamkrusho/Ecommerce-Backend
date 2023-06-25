import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartManager {
    #CartRepository = container.resolve("CartRepository");
    #ProductRepository = container.resolve("ProductRepository");

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

        const productExist = await this.#ProductRepository.findOne(pid);

        if (!productExist) throw new Error("Product not found");

        const result = await this.#CartRepository.insertOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateOne(data) {
        const { cid, products: update} = await cartUpdateSchema.parseAsync(data);

        const result = await this.#CartRepository.update(cid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateProduct(data) {
        const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync(data);

        const productExist = await this.#ProductRepository.findOne(pid);

        if (!productExist) throw new Error("Product not found");

        const result = await this.#CartRepository.updateOne(cid, pid, update);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#CartRepository.remove(cid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async deleteProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const productExist = await this.#ProductRepository.findOne(pid);

        if (!productExist) throw new Error("Product not found");

        const result = await this.#CartRepository.removeOne(cid, pid);

        if (!result) throw new Error("Cart not found");

        return result;
    }
}

export default CartManager;

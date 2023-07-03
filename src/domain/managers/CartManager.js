import { nanoid } from "nanoid";

import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartManager {
    #CartRepository = container.resolve("CartRepository");
    #ProductRepository = container.resolve("ProductRepository");
    #TicketRepository = container.resolve("TicketRepository");

    async getOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#CartRepository.findOne(cid)

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async addOne() {
        return await this.#CartRepository.save();
    }

    async addProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const productExist = await this.#ProductRepository.findOne(pid);

        if (!productExist) throw new Error("Product not found");

        const result = await this.#CartRepository.insertOne({ cid, pid });

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async createCheckout(data) {
        const { id , user} = data;

        const cid = await idSchema.parseAsync(id);

        const cart = await this.#CartRepository.findOne(cid);

        if (!cart) throw new Error("Cart not found");

        if (!(cart.products.length > 0)) throw new Error("Cart is empty");

        let total = 0;

        for (const productInCart of cart.products) {
            const newStock = productInCart.product.stock - productInCart.quantity;

            if (newStock < 0) throw new Error(`The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`);

            total += productInCart.product.price * productInCart.quantity;
            
            await this.#ProductRepository.update(productInCart.product.id, { stock: newStock, status: newStock > 0 ? true : false });
        }

        return await this.#TicketRepository.save({
            code: nanoid(13),
            date: new Date(),
            total,
            user
        });
    }

    async updateOne(data) {
        const { cid, products: update} = await cartUpdateSchema.parseAsync(data);

        const result = await this.#CartRepository.update({ cid, update });

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateProduct(data) {
        const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync(data);

        const productExist = await this.#ProductRepository.findOne(pid);

        if (!productExist) throw new Error("Product not found");

        const result = await this.#CartRepository.updateOne({ cid, pid, update });

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

        const result = await this.#CartRepository.removeOne({ cid, pid });

        if (!result) throw new Error("Cart not found");

        return result;
    }
}

export default CartManager;

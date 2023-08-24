import { nanoid } from "nanoid";

import container from "../../container.js";

import idSchema from "../validations/shared/idValidation.js";
import cartAddOneSchema from "../validations/carts/cartAddOneValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";
import EmailManager from "./emailManager.js";

class CartManager {
    #CartRepository = container.resolve("CartRepository");
    #ProductRepository = container.resolve("ProductRepository");
    #TicketRepository = container.resolve("TicketRepository");

    async getOne(id) {
        const cid = await idSchema.parseAsync(id);

        const result = await this.#CartRepository.findOne(cid);

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async addOne() {
        return await this.#CartRepository.save();
    }

    async addProduct(data) {
        const { cid, pid } = await cartAddOneSchema.parseAsync(data);

        const product = await this.#ProductRepository.findOne(pid);

        if (!product) throw new Error("Product not found");

        const cart = await this.#CartRepository.findOne(cid);

        if (!cart) throw new Error("Cart not found");

        const productInCart = cart.products.find((item) => item.product.id === pid);

        productInCart ? productInCart.quantity += 1 : cart.products = [...cart.products, { product: pid, quantity: 1 }];

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.#CartRepository.update({ cid, update: { products: newCart } });

        return result;
    }

    async createCheckout(data) {
        const { id, user } = data;

        const cid = await idSchema.parseAsync(id);

        const cart = await this.#CartRepository.findOne(cid);

        if (!cart) throw new Error("Cart not found");

        if (!(cart.products.length > 0)) throw new Error("Cart is empty");

        let total = 0;

        for (const productInCart of cart.products) {
            if (productInCart.product.owner === user) throw new Error(`You can't add your own product: ${productInCart.product.title} - ${productInCart.product.code}`);

            const newStock = productInCart.product.stock - productInCart.quantity;

            if (newStock < 0) throw new Error(`The product ${productInCart.product.title} - ${productInCart.product.code} doesn't have stock`);

            total += productInCart.product.price * productInCart.quantity;

            await this.#ProductRepository.update(productInCart.product.id, { stock: newStock, status: newStock > 0 ? true : false });
        }

        const code = nanoid(13);

        await EmailManager.send({
            templateFile: "ticketBuyerTemplate.hbs",
            payload: {
                email: user,
                subject: "Ticket de compra",
                code,
                total
            }
        });

        await this.#CartRepository.remove(cart.id);

        return await this.#TicketRepository.save({
            code,
            date: new Date(),
            total,
            user
        });
    }

    async updateOne(data) {
        const { cid, products: update } = await cartUpdateSchema.parseAsync(data);

        const result = await this.#CartRepository.update({ cid, update });

        if (!result) throw new Error("Cart not found");

        return result;
    }

    async updateProduct(data) {
        const { cid, pid, quantity: newQuantity } = await cartUpdateOneSchema.parseAsync(data);

        const product = await this.#ProductRepository.findOne(pid);

        if (!product) throw new Error("Product not found");

        const cart = await this.#CartRepository.findOne(cid);

        if (!cart) throw new Error("Cart not found");

        const productInCart = cart.products.find((item) => item.product.id === pid);

        if (!productInCart) throw new Error("Product not found in cart");

        productInCart.quantity = newQuantity;

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.#CartRepository.update({ cid, update: { products: newCart } });

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

        const product = await this.#ProductRepository.findOne(pid);

        if (!product) throw new Error("Product not found");

        const cart = await this.#CartRepository.findOne(cid);

        if (!cart) throw new Error("Cart not found");

        const filter = cart.products.filter(item => item.product.id !== pid);

        cart.products = filter;

        const newCart = cart.products.map(item => ({ product: item.product.id ?? item.product, quantity: item.quantity }));

        const result = await this.#CartRepository.update({ cid, update: { products: newCart } });

        return result;
    }
}

export default CartManager;

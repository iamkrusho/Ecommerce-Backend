import CartModel from "../models/cartModel.js";

import Cart from "../../domain/entities/cart.js";
import ProductCart from "../../domain/entities/productCart.js";
import Product from "../../domain/entities/product.js";

class CartMongooseRepository {
    async findOne(id) {
        const cartDoc = await CartModel.findById(id);

        return cartDoc ? new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart({
                id: doc._id,
                product: doc.product ? new Product(doc.product) : null,
                quantity: doc.quantity
            }))
        }) : null;
    }

    async save() {
        const newCartDoc = new CartModel();
        const cartDoc = await newCartDoc.save();

        return cartDoc ? new Cart({
            id: cartDoc._id,
            products: cartDoc.products
        }) : null;
    }

    async insertOne(data) {
        const { cid, pid } = data;

        const cartDoc = await CartModel.findById(cid);

        if (!cartDoc) return null;

        const productInCart = cartDoc.products.find(item => item.product.id === pid);

        productInCart ? productInCart.quantity += 1 : cartDoc.products = [...cartDoc.products, { product: pid, quantity: 1 }];

        const newCartDoc = await CartModel.findByIdAndUpdate(cid, cartDoc, { new: true });

        return newCartDoc ? new Cart({
            id: newCartDoc._id,
            products: newCartDoc.products.map(doc => new ProductCart({
                id: doc._id,
                product: doc.product,
                quantity: doc.quantity
            }))
        }) : null;
    }

    async update(data) {
        const { cid, update } = data;

        const cartDoc = await CartModel.findByIdAndUpdate(cid, { products: update }, { new: true });

        return cartDoc ? new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart(doc))
        }) : null;
    }

    async updateOne(data) {
        const { cid, pid, update } = data;

        const cartDoc = await CartModel.findById(cid);

        const productInCart = cartDoc.products.find(item => item.product.id === pid);
        productInCart.quantity = update;

        const newCartDoc = await CartModel.findByIdAndUpdate(cid, cartDoc, { new: true });

        return newCartDoc ? new Cart({
            id: newCartDoc._id,
            products: newCartDoc.products.map(doc => new ProductCart({
                id: doc._id,
                product: doc.product,
                quantity: doc.quantity
            }))
        }) : null;
    }

    async remove(id) {
        const cartDoc = await CartModel.findByIdAndRemove(id);

        return cartDoc ? true : null;
    }

    async removeOne(data) {
        const { cid, pid } = data;

        const cartDoc = await CartModel.findById(cid);

        if (!cartDoc) return null;

        const filter = cartDoc.products.filter(item => item.product.id !== pid);
        cartDoc.products = filter;

        const newCartDoc = await CartModel.findByIdAndUpdate(cid, cartDoc, { new: true });

        return newCartDoc ? new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart({
                id: doc._id,
                product: doc.product ? new Product(doc.product) : null,
                quantity: doc.quantity
            }))
        }) : null;
    }
}

export default CartMongooseRepository;

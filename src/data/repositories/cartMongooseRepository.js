import { CartModel } from "../models/cartModel.js";

import Cart from "../../domain/entities/cart.js";
import ProductCart from "../../domain/entities/productCart.js";
import Product from "../../domain/entities/product.js";

class CartMongooseRepository {
    async findOne(id) {
        const cartDoc = await CartModel.findById(id);

        if (!cartDoc) return null;

        return new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart({
                id: doc.id,
                product: new Product(doc.product),
                quantity: doc.quantity                
            }))
        });
    }

    async save() {
        const newCartDoc = new CartModel();
        newCartDoc.save();

        return new Cart({
            id: newCartDoc._id,
            products: newCartDoc.products.map(doc => new ProductCart({
                id: doc.id,
                product: new Product(doc.product),
                quantity: doc.quantity                
            }))
        });
    }

    async insertOne(cid, pid) {
        const cartDoc = await CartModel.findById(cid);

        if (!cartDoc) return null;

        const productInCart = cartDoc.products.find(item => item.product.id === pid);

        productInCart ? productInCart.quantity += 1 : cartDoc.products = [...cartDoc.products , {product: pid, quantity: 1}];

        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart({
                id: doc.id,
                quantity: doc.quantity                
            }))
        });
    }

    async update(cid, update) {
        const cartDoc = await CartModel.findByIdAndUpdate(cid, {products: update}, {new: true});

        if (!cartDoc) return null;

        return new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart(doc))
        });
    }

    async updateOne(cid, pid, update) {
        const cartDoc = await CartModel.findById(cid);

        if (!cartDoc) return null;

        const productInCart = cartDoc.products.find(item => item.product.id === pid);
        productInCart.quantity = update;

        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return new ProductCart({
            id: productInCart._id,
            product: new Product(productInCart.product),
            quantity: productInCart.quantity
        });
    }

    async remove(cid) {
        const cartDoc = await CartModel.findByIdAndRemove(cid);

        if (!cartDoc) return null;

        return true;
    }

    async removeOne(cid, pid) {
        const cartDoc = await CartModel.findById(cid);

        if (!cartDoc) return null;

        const filter = cartDoc.products.filter(item => item.product.id !== pid);
        cartDoc.products = filter;
        
        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return new Cart({
            id: cartDoc._id,
            products: cartDoc.products.map(doc => new ProductCart({
                id: doc.id,
                product: new Product(doc.product),
                quantity: doc.quantity                
            }))
        });
    }
}

export default CartMongooseRepository;

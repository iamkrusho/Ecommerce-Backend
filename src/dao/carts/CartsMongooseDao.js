import { CartModel } from "../../models/cartModel.js";

class CartsMongooseDao {
    async findOne(id) {
        const cartDoc = await CartModel.findById(id);

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        return {
            id: cartDoc._id,
            products: cartDoc.products
        };  
    }

    async save() {
        const newCartDoc = new CartModel();
        newCartDoc.save();

        return {
            id: newCartDoc._id,
            products: newCartDoc.products  
        };
    }

    async insertOne(cid, pid) {
        const cartDoc = await CartModel.findById(cid);

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        const productInCart = cartDoc.products.find(item => item.product.toString() === pid);

        productInCart ? productInCart.quantity += 1 : cartDoc.products = [...cartDoc.products , {product: pid, quantity: 1}];

        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return {
            id: cartDoc._id,
            products: cartDoc.products
        };  
    }

    async update(cid, update) {
        const cartDoc = await CartModel.findByIdAndUpdate(cid, {products: update}, {new: true});

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        return {
            id: cartDoc._id,
            products: cartDoc.products
        };
    }

    async updateOne(cid, pid, update) {
        const cartDoc = await CartModel.findById(cid);

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        const productInCart = cartDoc.products.find(item => item.product.toString() === pid);
        productInCart.quantity = update;

        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return {
            id: productInCart._id,
            quantity: productInCart.quantity
        };
    }

    async remove(cid) {
        const cartDoc = await CartModel.findByIdAndRemove(cid);

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        return true;
    }

    async removeOne(cid, pid) {
        const cartDoc = await CartModel.findById(cid);

        if (!(cartDoc?._id)) throw new Error("Cart not found");

        const filter = cartDoc.products.filter(item => item.product.toString() !== pid);
        cartDoc.products = filter;
        
        await CartModel.findByIdAndUpdate(cid, cartDoc, {new: true});

        return {
            id: cartDoc._id,
            products: cartDoc.products
        };
    }
}

export default CartsMongooseDao;

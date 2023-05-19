import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

import cartIdSchema from "../validations/carts/cartIdValidation.js";
import cartProductSchema from "../validations/carts/cartProductValidation.js";
import cartUpdateSchema from "../validations/carts/cartUpdateValidation.js";
import cartUpdateOneSchema from "../validations/carts/cartUpdateOneValidation.js";

class CartsController {
    static getOne = async (req, res, next) => {
        try {
            const { cid } = await cartIdSchema.parseAsync(req.params);
            const manager = new CartManager();
            const result = await manager.getOne(cid);
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            next(err);
        }
    }

    static post = async (req, res, next) => {
        try {
            const manager = new CartManager();
            const result = await manager.addOne();
            res.status(200).send({status: "success", message: "Cart has been created successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static postOne = async (req, res, next) => {
        try {
            const { cid, pid } = await cartProductSchema.parseAsync(req.params);
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.addProduct(cid, pid);
            res.status(200).send({status: "success", message: "Product has been added to the cart successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static put = async (req, res, next) => {
        try {
            const { cid, products: update} = await cartUpdateSchema.parseAsync({...req.params, ...req.body});
            const manager = new CartManager();
            const result = await manager.updateOne(cid, update);
            res.status(200).send({status: "success", message: "Cart has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static putOne = async (req, res, next) => {
        try {
            const { cid, pid, quantity: update } = await cartUpdateOneSchema.parseAsync({...req.params, ...req.body});
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.updateProduct(cid, pid, update);
            res.status(200).send({status: "success", message: "Product inside the cart has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { cid } = await cartIdSchema.parseAsync(req.params);
            const manager = new CartManager();
            await manager.deleteOne(cid);
            res.status(200).send({status: "success", message: "Cart has been deleted successfully"});
        } catch (err) {
            next(err);   
        }
    }

    static deleteOne = async (req, res, next) => {
        try {
            const { cid, pid } = await cartProductSchema.parseAsync(req.params);
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.deleteProduct(cid, pid);
            res.status(200).send({status: "success", message: "Product inside the cart has been deleted successfully", data: result});
        } catch (err) {
            next(err);
        }
    }
}

export default CartsController;

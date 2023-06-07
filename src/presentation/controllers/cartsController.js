import CartManager from "../../domain/managers/CartManager.js";
import ProductManager from "../../domain/managers/ProductManager.js";

class CartsController {
    static getOne = async (req, res, next) => {
        try {
            const { cid } = req.params;
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
            const { pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.addProduct(req.params);
            res.status(200).send({status: "success", message: "Product has been added to the cart successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static put = async (req, res, next) => {
        try {
            const manager = new CartManager();
            const result = await manager.updateOne({...req.params, ...req.body});
            res.status(200).send({status: "success", message: "Cart has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static putOne = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.updateProduct({...req.params, ...req.body});
            res.status(200).send({status: "success", message: "Product inside the cart has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { cid } = req.params;
            const manager = new CartManager();
            await manager.deleteOne(cid);
            res.status(200).send({status: "success", message: "Cart has been deleted successfully"});
        } catch (err) {
            next(err);   
        }
    }

    static deleteOne = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.deleteProduct(req.params);
            res.status(200).send({status: "success", message: "Product inside the cart has been deleted successfully", data: result});
        } catch (err) {
            next(err);
        }
    }
}

export default CartsController;

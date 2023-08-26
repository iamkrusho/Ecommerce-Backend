import ProductManager from "../../domain/managers/productManager.js";

class ProductsController {
    static get = async(req, res, next) => {
        try {
            const manager = new ProductManager();
            const result = await manager.getAll(req.query);
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            next(err);
        }
    };

    static getOne = async(req, res, next) => {
        try {
            const { pid } = req.params;
            const manager = new ProductManager();
            const result = await manager.getOne(pid);
            res.status(200).send({ status: "success", data: result });
        } catch (err) {
            next(err);
        }
    };

    static post = async(req, res, next) => {
        try {
            const manager = new ProductManager();
            await manager.addOne({ product: req.body, user: req.user });
            res.status(201).send({ status: "success", message: "Product has been created successfully" });
        } catch (err) {
            next(err);
        }
    };

    static put = async(req, res, next) => {
        try {
            const manager = new ProductManager();
            const result = await manager.updateOne({ ...req.params, ...req.body });
            res.status(200).send({ status: "success", message: "Product has been updated successfully", data: result });
        } catch (err) {
            next(err);
        }
    };

    static delete = async(req, res, next) => {
        try {
            const { pid } = req.params;
            const manager = new ProductManager();
            await manager.deleteOne({ id: pid, user: req.user });
            res.status(200).send({ status: "success", message: "Product has been deleted successfully" });
        } catch (err) {
            next(err);
        }
    };
}

export default ProductsController;

import ProductManager from "../managers/ProductManager.js";

import productAddSchema from "../validations/products/productAddValidation.js";
import productIdSchema from "../validations/products/productIdValidation.js";
import productQueriesSchema from "../validations/products/productQueriesValidation.js";
import productUpdateSchema from "../validations/products/productUpdateValidation.js";

class ProductsController {
    static get = async (req, res, next) => {
        try {
            const queries = await productQueriesSchema.parseAsync(req.query);
            const manager = new ProductManager(); 
            const result = await manager.getAll(queries);
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            next(err);
        }
    }

    static getOne = async (req, res, next) => {
        try {
            const { pid } = await productIdSchema.parseAsync(req.params);
            const manager = new ProductManager();
            const result = await manager.getOne(pid);
            res.status(200).send({data: result});
        } catch(err) {
            next(err);
        }
    }

    static post = async (req, res, next) => {
        try {
            const product = await productAddSchema.parseAsync(req.body);
            const manager = new ProductManager();
            await manager.addOne(product);
            res.status(200).send({status: 'success', message: 'Product has been created successfully'})
        } catch(err) {
            next(err);
        }
    }

    static put = async (req, res, next) => {
        try {
            const { pid, ...update} = await productUpdateSchema.parseAsync({ ...req.params, ...req.body });
            const manager = new ProductManager();
            const result = await manager.updateOne(pid, update);
            res.status(200).send({status: "success", message: "Product has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { pid } = await productIdSchema.parseAsync(req.params);
            const manager = new ProductManager();
            await manager.deleteOne(pid);
            res.status(200).send({status: "success", message: "Product has been deleted successfully"});
        } catch (err) {
            next(err);
        }
    }
}

export default ProductsController;

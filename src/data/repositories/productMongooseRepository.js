import ProductModel from "../models/productModel.js";
import Product from "../../domain/entities/product.js";

class ProductMongooseRepository {
    async find(data) {
        const { query, page, limit, sort } = data;

        const productsDocs = await ProductModel.paginate({ $and: [{ status: true }, query] }, { page, sort: { price: sort }, limit });

        const { docs, ...rest } = productsDocs;

        return docs.length > 0 ? {
            payload: docs.map((doc) => new Product({
                id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnails: doc.thumbnails ?? null,
                category: doc.category,
                code: doc.code,
                status: doc.status,
                stock: doc.stock
            })),
            ...rest
        } : null;
    }

    async findOne(id) {
        const productDoc = await ProductModel.findById(id);

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }) : null;
    }

    async insertOne(data) {
        const newProductDoc = new ProductModel(data);
        const productDoc = await newProductDoc.save();

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }) : null;
    }

    async update(data) {
        const { pid, update } = data;

        const productDoc = await ProductModel.findByIdAndUpdate(pid, update, { new: true });

        return productDoc ? new Product({
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        }) : null;
    }

    async delete(id) {
        const productDoc = await ProductModel.findByIdAndUpdate(id, { status: false }, { new: true });

        return productDoc ? true : null;
    }
}

export default ProductMongooseRepository;

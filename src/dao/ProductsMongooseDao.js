import { ProductModel } from "../../models/productModel.js";

class ProductsMongooseDao {
    async find(queries) {
        const {query, page, limit, sort} = queries;

        const productsDocs = await ProductModel.paginate({$and: [{status: true}, query]}, {page, sort: {price: sort}, limit});

        const { docs, ...rest } = productsDocs;

        if (!docs.length > 0) throw new Error("Products not found");

        return {
            payload: docs.map((doc) => ({
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
        };
    }

    async findOne(id) {
        const productDoc = await ProductModel.findById(id);

        if (!(productDoc?._id)) throw new Error("Product not found");

        return {
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        };
    }

    async insertOne(product) {
        const newProductDoc = new ProductModel(product);
        await newProductDoc.save();

        return true;
    }

    async update(id, update) {
        const productDoc = await ProductModel.findByIdAndUpdate(id, update, {new: true});

        if (!(productDoc?._id)) throw new Error("Product not found");

        return {
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        };
    }

    async delete(id) {
        const productDoc = await ProductModel.findByIdAndUpdate(id, {status: false}, {new: true});

        if (!(productDoc?._id)) throw new Error("Product not found");

        return true;
    }
}

export default ProductsMongooseDao;

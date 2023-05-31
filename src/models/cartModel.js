import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const CartSchema = new Schema({
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: [true, "Product ID is required"],
                index: true,
            },
            quantity: {
                type: Schema.Types.Number,
                required: [true, "Product quantity is required"]
            },
        }],
        default: [],
    }
});

export const CartModel = model(cartsCollection, CartSchema);

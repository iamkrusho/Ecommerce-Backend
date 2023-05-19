import { Schema, model } from "mongoose";

const usersCollection = "users";

const UserSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: Schema.Types.String,
        required: [true, "Last name is required"]
    },
    email: {
        type: Schema.Types.String,
        required: [true, "Email is required"],
        unique: true
    },
    age: {
        type: Schema.Types.Number,
        default: 18
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Password is required"]
    }
});

export const UserModel = model(usersCollection, UserSchema);
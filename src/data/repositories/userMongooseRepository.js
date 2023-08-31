import UserModel from "../models/userModel.js";

import User from "../../domain/entities/user.js";
import Role from "../../domain/entities/role.js";

class UserMongooseRepository {
    async find() {
        const userDocs = await UserModel.find();

        return userDocs ? userDocs.map((doc) => new User({
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            age: doc.age,
            role: doc.role ? new Role(doc.role) : null,
            isPremium: doc.isPremium,
            isAdmin: doc.isAdmin,
            password: doc.password,
            documents: doc.documents,
            last_connection: doc.last_connection
        })) : null;
    }

    async findOne(id) {
        const userDoc = await UserModel.findById(id);

        return userDoc ? new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role ? new Role(userDoc.role) : null,
            isPremium: userDoc.isPremium,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
            documents: userDoc.documents,
            last_connection: userDoc.last_connection
        }) : null;
    }

    async findByEmail(data) {
        const userDoc = await UserModel.findOne({ email: data });

        return userDoc ? new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role ? new Role(userDoc.role) : null,
            isPremium: userDoc.isPremium,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
            documents: userDoc.documents,
            last_connection: userDoc.last_connection
        }) : null;
    }

    async insertOne(data) {
        const newUserDoc = new UserModel(data);
        const userDoc = await newUserDoc.save();

        return userDoc ? new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role ? new Role(userDoc.role) : null,
            isPremium: userDoc.isPremium,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
            documents: userDoc.documents,
            last_connection: userDoc.last_connection
        }) : null;
    }

    async update(data) {
        const { uid, update } = data;

        const userDoc = await UserModel.findByIdAndUpdate(uid, update, { new: true });

        return userDoc ? new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role ? new Role(userDoc.role) : null,
            isPremium: userDoc.isPremium,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
            documents: userDoc.documents,
            last_connection: userDoc.last_connection
        }) : null;
    }

    async delete(id) {
        const userDoc = await UserModel.findByIdAndRemove(id);

        return userDoc ? true : null;
    }
}

export default UserMongooseRepository;

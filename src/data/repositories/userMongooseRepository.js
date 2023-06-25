import UserModel from "../models/userModel.js";
import User from "../../domain/entities/user.js";
import Role from "../../domain/entities/role.js";

class UserMongooseRepository {
    async find() {
        const userDocs = await UserModel.find();

        return !(userDocs) ? null : userDocs.map((doc) => new User({
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            age: doc.age,
            role: new Role(doc.role),
            isAdmin: doc.isAdmin,
            password: doc.password,
        }));
    }

    async findOne(id) {
        const userDoc = await UserModel.findById(id);

        return (!userDoc) ? null : new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: new Role(userDoc.role),
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        });
    }

    async findByEmail(email) {
        const userDoc = await UserModel.findOne({ email });

        return (!userDoc) ? null :new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: new Role(userDoc.role),
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        });
    }

    async insertOne(user) {
        const newUserDoc = new UserModel(user);
        await newUserDoc.save();

        return true;
    }

    async update(id, update) {
        const userDoc = await UserModel.findByIdAndUpdate(id, update, {new: true});

        return (!userDoc) ? null : new User({
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: new Role(userDoc.role),
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        });
    }

    async delete(id) {
        const userDoc = await UserModel.findByIdAndRemove(id);

        return (!userDoc) ? null : true;
    }
}

export default UserMongooseRepository;

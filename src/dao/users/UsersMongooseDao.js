import { UserModel } from "../../models/userModel.js";

class UsersMongooseDao {
    async find() {
        const userDocs = await UserModel.find();

        if (!userDocs > 0) {
            throw new Error("Users not found");
        }

        return userDocs.map((doc) => ({
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.price,
            age: doc.age,
            role: doc.role,
            isAdmin: doc.isAdmin,
            password: doc.password,
        }));
    }

    async findOne(id) {
        const userDocument = await UserModel.findById(id);

        if (!userDocument?._id) throw new Error("User not found");

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            password: userDocument.password,
        };
    }

    async findByEmail(email) {
        const userDocument = await UserModel.findOne({ email });

        if (!userDocument?._id) throw new Error("User not found");

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            password: userDocument.password,
        };
    }

    async insertOne(user) {
        const newUserDocument = new UserModel(user);
        newUserDocument.save();

        return true;
    }

    async update(id, update) {
        const userDoc = await UserModel.findByIdAndUpdate(id, update, {new: true});
        
        if (!(userDoc?._id)) throw new Error("User not found");

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
            role: userDocument.role,
            isAdmin: userDocument.isAdmin,
            password: userDocument.password,
        };
    }

    async delete(id) {
        const userDoc = await UserModel.findByIdAndDelete(id);

        if (!(userDoc?._id)) throw new Error("User not found");

        return true;
    }
}

export default UsersMongooseDao;

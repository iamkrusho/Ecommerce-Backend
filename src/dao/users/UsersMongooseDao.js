import { UserModel } from "../../models/userModel.js";

class UsersMongooseDao {
    async find() {
        const userDocs = await UserModel.find();

        if (!userDocs > 0) return null;

        return userDocs.map((doc) => ({
            id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            email: doc.email,
            age: doc.age,
            role: doc.role,
            isAdmin: doc.isAdmin,
            password: doc.password,
        }));
    }

    async findOne(id) {
        const userDoc = await UserModel.findById(id);

        if (!userDoc) return null;

        return {
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        };
    }

    async findByEmail(email) {
        const userDoc = await UserModel.findOne({ email });

        if (!userDoc) return null;

        return {
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        };
    }

    async insertOne(user) {
        const newUserDoc = new UserModel(user);
        newUserDoc.save();

        return true;
    }

    async update(id, update) {
        const userDoc = await UserModel.findByIdAndUpdate(id, update, {new: true});
        
        if (!userDoc) return null;

        return {
            id: userDoc._id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            age: userDoc.age,
            role: userDoc.role,
            isAdmin: userDoc.isAdmin,
            password: userDoc.password,
        };
    }

    async delete(id) {
        const userDoc = await UserModel.findByIdAndDelete(id);

        if (!userDoc) return null;

        return true;
    }
}

export default UsersMongooseDao;

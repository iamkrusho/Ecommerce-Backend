import { UserModel } from "../../models/userModel.js";

class UsersMongooseDao {
    async findOne(id) {
        const userDocument = await UserModel.findById(id);

        if (!userDocument?._id) throw new Error("User not found");

        return {
            id: userDocument._id,
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            email: userDocument.email,
            age: userDocument.age,
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
            password: userDocument.password,
        };
    }

    async insertOne(user) {
        const newUserDocument = new UserModel(user);
        newUserDocument.save();

        return true;
    }
}

export default UsersMongooseDao;

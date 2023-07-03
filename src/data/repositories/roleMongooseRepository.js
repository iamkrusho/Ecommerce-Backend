import RoleModel from "../models/roleModel.js";
import Role from "../../domain/entities/role.js";

class RoleMongooseRepository {
    async find() {
        const rolesDocs = await RoleModel.find();

        return (!rolesDocs > 0) ? null : rolesDocs.map((doc) => new Role({
            id: doc._id,
            name: doc.name,
            permissions: doc.permissions,
        }));
    }

    async findOne(id) {
        const roleDoc = await RoleModel.findById(id);

        return (!roleDoc) ? null : new Role({
            id: roleDoc._id,
            name: roleDoc.name,
            permissions: roleDoc.permissions,
        });
    }

    async insertOne(data) {
        const newRoleDoc = new RoleModel(data);
        await newRoleDoc.save();

        return true;
    }

    async delete(id) {
        const roleDoc = await RoleModel.findByIdAndDelete(id);

        return (!roleDoc) ? null : true;
    }
}

export default RoleMongooseRepository;

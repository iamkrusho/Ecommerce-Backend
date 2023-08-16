import RoleModel from "../models/roleModel.js";
import Role from "../../domain/entities/role.js";

class RoleMongooseRepository {
    async find() {
        const rolesDocs = await RoleModel.find();

        return rolesDocs > 0 ? rolesDocs.map((doc) => new Role({
            id: doc._id,
            name: doc.name,
            permissions: doc.permissions
        })) : null;
    }

    async findOne(id) {
        const roleDoc = await RoleModel.findById(id);

        return roleDoc ? new Role({
            id: roleDoc._id,
            name: roleDoc.name,
            permissions: roleDoc.permissions
        }) : null;
    }

    async findOneByName(data) {
        const roleDoc = await RoleModel.findOne({ name: data });

        return roleDoc ? new Role({
            id: roleDoc._id,
            name: roleDoc.name,
            permissions: roleDoc.permissions
        }) : null;
    }

    async insertOne(data) {
        const newRoleDoc = new RoleModel(data);
        const roleDoc = await newRoleDoc.save();

        return roleDoc ? new Role({
            id: roleDoc._id,
            name: roleDoc.name,
            permissions: roleDoc.permissions
        }) : null;
    }

    async delete(id) {
        const roleDoc = await RoleModel.findByIdAndDelete(id);

        return roleDoc ? true : null;
    }
}

export default RoleMongooseRepository;

import { RoleModel } from "../models/roleModel.js";

class RolesMongooseDao {
    async find() {
        const rolesDocs = await RoleModel.find();

        if (!rolesDocs > 0) {
            throw new Error("Roles not found");
        }

        return rolesDocs.map((doc) => ({
            id: doc._id,
            name: doc.name,
            permissions: doc.permissions,
        }));
    }

    async findOne(id) {
        const roleDoc = await RoleModel.findById(id);

        if (!(roleDoc?._id)) throw new Error("Role not found");

        return {
            id: roleDoc._id,
            name: roleDoc.name,
            permissions: roleDoc.permissions,
        };
    }

    async insertOne(role) {
        const newRoleDoc = new RoleModel(role);
        await newRoleDoc.save();

        return true;
    }

    async delete(id) {
        const roleDoc = await RoleModel.findByIdAndDelete(id);

        if (!(roleDoc?._id)) throw new Error("Role not found");

        return true;
    }
}

export default RolesMongooseDao;

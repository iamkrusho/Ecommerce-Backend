import { Schema, model } from "mongoose";

const rolesCollection = "roles";

const RoleSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: [true, "Role name is required"] 
    },
    permissions: [
        {
            type: Schema.Types.String,
            default: []
        }
    ]
});

export default model(rolesCollection, RoleSchema);

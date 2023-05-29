import UserManager from "../managers/UserManager.js";

import userIdSchema from "../validations/users/userIdValidation.js";
import registerSchema from "../validations/session/registerValidation.js";
import userUpdateSchema from "../validations/users/userUpdateSchema.js";

class UsersController {
    static get = async (req, res, next) => {
        try {
            const manager = new UserManager(); 
            const result = await manager.getAll();
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            next(err);
        }
    }

    static getOne = async (req, res, next) => {
        try {
            const { uid } = await userIdSchema.parseAsync(req.params);
            const manager = new UserManager();
            const result = await manager.getOne(uid);
            res.status(200).send({data: result});
        } catch(err) {
            next(err);
        }
    }

    static post = async (req, res, next) => {
        try {
            const user = await registerSchema.parseAsync(req.body);
            const manager = new UserManager();
            await manager.addOne(user);
            res.status(200).send({status: 'success', message: 'User has been created successfully'})
        } catch(err) {
            next(err);
        }
    }

    static put = async (req, res, next) => {
        try {
            const { uid, ...update} = await userUpdateSchema.parseAsync({ ...req.params, ...req.body });
            const manager = new UserManager();
            const result = await manager.updateOne(uid, update);
            res.status(200).send({status: "success", message: "User has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { uid } = await userIdSchema.parseAsync(req.params);
            const manager = new UserManager();
            await manager.deleteOne(uid);
            res.status(200).send({status: "success", message: "User has been deleted successfully"});
        } catch (err) {
            next(err);
        }
    }
}

export default UsersController;

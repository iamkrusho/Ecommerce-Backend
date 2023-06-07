import UserManager from "../../domain/managers/UserManager.js";

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
            const { uid } = req.params;
            const manager = new UserManager();
            const result = await manager.getOne(uid);
            res.status(200).send({data: result});
        } catch(err) {
            next(err);
        }
    }

    static post = async (req, res, next) => {
        try {
            const manager = new UserManager();
            await manager.addOne(req.body);
            res.status(200).send({status: 'success', message: 'User has been created successfully'})
        } catch(err) {
            next(err);
        }
    }

    static put = async (req, res, next) => {
        try {
            const manager = new UserManager();
            const result = await manager.updateOne({ ...req.params, ...req.body });
            res.status(200).send({status: "success", message: "User has been updated successfully", data: result});
        } catch (err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const manager = new UserManager();
            await manager.deleteOne(uid);
            res.status(200).send({status: "success", message: "User has been deleted successfully"});
        } catch (err) {
            next(err);
        }
    }
}

export default UsersController;

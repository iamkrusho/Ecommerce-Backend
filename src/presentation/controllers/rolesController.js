import RoleManager from "../../domain/managers/roleManager.js";

class RolesController {
    static get = async (req, res, next) => {
        try {
            const manager = new RoleManager(); 
            const result = await manager.getAll();
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            next(err);
        }
    }

    static getOne = async (req, res, next) => {
        try {
            const { rid } = req.params;
            const manager = new RoleManager();
            const result = await manager.getOne(rid);
            res.status(200).send({data: result});
        } catch(err) {
            next(err);
        }
    }

    static post = async (req, res, next) => {
        try {
            const manager = new RoleManager();
            await manager.addOne(req.body);
            res.status(200).send({status: 'success', message: 'Role has been created successfully'})
        } catch(err) {
            next(err);
        }
    }

    static delete = async (req, res, next) => {
        try {
            const { rid } = req.params;
            const manager = new RoleManager();
            await manager.deleteOne(rid);
            res.status(200).send({status: "success", message: "Role has been deleted successfully"});
        } catch (err) {
            next(err);
        }
    }
}

export default RolesController;

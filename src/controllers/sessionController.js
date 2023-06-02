import SessionManager from "../managers/SessionManager.js";

import { generateToken } from "../shared/index.js";

class SessionController {
    static signup = async (req, res, next) => {
        try {
            const manager = new SessionManager();
            await manager.create(req.body);
            res.status(200).send({status: 'success', message: 'You have successfully registered'})
        } catch(err) {
            next(err);
        }
    }

    static login = async (req, res, next) => {
        try {
            const manager = new SessionManager();
            const user = await manager.validate(req.body);
            const token = generateToken(user);
            res.cookie('accessToken', token, {
                maxAge: 60*60*1000,
                httpOnly: true
            }).send({status: "success", message: "You have successfully logged in", token});
        } catch(err) {
            next(err);
        }
    }

    static current = async (req, res, next) => {
        try {
            res.status(200).send({status: "success", data: req.user});
        } catch (err) {
            next(err);
        }
    }
}

export default SessionController;

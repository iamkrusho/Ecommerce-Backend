import SessionManager from "../../domain/managers/sessionManager.js";

import { generateAccessToken, generateLogoutToken } from "../../shared/index.js";

class SessionController {
    static signup = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            await manager.create(req.body);
            res.status(201).send({ status: "success", message: "You have successfully registered" });
        } catch (err) {
            next(err);
        }
    };

    static login = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            const user = await manager.validate(req.body);
            await manager.changeLastConnection(user.email);
            const token = generateAccessToken(user);
            res.cookie("accessToken", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).send({ status: "success", message: "You have successfully logged in", token });
        } catch (err) {
            next(err);
        }
    };

    static logout = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            await manager.changeLastConnection(req.user.email);
            req.user = undefined;
            const token = generateLogoutToken();
            res.clearCookie("accessToken", {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).send({ status: "success", message: "You have successfully logged out", token });
        } catch (err) {
            next(err);
        }
    };

    static forgotPassword = async(req, res, next) => {
        try {
            const { email } = req.body;
            const manager = new SessionManager();
            await manager.forgotPassword(email);
            res.status(200).send({ status: "success", message: "We have sent you a mail for reset your password" });
        } catch (err) {
            next(err);
        }
    };

    static resetPassword = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            await manager.resetPassword({ ...req.query, ...req.body });
            res.status(200).send({ status: "success", message: "Your password has been modified successfully" });
        } catch (err) {
            next(err);
        }
    };

    static current = async(req, res, next) => {
        try {
            res.status(200).send({ status: "success", data: req.user });
        } catch (err) {
            next(err);
        }
    };
}

export default SessionController;

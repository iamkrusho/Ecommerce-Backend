import SessionManager from "../../domain/managers/sessionManager.js";

class SessionController {
    static signup = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            await manager.signup(req.body);
            res.status(201).send({ status: "success", message: "You have successfully registered" });
        } catch (err) {
            next(err);
        }
    };

    static login = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            const accessToken = await manager.login(req.body);
            res.cookie("accessToken", accessToken, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).send({ status: "success", message: "You have successfully logged in", accessToken });
        } catch (err) {
            next(err);
        }
    };

    static logout = async(req, res, next) => {
        try {
            const manager = new SessionManager();
            const logoutToken = await manager.logout(req.user.email);
            req.user = undefined;
            res.clearCookie("accessToken", {
                maxAge: 60 * 60 * 1000,
                httpOnly: true
            }).send({ status: "success", message: "You have successfully logged out", logoutToken });
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

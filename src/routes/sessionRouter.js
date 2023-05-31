import { Router } from "express";

import SessionController from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post("/login",  SessionController.login);

sessionRouter.post("/signup", SessionController.signup);

export default sessionRouter;

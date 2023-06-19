import { Router } from "express";

import RolesController from "../controllers/rolesController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const rolesRouter = Router();

rolesRouter.use(auth);

rolesRouter.get("/", authorization("role:list"), RolesController.get);

rolesRouter.get("/:rid", authorization("role:get"), RolesController.getOne);

rolesRouter.post("/", authorization("role:create"), RolesController.post);

rolesRouter.delete("/:rid", authorization("role:delete"), RolesController.delete);

export default rolesRouter;

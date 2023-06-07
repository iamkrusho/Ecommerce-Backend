import { Router } from "express";

import RolesController from "../controllers/rolesController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const rolesRouter = Router();

rolesRouter.get("/", auth, authorization("role:list"), RolesController.get);

rolesRouter.get("/:rid", auth, authorization("role:get"), RolesController.getOne);

rolesRouter.post("/", auth, authorization("role:create"), RolesController.post);

rolesRouter.delete("/:rid", auth, authorization("role:delete"), RolesController.delete);

export default rolesRouter;

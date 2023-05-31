import { Router } from "express";

import RolesController from "../controllers/rolesController.js";

const rolesRouter = Router();

rolesRouter.get("/", RolesController.get);

rolesRouter.get("/:rid", RolesController.getOne);

rolesRouter.post("/", RolesController.post);

rolesRouter.delete("/:rid", RolesController.delete);

export default rolesRouter;

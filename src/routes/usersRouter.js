import { Router } from "express";

import UserController from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get("/", UserController.get);

usersRouter.get("/:uid", UserController.getOne);

usersRouter.post("/", UserController.post);

usersRouter.put("/:uid", UserController.put);

usersRouter.delete("/:uid", UserController.delete);

export default usersRouter;

import { Router } from "express";

import UserController from "../controllers/usersController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const usersRouter = Router();

usersRouter.get("/", auth, authorization("user:list"), UserController.get);

usersRouter.get("/:uid", auth, authorization("user:get"), UserController.getOne);

usersRouter.post("/", auth, authorization("user:create"), UserController.post);

usersRouter.put("/:uid", auth, authorization("user:update"), UserController.put);

usersRouter.delete("/:uid", auth, authorization("user:delete"), UserController.delete);

export default usersRouter;

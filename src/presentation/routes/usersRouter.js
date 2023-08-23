import { Router } from "express";

import UserController from "../controllers/usersController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

import uploader from "../../helper/uploader.js";

const usersRouter = Router();

usersRouter.use(auth);

usersRouter.get("/", authorization("user:list"), UserController.get);

usersRouter.get("/:uid", authorization("user:get"), UserController.getOne);

usersRouter.get("/premium/:uid", UserController.changePremium);

usersRouter.post("/:uid/documents", uploader.array("documents", 4), UserController.insertDocuments);

usersRouter.post("/", authorization("user:create"), UserController.post);

usersRouter.put("/:uid", authorization("user:update"), UserController.put);

usersRouter.delete("/:uid", authorization("user:delete"), UserController.delete);

export default usersRouter;

import { Router } from "express";

import ProductsController from "../controllers/productsController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const productsRouter = Router();

productsRouter.get("/", ProductsController.get);

productsRouter.get("/:pid", ProductsController.getOne);

productsRouter.post("/", auth, authorization("product:create"), ProductsController.post);

productsRouter.put("/:pid", auth, authorization("product:update"), ProductsController.put);

productsRouter.delete("/:pid", auth, authorization("product:delete"), ProductsController.delete);

export default productsRouter;

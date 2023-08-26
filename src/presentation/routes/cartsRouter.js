import { Router } from "express";

import CartsController from "../controllers/cartsController.js";

import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const cartRouter = Router();

cartRouter.get("/", auth, authorization("cart:list"), CartsController.get);

cartRouter.get("/:cid", CartsController.getOne);

cartRouter.post("/", CartsController.post);

cartRouter.post("/:cid/product/:pid", CartsController.postOne);

cartRouter.post("/:cid/checkout", auth, CartsController.checkout);

cartRouter.put("/:cid", CartsController.put);

cartRouter.put("/:cid/product/:pid", CartsController.putOne);

cartRouter.delete("/:cid", CartsController.delete);

cartRouter.delete("/:cid/product/:pid", CartsController.deleteOne);

export default cartRouter;

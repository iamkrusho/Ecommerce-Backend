import express from "express";
import cookieParser from "cookie-parser";

import productsRouter from "./presentation/routes/productsRouter.js";
import cartRouter from "./presentation/routes/cartsRouter.js"
import usersRouter from "./presentation/routes/usersRouter.js"
import rolesRouter from "./presentation/routes/rolesRouter.js";
import sessionRouter from "./presentation/routes/sessionRouter.js"

import errorHandler from "./presentation/middlewares/errorHandler.js";
import { connectDB } from "./config/db.config.js";

void (async () => {
    const app = express();
    
    await connectDB();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    
    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/roles", rolesRouter);
    app.use("/api/session", sessionRouter);
    app.use(errorHandler);

    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
})();

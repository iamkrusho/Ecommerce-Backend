import express from "express";
import cookieParser from "cookie-parser";

import productsRouter from "../routes/productsRouter.js";
import cartRouter from "../routes/cartsRouter.js"
import usersRouter from "../routes/usersRouter.js"
import rolesRouter from "../routes/rolesRouter.js";
import sessionRouter from "../routes/sessionRouter.js"

import errorHandler from "../middlewares/errorHandler.js";

class AppExpress {
    init() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    build() {
        this.app.use("/api/products", productsRouter);
        this.app.use("/api/carts", cartRouter);
        this.app.use("/api/users", usersRouter);
        this.app.use("/api/roles", rolesRouter);
        this.app.use("/api/session", sessionRouter);
        this.app.use(errorHandler);
    }

    listen() {
        const PORT = process.env.NODE_PORT;

        return this.app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    }
}

export default AppExpress;

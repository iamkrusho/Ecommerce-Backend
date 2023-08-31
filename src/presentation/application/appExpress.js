import express from "express";
import cookieParser from "cookie-parser";
import swaggerUiExpress from "swagger-ui-express";

import productsRouter from "../routes/productsRouter.js";
import cartRouter from "../routes/cartsRouter.js";
import usersRouter from "../routes/usersRouter.js";
import rolesRouter from "../routes/rolesRouter.js";
import sessionRouter from "../routes/sessionRouter.js";

import errorHandler from "../middlewares/errorHandler.js";
import logger from "../middlewares/logger.js";
import { swaggerTheme, specs } from "../../swagger.js";

class AppExpress {
    init() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(logger);
    }

    build() {
        this.app.use("/api/products", productsRouter);
        this.app.use("/api/carts", cartRouter);
        this.app.use("/api/users", usersRouter);
        this.app.use("/api/roles", rolesRouter);
        this.app.use("/api/session", sessionRouter);
        this.app.use("/docs/", swaggerUiExpress.serve, swaggerUiExpress.setup(specs, swaggerTheme));
        this.app.use(errorHandler);
    }

    callback() {
        return this.app;
    }

    listen() {
        this.server = this.app.listen(process.env.NODE_PORT, () => {
            console.log(`Server listening on port ${process.env.NODE_PORT}`);
        });

        return this.server;
    }

    close() {
        this.server.close();
    }
}

export default AppExpress;

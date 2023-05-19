import express from "express";

import productsRouter from "./routes/productsRouter.js";
import sessionRouter from "./routes/sessionRouter.js"
import cartRouter from "./routes/cartsRouter.js"

import errorHandler from "./middlewares/errorHandler.js";
import { connectDB } from "./config/db.config.js";

void (async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    await connectDB();

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/session/", sessionRouter);
    app.use(errorHandler);

    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
})();

import dotenv from "dotenv";
dotenv.config();

import AppFactory from "./presentation/factories/appFactory.js";

import { connectDB } from "./config/db.config.js";

void (async () => {
    await connectDB(process.env.MONGO_DB_URI);

    const app = AppFactory.create(process.env.NODE_APPLICATION);
    
    app.init();
    app.build();
    app.listen();
})();

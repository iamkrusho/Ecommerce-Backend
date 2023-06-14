import dotenv from "dotenv";
dotenv.config();

import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/DBFactory.js";

void (async () => {
    const db = DbFactory.create(process.env.DB_ADAPTER);
    db.init(process.env.DB_URI);

    const app = AppFactory.create(process.env.NODE_APPLICATION);
    app.init();
    app.build();
    app.listen();
})();

import dotenv from "dotenv";
import { CronJob } from "cron";

dotenv.config();

import RemoveInactiveUsersCron from "./presentation/crons/removeInactiveUsers.js";
import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";

void (async() => {
    const db = DbFactory.create(process.env.DB_ADAPTER);
    db.init(process.env.DB_URI);

    const app = AppFactory.create(process.env.NODE_APPLICATION);
    app.init();
    app.build();
    app.listen();

    const cron = new CronJob("0 0 */5 * *", RemoveInactiveUsersCron);
    cron.start();
})();

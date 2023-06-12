import AppFactory from "./presentation/factories/appFactory.js"

import { connectDB } from "./config/db.config.js";


void (async () => {
    await connectDB();

    const app = AppFactory.create();
    
    app.init();
    app.build();
    app.listen();
})();

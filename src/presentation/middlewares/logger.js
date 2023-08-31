import { logger_config } from "../../config/index.js";

const logger = (req, res, next) => {
    req.logger = logger_config;

    // req.logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`);

    next();
};

export default logger;

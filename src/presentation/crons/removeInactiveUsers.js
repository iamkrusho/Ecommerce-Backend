import UserManager from "../../domain/managers/userManager.js";

import { logger_config } from "../../config/index.js";

const RemoveInactiveUsersCron = async() => {
    try {
        const manager = new UserManager();
        const result = await manager.removeInactives();
        logger_config.info(`${result} inactive users in past 30 days have been removed successfully`);
    } catch (err) {
        logger_config.error("Error to remove inactive users");
    }
};

export default RemoveInactiveUsersCron;

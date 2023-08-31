import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

export const smtp_config = {
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY
    }
};

export const logger_config = pino({
    transport: {
        level: "debug",
        target: "pino-pretty"
    }
});

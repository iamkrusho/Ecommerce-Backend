import { resolve } from "path";
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

export const swagger_config = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentation Ecommerce",
            description: "This is the documentation of the API created for one ecommerce"
        }
    },
    apis: [resolve("docs/*.yaml")]
} 

import { resolve } from "path";
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerTheme } from "swagger-themes";

const theme = new SwaggerTheme("v3");

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación del Ecommerce",
            description: "Esta es la documentación de la API"
        }
    },
    apis: [resolve("docs/**/*.yaml")]
};

export const specs = swaggerJSDoc(options);

export const swaggerTheme = { customCss: theme.getBuffer("dark"), customSiteTitle: "Documentación API" };

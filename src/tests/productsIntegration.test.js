import initServer from "./index.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe("Testing Products Endpoints", () => {
    let requester, db, product = {}, jwt = "";

    beforeAll(async () => {
        const server = await initServer();
        const application = server.app.callback();
        requester = supertest.agent(application);
        db = server.db;
        jwt = (await requester.post("/api/session/login").send({email: "admin@gmail.com", password: "12345"})).body.token;
    });

    afterAll(async () => {
        await db.close();
    });

    describe("Testing Products Endpoints Success", () => {
        test("Get products /api/products/", async () => {
            const result = await requester.get("/api/products/").expect(200);

            const { _body: body } = result;

            expect(body.data.payload).toBeTruthy();

            product = body.data.payload[0];
        });

        test("Get product /api/products/:pid", async () => {
            const result = await requester.get(`/api/products/${product.id}`).expect(200);

            const { _body: body } = result;

            expect(body.data).toBeTruthy();
            expect(body.data.id).toBe(product.id);
        });

        test("Get products with limit /api/products/", async () => {
            const result = await requester.get("/api/products/?limit=2").expect(200);

            const { _body: body } = result;

            expect(body.data.limit).toBe(2);
        });

        test("Get products with paginate /api/products/", async () => {
            const result = await requester.get("/api/products/?page=3").expect(200);

            const { _body: body } = result;

            expect(body.data.page).toBe(3);
        });

        test("Create product /api/products/", async () => {
            const payload = {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price:  faker.number.int({min: 50, max: 5000}),
                category: faker.commerce.productMaterial(),
                stock: faker.number.int({min: 50, max: 5000})
            }

            const result = await requester.post("/api/products/").set("Authorization", `Bearer ${jwt}`).send(payload).expect(201);

            const { _body: body } = result;
            
            expect(body.message).toBe("Product has been created successfully");
        });

        test("Update product /api/products/:pid", async () => {
            const payload = {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                price:  faker.number.int({min: 50, max: 5000}),
                category: faker.commerce.productMaterial(),
                stock: faker.number.int({min: 50, max: 5000})
            }

            const result = await requester.put(`/api/products/${product.id}`).set("Authorization", `Bearer ${jwt}`).send(payload).expect(200);

            const { _body: body } = result;

            console.log(body);

            expect(body.message).toBe("Product has been updated successfully");
        });

        test("Delete product /api/products/:pid", async () => {
            const result = await requester.delete(`/api/products/${product.id}`).set("Authorization", `Bearer ${jwt}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product has been deleted successfully"); 
        });
    });

    describe("Testing Products Endpoints Fails", () => {
        test("Trying to get product with invalid ID /api/products/:pid", async () => {
            await requester.get("/api/products/invalid").expect(400);
        });

        test("Trying to get nonexistent product /api/products/:pid", async () => {
            await requester.get(`/api/products/${faker.string.numeric(24)}`).expect(404);
        });

        test("Trying to create a product without credentials", async () => {
            await requester.post("/api/products/").send({}).expect(401);
        });

        test("Trying to create a empty product", async () => {
            await requester.post("/api/products/").set("Authorization", `Bearer ${jwt}`).send({}).expect(400);
        });
    });
});

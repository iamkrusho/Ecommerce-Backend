import initServer from "./index";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

describe("Testing Cart Endpoints", () => {
    let requester; let db; let cart; let product;

    beforeAll(async() => {
        const server = await initServer();
        const application = server.app.callback();
        requester = supertest.agent(application);
        db = server.db;
        product = (await requester.get("/api/products/?limit=1")).body.data.payload[0].id;
    });

    afterAll(async() => {
        await db.close();
    });

    describe("Testing Cart Endpoints Success", () => {
        test("Create cart /api/carts/", async() => {
            const result = await requester.post("/api/carts/").expect(201);

            const { _body: body } = result;

            expect(body.message).toBe("Cart has been created successfully");

            cart = body.data;
        });

        test("Get cart /api/carts/:cid", async() => {
            const result = await requester.get(`/api/carts/${cart.id}`).expect(200);

            const { _body: body } = result;

            expect(body.data.id).toBe(cart.id);
        });

        test("Add one product in cart /api/carts/:cid/product/:pid", async() => {
            const result = await requester.post(`/api/carts/${cart.id}/product/${product}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product has been added to the cart successfully");
            expect(body.data.products[0].quantity).toBe(1);
        });

        test("Add same product in cart again /api/carts/:cid/product/:pid", async() => {
            const result = await requester.post(`/api/carts/${cart.id}/product/${product}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product has been added to the cart successfully");
            expect(body.data.products[0].quantity).toBe(2);
        });

        test("Update product in cart /api/carts/:cid/product/:pid", async() => {
            const payload = {
                quantity: 20
            };

            const result = await requester.put(`/api/carts/${cart.id}/product/${product}`).send(payload).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product inside the cart has been updated successfully");
            expect(body.data.products[0].quantity).toBe(payload.quantity);
        });

        test("Delete product in cart /api/carts/:cid/product/:pid", async() => {
            const result = await requester.delete(`/api/carts/${cart.id}/product/${product}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product inside the cart has been deleted successfully");
            expect(body.data.products.length).toBe(0);
        });

        test("Delete product in cart /api/carts/:cid/product/:pid", async() => {
            const result = await requester.delete(`/api/carts/${cart.id}/product/${product}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Product inside the cart has been deleted successfully");
            expect(body.data.products.length).toBe(0);
        });

        test("Update cart /api/carts/:cid/", async() => {
            const payload = {
                products: [
                    {
                        product,
                        quantity: 50
                    }
                ]
            };

            const result = await requester.put(`/api/carts/${cart.id}`).send(payload).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Cart has been updated successfully");
            expect(body.data.products[0].quantity).toBe(50);
        });

        test("Delete cart /api/carts/:cid/", async() => {
            const result = await requester.delete(`/api/carts/${cart.id}`).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("Cart has been deleted successfully");
        });
    });

    describe("Testing Cart Endpoints Fails", () => {
        test("Trying to get nonexistent cart", async() => {
            const result = await requester.get(`/api/carts/${cart.id}`).expect(404);

            const { _body: body } = result;

            expect(body.error).toBe("Cart not found");

            cart = (await requester.post("/api/carts/")).body.data;
        });

        test("Trying to add nonexistent product into the cart", async() => {
            const result = await requester.post(`/api/carts/${cart.id}/product/${faker.string.numeric(24)}`).expect(404);

            const { _body: body } = result;

            expect(body.error).toBe("Product not found");
        });

        test("Trying to update nonexistent product inside the cart", async() => {
            const payload = {
                quantity: 20
            };

            const result = await requester.put(`/api/carts/${cart.id}/product/${faker.string.numeric(24)}`).send(payload).expect(404);

            const { _body: body } = result;

            expect(body.error).toBe("Product not found");
        });

        test("Trying to update product without valid params", async() => {
            await requester.put(`/api/carts/${cart.id}/product/${product}`).send({}).expect(400);
        });

        test("Trying to delete nonexistent product inside the car", async() => {
            const result = await requester.delete(`/api/carts/${cart.id}/product/${faker.string.numeric(24)}`).expect(404);

            const { _body: body } = result;

            expect(body.error).toBe("Product not found");
        });

        test("Trying to delete nonexistent cart", async() => {
            await requester.delete(`/api/carts/${cart.id}`);

            const result = await requester.delete(`/api/carts/${cart.id}`).expect(404);

            const { _body: body } = result;

            expect(body.error).toBe("Cart not found");
        });
    });
});

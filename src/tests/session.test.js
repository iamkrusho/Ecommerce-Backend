import initServer from "./index.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe("Testing Session Endpoints", () => {
    let requester, app, db, jwt, payload = {};

    beforeAll(async () => {
        const server = await initServer();
        const application = server.app.callback();
        requester = supertest.agent(application);
        app = server.app;
        db = server.db;
        payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
    });

    afterAll(async () => {
        await db.close()
    });

    describe("Testing Session Endpoints Success", () => {
        test("Create account /api/session/signup", async () => {
            const result = await requester.post("/api/session/signup").send(payload).expect(201);

            const { _body: body } = result;

            expect(body.message).toBe("You have successfully registered");
        });

        test("Login with account /api/session/login", async () => {
            const user = {
                email: payload.email,
                password: payload.password
            }

            const result = await requester.post("/api/session/login").send(user).expect(200);

            const { _body: body } = result;

            expect(body.message).toBe("You have successfully logged in");
            expect(body.token).toBeTruthy();
            
            jwt = body.token;
        });

        test("Current account /api/session/current", async () => {
            const result = await requester.get("/api/session/current").set("Authorization", `Bearer ${jwt}`).expect(200);

            const { _body: body } = result;

            expect(body.data.email).toBe(payload.email.toLowerCase());        
            expect(body.data.firstName).toBe(payload.firstName);        
            expect(body.data.lastName).toBe(payload.lastName);        
        });
    });
    describe("Testing Session Endpoints Fails", () => {
        test("Invalid creation of account /api/session/session", async () => {
            await requester.post("/api/session/signup").send({}).expect(400);
        });

        test("Invalid creation of repeated account /api/session/session", async () => {
            const result = await requester.post("/api/session/signup").send(payload).expect(409);

            const { _body: body } = result;

            expect(body.error).toBe("User already exist");
        });

        test("Unauthorized access /api/session/current", async () => {
            await requester.get("/api/session/current").expect(401);
        });

        test("Invalid email /api/session/login", async () => {
            const result = await requester.post("/api/session/login").send({email: faker.internet.email(), password: payload.password}).expect(401);

            const { _body: body } = result;

            expect(body.error).toBe("Incorrect user");
        });

        test("Invalid password /api/session/login", async () => {
            const result = await requester.post("/api/session/login").send({email: payload.email, password: faker.internet.password()}).expect(401);

            const { _body: body } = result;

            expect(body.error).toBe("Incorrect password");
        });
    });
});

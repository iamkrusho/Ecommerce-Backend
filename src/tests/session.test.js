import initServer from "./index.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe("Testing Session Endpoints Success", () => {
    let requester, app, db;

    beforeAll(async () => {
        const server = await initServer();
        const application = server.app.callback();
        requester = supertest.agent(application);
        app = server.app;
        db = server.db;
    });

   

    afterAll(async () => {
        await db.close()
    });

    test("Create account /api/session/signup", async () => {
        const payload = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }

        await requester.post("/api/session/signup").send(payload).expect(201);
    });
});
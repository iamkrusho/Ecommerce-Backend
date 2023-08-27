import { Command } from "commander";

import UserManager from  "../../domain/managers/userManager.js";
import RoleManager from "../../domain/managers/roleManager.js";

const CreateUserCommand = new Command("createUser");

CreateUserCommand
    .version("0.0.1")
    .description("Create a new user")
    .option("-fn, --firstName <firstName>", "User's first name")
    .option("-ln, --lastName <lastName>", "User's last name")
    .option("-e, --email <email>", "User's email")
    .option("-p, --password <password>", "User's password")
    .option("-a, --age <age>", "User's age")
    .option("-ia, --isAdmin <isAdmin>", "User's isAdmin")
    .action(async(env) => {
        const userManager = new UserManager();
        const roleManager = new RoleManager();

        const adminRole = await roleManager.getOneByName("Admin");

        const payload = {
            ...env,
            role: adminRole.id.toString(),
            last_connection: Date.now(),
            isAdmin: true,
            age: +env.age
        };

        const user = await userManager.addOne(payload);

        if (!user) {
            console.log("Error to create user");
        }

        console.log("User created successfully");
    });

export default CreateUserCommand;

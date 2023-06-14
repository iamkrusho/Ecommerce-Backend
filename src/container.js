import { createContainer, asClass, Lifetime } from "awilix";

import CartMongooseRepository from "./data/repositories/cartMongooseRepository.js";
import ProductMongooseRepository from "./data/repositories/productMongooseRepository.js";
import RoleMongooseRepository from "./data/repositories/roleMongooseRepository.js";
import UserMongooseRepository from "./data/repositories/userMongooseRepository.js";

const container = createContainer();

container.register("CartRepository", asClass(CartMongooseRepository), { lifetame: Lifetime.SINGLETON });
container.register("ProductRepository", asClass(ProductMongooseRepository), { lifetame: Lifetime.SINGLETON });
container.register("RoleRepository", asClass(RoleMongooseRepository), { lifetame: Lifetime.SINGLETON });
container.register("UserRepository", asClass(UserMongooseRepository), { lifetame: Lifetime.SINGLETON });

export default container;

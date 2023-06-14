import MongooseAdapter from "../adapters/mongooseAdapter.js";

class DbFactory {
    static create(dbType = "MongooseAdapter") {
        const dbs = new Map();
        dbs.set("MongooseAdapter", MongooseAdapter);

        const db = dbs.get(dbType);
        return new db();
    }
}

export default DbFactory;

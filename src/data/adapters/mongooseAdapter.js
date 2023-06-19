import mongoose from "mongoose";

class MongooseAdapter {
    async init(uri) {
        try {
            this.connection = await mongoose.connect(uri);
            console.log('Database connected');
        } catch (err) {
            console.log("Error connecting to database: ", err);
        }
    }

    async close() {
        try {
            await this.connection.disconnect();
            console.log('Database disconnected');
        } catch (err) {
            console.log("Error disconnecting to database: ", err);
        }
    }
}

export default MongooseAdapter;

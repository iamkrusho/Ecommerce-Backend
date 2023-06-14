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
        await this.connection.disconnect();
    }
}

export default MongooseAdapter;

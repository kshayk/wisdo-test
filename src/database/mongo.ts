import mongoose from "mongoose";
import * as process from "process";

export async function mongoConnect() {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/wisdo`, {
        "user": process.env.MONGO_USER,
        "pass": process.env.MONGO_PASSWORD,
        "authSource": "admin"
    });
}

export async function mongoDisconnect() {
    await mongoose.disconnect();
}
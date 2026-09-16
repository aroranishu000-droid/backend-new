


const { MongoClient } = require("mongodb");

const url = "mongodb+srv://nishu00100:Password123@cluster0.vnpfpm3.mongodb.net/?appName=Cluster0";

const client = new MongoClient(url);

const dbName = "sample_mflix";

async function connectDB() {
        console.log("connectDB() called");
    try {
        await client.connect();

        console.log("MongoDB Connected Successfully!");

        const db = client.db(dbName);

        return db;
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
}

module.exports = connectDB;
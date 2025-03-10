const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {}); // Explicit empty object to remove warnings
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error("MongoDB Connection Failed", err);
        process.exit(1);
    }
};

module.exports = connectDB;

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" }, // Default value to prevent undefined
    date: { type: Date, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    tickets: { type: Number, required: true },
    image: { type: String, default: "default.jpg" }, // Default image to prevent issues
    category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);

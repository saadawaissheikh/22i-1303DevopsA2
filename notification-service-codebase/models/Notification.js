const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        type: { type: String, enum: ["booking", "reminder", "cancellation", "message"], required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("Notification", notificationSchema);

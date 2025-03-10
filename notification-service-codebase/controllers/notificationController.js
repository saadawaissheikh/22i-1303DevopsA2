const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.query.userId });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
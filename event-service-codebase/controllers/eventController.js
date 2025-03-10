const Event = require("../models/Event");

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        if (!events || events.length === 0) {
            return res.status(404).json({ error: "No events found" });
        }
        res.status(200).json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

// Get top 6 events
exports.getTopEvents = async (req, res) => {
    try {
        const topEvents = await Event.find().sort({ createdAt: -1 }).limit(6);
        if (!topEvents || topEvents.length === 0) {
            return res.status(404).json({ error: "No top events found" });
        }
        res.status(200).json(topEvents);
    } catch (err) {
        console.error("Error fetching top events:", err);
        res.status(500).json({ error: "Failed to fetch top events" });
    }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: "Event ID is required" });
        }

        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        res.status(200).json(event);
    } catch (err) {
        console.error("Error fetching event by ID:", err);
        res.status(500).json({ error: "Invalid event ID or server error" });
    }
};

// Create an event
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, price, tickets, image, category } = req.body;

        // Validate required fields
        if (!title || !date || !location || !price || !tickets || !category) {
            return res.status(400).json({ error: "All fields (title, date, location, price, tickets, category) are required" });
        }

        const newEvent = new Event({ title, description, date, location, price, tickets, image, category });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Server error while creating event" });
    }
};

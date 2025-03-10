require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // For file uploads
const path = require("path"); // For file path handling
const fs = require("fs"); // For file system operations
const mongoose = require("mongoose");
const eventRoutes = require("../routes/eventRoutes");
const Event = require("../models/Event"); // Import Event model

const app = express();
const PORT = process.env.PORT || 5002;

// MongoDB Connection with Authentication
const MONGO_URI = process.env.MONGO_URI || "mongodb://eventuser:eventpass123@eventbooking-mongodb-1:27017/eventbooking?authSource=admin";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Ensure the images directory exists
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save uploaded files in the 'images' folder
  },
  filename: (req, file, cb) => {
    const filePath = path.join(uploadDir, file.originalname);

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      const error = new Error("File already exists. Please rename and try again.");
      error.code = "FILE_EXISTS"; // Custom error code for handling in frontend
      return cb(error, null); // Pass error to Multer
    }

    cb(null, file.originalname); // Save file with original name if no conflict
  }
});

const upload = multer({ storage });

// Image Upload Route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ filePath: `/images/${req.file.filename}` }); // Send back the file path
});

// Error Handling Middleware for Multer
app.use((err, req, res, next) => {
  if (err.code === "FILE_EXISTS") {
    return res.status(400).json({ message: err.message }); // Send error response
  }

  res.status(500).json({ message: "File upload failed", error: err.message });
});

// Serve Uploaded Images
app.use("/images", express.static(uploadDir));

// Routes
app.use("/api/events", eventRoutes);

// Route to get event by ID
app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Event Service running on port ${PORT}`));

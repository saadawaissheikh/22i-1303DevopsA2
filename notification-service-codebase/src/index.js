require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const notificationRoutes = require("../routes/notificationRoutes");


const app = express();
const PORT = process.env.PORT || 5003;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/notifications", notificationRoutes);

// Start Server
app.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));

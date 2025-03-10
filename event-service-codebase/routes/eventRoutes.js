const express = require("express");
const { getEvents, getTopEvents, createEvent, getEventById } = require("../controllers/eventController");

const router = express.Router();

router.get("/", getEvents);
router.get("/top", getTopEvents);
router.get("/:id", getEventById);
router.post("/create", createEvent);

module.exports = router;

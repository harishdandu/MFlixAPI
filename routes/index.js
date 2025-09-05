const express = require("express");
const router = express.Router();

// Root route
router.get("/", (req, res) => {
  res.send("Hello, Node.js App is running 🚀");
});

// Example API route
router.get("/api/clinics", (req, res) => {
  res.json([
    { id: 1, name: "City Clinic", subscription: "ACTIVE" },
    { id: 2, name: "Green Hospital", subscription: "EXPIRED" }
  ]);
});

module.exports = router;

const express = require("express");
const { User } = require("@/Entities/User");

const router = express.Router(); // creates a router object

// Create user with this route
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
});

module.exports = router;

const express = require("express");

const router = express.Router(); // creates a router object

const transactions = require("@/data/transactions");

router.get("/", (req, res) => {
  // the paths are relative to where the router is mounted
  res.json(transactions);
});
router.get("/:id", (req, res) => {
  res.send(`User details for ID: ${req.params.id}`);
});
module.exports = router; // export it

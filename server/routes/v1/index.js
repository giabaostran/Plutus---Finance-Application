const express = require("express");

const transactionRouters = require("./transactions");

const v1Router = express.Router(); // creates a router object

v1Router.use("/transactions", transactionRouters);

module.exports = v1Router;

const express = require("express");

const transactionRouters = require("./transactions");
const usersRouters = require("./users");

const v1Router = express.Router(); // creates a router object

v1Router.use("/transactions", transactionRouters);
v1Router.use("/users", usersRouters);

module.exports = v1Router;

const express = require("express");
const cors = require("cors");
require("module-alias/register");

const v1Router = require("@/routes/v1/index");

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/v1", v1Router);

// Start server
app.listen(PORT);
console.log(`Server is listening at http://localhost:${PORT}`);

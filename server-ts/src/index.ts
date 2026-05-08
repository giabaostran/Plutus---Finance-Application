import express from "express";
import { DummyDb } from "./infrastructure/db/DummyDb";
import { UserRepository, UserUseCases } from "./service/interfaces";
import { UserController } from "./controller/UserController";
import { UserServices } from "./service/UserServices";

const app = express();
const port = process.env.PORT || 3000;

const userRepo: UserRepository = new DummyDb();
const userServices: UserUseCases = new UserServices(userRepo);
const userController = new UserController(userServices);

app.use(express.json());

// controller
app.post("/users", userController.create);

app.put("/users/:username/password", userController.changePassword);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

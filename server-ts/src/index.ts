import express, { Request, Response } from "express";
import { DummyDb } from "./infrastructure/db/DummyDb";
import { CreateUser } from "./service/CreateUser";
import { CreateUserUseCase, UserRepository } from "./service/interfaces";
import { UserController } from "./controller/UserController";

const app = express();
const port = process.env.PORT || 3000;

const userRepo: UserRepository = new DummyDb();
const createUser: CreateUserUseCase = new CreateUser(userRepo);
const userController = new UserController(createUser);

app.use(express.json());

// controller
app.post("/", userController.create);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

import express from "express";
import { Request, Response } from "express";

import { TransactionDummyDb, UserDummyDb } from "./infrastructure/db/DummyDb";
import {
  UserRepository,
  CreateUserUseCase,
  ChangeUserPasswordUseCase,
  CreateTransactionUseCase,
  TransactionRepository,
  GetTransactionByIdUseCase,
  UpdateTransactionUseCase,
} from "./service/interfaces";

import { CreateUser } from "./service/CreateUser";
import { ChangeUserPassword } from "./service/ChangeUserPassword";
import { CreateTransaction } from "./service/CreateTransaction";
import { GetTransactionsById } from "./service/GetTransactionsById";
import { UpdateTransaction } from "./service/UpdateTransaction";

const app = express();
const port = process.env.PORT || 3000;

const userRepo: UserRepository = new UserDummyDb();
const transactionRepo: TransactionRepository = new TransactionDummyDb();

app.use(express.json());

// controller
const createUser: CreateUserUseCase = new CreateUser(userRepo);
const changeUserPassword: ChangeUserPasswordUseCase = new ChangeUserPassword(userRepo);
const createTransaction: CreateTransactionUseCase = new CreateTransaction(transactionRepo, userRepo);
const getTransactionById: GetTransactionByIdUseCase = new GetTransactionsById(transactionRepo, userRepo);
const updateTransaction: UpdateTransactionUseCase = new UpdateTransaction(transactionRepo);

app.post("/users", (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const user = createUser.execute(email, username, password); // this can throw an error
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.patch("/users/:id/password", (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = Number(req.params.id);
    const user = changeUserPassword.execute(id, oldPassword, newPassword); // this can throw an error

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.post("/users/:id/transactions", (req: Request, res: Response) => {
  try {
    const { name, category, date, status, amt } = req.body;

    const belongsTo = Number(req.params.id);

    const transaction = createTransaction.execute(name, category, date, status, amt, belongsTo); // this can throw an error

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.get("/users/:id/transactions", (req: Request, res: Response) => {
  try {
    const belongsTo = Number(req.params.id);

    const transactions = getTransactionById.execute(belongsTo);

    res.status(201).json(transactions);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.patch("/transactions/:id", (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name, category, amount, status } = req.body;

    const transaction = updateTransaction.execute(id, {
      name,
      category,
      amount,
      status,
    });

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

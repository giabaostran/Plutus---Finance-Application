import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";

import { DummyTransactionDb, DummyUserDb, DummyAssetDb } from "./infrastructure/db/DummyDb";

import {
  UserRepository,
  CreateUserUseCase,
  ChangeUserPasswordUseCase,
  CreateTransactionUseCase,
  TransactionRepository,
  GetTransactionByIdUseCase,
  UpdateTransactionUseCase,
  CreateAssetUseCase,
  AssetRepository,
  GetUserUseCase,
  DeleteUserUseCase,
  LoginUseCase,
  DeleteTransactionUseCase,
} from "./service/interfaces";

import { CreateUser } from "./service/userRelated/CreateUser";
import { ChangeUserPassword } from "./service/userRelated/ChangeUserPassword";
import { CreateTransaction } from "./service/transactionRelated/CreateTransaction";
import { GetTransactionsById } from "./service/transactionRelated/GetTransactionsById";
import { UpdateTransaction } from "./service/transactionRelated/UpdateTransaction";
import { CreateAsset } from "./service/assetRelated/CreateAsset";
import { GetUser } from "./service/userRelated/GetUser";
import { DeleteUser } from "./service/userRelated/DeleteUser";
import { Login } from "./service/userRelated/Login";
import { DeleteTransaction } from "./service/transactionRelated/DeleteTransaction";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ========================================
// TYPES
// ========================================

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// ========================================
// DATABASES
// ========================================

const userRepo: UserRepository = new DummyUserDb();
const transactionRepo: TransactionRepository = new DummyTransactionDb();
const assetRepo: AssetRepository = new DummyAssetDb();

// ========================================
// USE CASES
// ========================================

// USER
const createUser: CreateUserUseCase = new CreateUser(userRepo);
const changeUserPassword: ChangeUserPasswordUseCase = new ChangeUserPassword(userRepo);

const getUser: GetUserUseCase = new GetUser(userRepo);

const deleteUser: DeleteUserUseCase = new DeleteUser(userRepo);

const login: LoginUseCase = new Login(userRepo);

// TRANSACTION
const createTransaction: CreateTransactionUseCase = new CreateTransaction(transactionRepo, userRepo);

const getTransactionById: GetTransactionByIdUseCase = new GetTransactionsById(transactionRepo, userRepo);

const updateTransaction: UpdateTransactionUseCase = new UpdateTransaction(transactionRepo);

const deleteTransaction: DeleteTransactionUseCase = new DeleteTransaction(transactionRepo);

// ASSET
const createAsset: CreateAssetUseCase = new CreateAsset(assetRepo);

// ========================================
// AUTH MIDDLEWARE
// ========================================

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No authorization header",
    });
  }

  // const token = authHeader.split(" ")[1];
  const token = authHeader;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as `string`, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    }

    console.log(decoded);

    req.user = decoded;

    next();
  });
}

// ========================================
// AUTH ROUTES
// ========================================

// REGISTER
app.post("/register", (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    const user = createUser.execute(email, username, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// LOGIN
app.post("/login", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = login.execute(email, password);

    const accessToken = jwt.sign(
      {
        userId: user.getId(),
        email: user.getEmail(),
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    res.status(200).json({
      accessToken,
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ========================================
// USER ROUTES (PROTECTED)
// ========================================

// GET CURRENT USER
app.get("/users/me", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const user = getUser.execute(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// CHANGE PASSWORD
app.patch("/users/me/password", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const { oldPassword, newPassword } = req.body;

    const user = changeUserPassword.execute(userId, oldPassword, newPassword);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// DELETE USER
app.delete("/users/me", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const deletedUser = deleteUser.execute(userId);

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ========================================
// TRANSACTION ROUTES (PROTECTED)
// ========================================

// CREATE TRANSACTION
app.post("/transactions", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const { name, category, date, status, amt } = req.body;

    const transaction = createTransaction.execute(name, category, date, status, amt, userId);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// GET MY TRANSACTIONS
app.get("/transactions", authenticateToken, (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const transactions = getTransactionById.execute(userId);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// UPDATE TRANSACTION
app.patch("/transactions/:transactionId", authenticateToken, (req: Request, res: Response) => {
  try {
    const transactionId = Number(req.params.transactionId);

    const userId = req.user.userId;

    const { name, category, amount, status } = req.body;

    const transaction = updateTransaction.execute(transactionId, userId, {
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

app.delete("/transactions/:transactionId", authenticateToken, (req: Request, res: Response) => {
  try {
    const transactionId = Number(req.params.transactionId);

    const userId = req.user.userId;

    const transaction = deleteTransaction.execute(transactionId, userId);

    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ========================================
// ASSET ROUTES (PROTECTED)
// ========================================

// ========================================
// SERVER
// ========================================

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

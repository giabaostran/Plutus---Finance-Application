import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";

// ============================== USER RELATED ==============================

export interface UserUseCases {
  create: (email: string, username: string, password: string) => User;
  changePassword: (id: number, oldPassword: string, newPassword: string) => void;
}

export interface UserRepository {
  getByEmail: (email: string) => User | null;
  getByUsername: (username: string) => User | null;
  getById: (id: number) => User | null;
  getNextId(): number;
  add: (user: User) => void;
  update: (user: User) => void;
}

// ============================== TRANSACTION RELATED ==============================
export interface TransactionUseCases {
  create: (
    name: string,
    category: string,
    date: number,
    status: string,
    amt: number,
    belongsTo: number,
  ) => Transaction | null;

  getByUserId: (id: number) => Transaction[] | null;
}
export interface TransactionRepository {
  addTransaction: (transaction: Transaction) => void;
  getTransactionsByUser: (id: number) => Transaction[] | null;
  getNextId(): number;
}

export interface UtilityService {
  sendEmail: (recipient: string, subject: string, content: string) => void;
}
// ============================== BY USE CASE RELATED ==============================

export interface CreateUserUseCase {
  execute: (email: string, username: string, password: string) => User;
}

export interface ChangeUserPasswordUseCase {
  execute: (id: number, oldPassword: string, newPassword: string) => void;
}

export interface CreateTransactionUseCase {
  execute: (
    name: string,
    category: string,
    date: number,
    status: string,
    amt: number,
    belongsTo: number,
  ) => Transaction;
}

export interface GetTransactionByIdUseCase {
  execute: (id: number) => Transaction[] | null;
}

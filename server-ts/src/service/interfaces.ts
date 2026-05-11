import { Transaction, TransactionCategory, TransactionStatus } from "../entities/Transaction";
import { User } from "../entities/User";

// ============================== RESOURCE RELATED ==============================

export interface UserUseCases {
  create: (email: string, username: string, password: string) => User;
  changePassword: (id: number, oldPassword: string, newPassword: string) => void;
}

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

export interface UtilityService {
  sendEmail: (recipient: string, subject: string, content: string) => void;
}

// ============================== TRANSACTION RELATED ==============================

export interface UserRepository {
  getByEmail: (email: string) => User | null;
  getByUsername: (username: string) => User | null;
  getById: (id: number) => User | null;
  getNextId(): number;

  add: (user: User) => void;
  update: (user: User) => void;
}

export interface TransactionRepository {
  add: (transaction: Transaction) => void;
  update: (transaction: Transaction) => void;
  getByUserId: (id: number) => Transaction[] | null;
  getById: (id: number) => Transaction | null;
  getNextId(): number;
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
    category: TransactionCategory,
    date: number,
    status: TransactionStatus,
    amt: number,
    belongsTo: number,
  ) => Transaction;
}

export interface GetTransactionByIdUseCase {
  execute: (id: number) => Transaction[] | null;
}

export interface UpdateTransactionUseCase {
  execute(
    transactionId: number,
    updates: {
      name?: string;
      category?: TransactionCategory;
      amount?: number;
      status?: TransactionStatus;
    },
  ): Transaction;
}

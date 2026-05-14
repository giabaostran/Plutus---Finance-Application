import { Asset, AssetType } from "../entities/Asset";
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

// ========================================
// USER RELATED
// ========================================
export interface UserRepository {
  save(user: User): void;

  update(user: User): void;

  softDelete(id: number): void;

  getById(id: number): User | null;

  getByEmail(email: string): User | null;

  getByUsername(username: string): User | null;

  getNextId(): number;
}

export interface CreateUserUseCase {
  execute: (email: string, username: string, password: string) => User;
}

export interface ChangeUserPasswordUseCase {
  execute: (id: number, oldPassword: string, newPassword: string) => void;
}

export interface GetUserUseCase {
  execute(userId: number): User;
}

export interface DeleteUserUseCase {
  execute(userId: number): void;
}

export interface LoginUseCase {
  execute(email: string, password: string): User;
}

// ========================================
// TRANSACTION RELATED
// ========================================
export interface TransactionRepository {
  save: (transaction: Transaction) => void;
  update: (transaction: Transaction) => void;
  getByUserId: (id: number) => Transaction[] | null;
  getById: (id: number) => Transaction | null;
  getNextId(): number;
  delete(transaction: Transaction): void;
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
    userId: number,
    updates: {
      name?: string;
      category?: TransactionCategory;
      amount?: number;
      status?: TransactionStatus;
    },
  ): Transaction;
}

export interface DeleteTransactionUseCase {
  execute(transactionId: number, userId: number): void;
}

// ========================================
// ASSET RELATED
// ========================================
export interface AssetRepository {
  save(asset: Asset): void;

  update(asset: Asset): void;

  getById(id: number): Asset | null;

  getAllByUserId(userId: number): Asset[];

  delete(id: number): void;

  getNextId(): number;
}

export interface CreateAssetUseCase {
  execute(
    belongsTo: number,
    icon: string,
    background: string,
    name: string,
    type: AssetType,
    value: number,
    cost: number,
    acquiredDate: number,
    note: string,
  ): Asset;
}

export interface UpdateAssetUseCase {
  execute(
    assetId: number,
    updates: {
      name?: string;
      type?: AssetType;
      value?: number;
      cost?: number;
      note?: string;
    },
  ): Asset;
}

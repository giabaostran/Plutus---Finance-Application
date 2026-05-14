import fs from "fs";

import { User } from "../../entities/User";
import { Transaction, TransactionCategory } from "../../entities/Transaction";
import { Asset, AssetType } from "../../entities/Asset";

import { UserRepository, TransactionRepository, AssetRepository } from "../../service/interfaces";

// ======================================================
// RAW TYPES
// ======================================================

type RawUser = {
  id: number;
  email: string;
  username: string;
  password: string;
  deleted: boolean;
};

type RawTransaction = {
  id: number;
  name: string;
  category: TransactionCategory;
  date: number;
  status: "ok" | "pending" | "failed";
  amt: number;
  belongsTo: number;
};

type RawAsset = {
  id: number;
  icon: string;
  background: string;
  name: string;
  type: AssetType;
  value: number;
  cost: number;
  acquiredDate: number;
  note: string;
  belongsTo: number;
};

// ======================================================
// USER REPOSITORY
// ======================================================

export class DummyUserDb implements UserRepository {
  private filePath = "./users.json";

  // =========================
  // PRIVATE HELPERS
  // =========================

  private readUsers(): User[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    const data = fs.readFileSync(this.filePath, "utf-8");

    const rawUsers: RawUser[] = JSON.parse(data);

    return rawUsers.map((u) => new User(u.id, u.email, u.username, u.password, u.deleted));
  }

  private writeUsers(users: User[]): void {
    const rawUsers: RawUser[] = users.map((u) => ({
      id: u.getId(),
      email: u.getEmail(),
      username: u.getUsername(),
      password: u.getPassword(),
      deleted: u.isDeleted(),
    }));

    fs.writeFileSync(this.filePath, JSON.stringify(rawUsers, null, 2));
  }

  // =========================
  // PUBLIC METHODS
  // =========================

  save(user: User): void {
    const users = this.readUsers();

    users.push(user);

    this.writeUsers(users);

    console.log(`Saved ${user.getEmail()}`);
  }

  update(user: User): void {
    const users = this.readUsers();

    const index = users.findIndex((u) => u.getId() === user.getId());

    if (index === -1) {
      throw new Error("User not found");
    }

    users[index] = user;

    this.writeUsers(users);
  }

  softDelete(id: number): void {
    const users = this.readUsers();

    const user = users.find((u) => u.getId() === id);

    if (!user) {
      throw new Error("User not found");
    }

    user.softDelete();

    this.writeUsers(users);
  }

  getById(id: number): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getId() === id) || null;
  }

  getByEmail(email: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getEmail() === email) || null;
  }

  getByUsername(username: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getUsername() === username) || null;
  }

  getNextId(): number {
    const users = this.readUsers();

    if (users.length === 0) {
      return 1;
    }

    const maxId = Math.max(...users.map((u) => u.getId()));

    return maxId + 1;
  }
}

// ======================================================
// TRANSACTION REPOSITORY
// ======================================================

export class DummyTransactionDb implements TransactionRepository {
  private filePath = "./transactions.json";

  // =========================
  // PRIVATE HELPERS
  // =========================

  private readTransactions(): Transaction[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    const data = fs.readFileSync(this.filePath, "utf-8");

    const rawTransactions: RawTransaction[] = JSON.parse(data);

    return rawTransactions.map((t) => new Transaction(t.id, t.name, t.category, t.date, t.status, t.amt, t.belongsTo));
  }

  private writeTransactions(transactions: Transaction[]): void {
    const rawTransactions: RawTransaction[] = transactions.map((t) => ({
      id: t.getId(),
      name: t.getName(),
      category: t.getCategory(),
      date: t.getDate(),
      status: t.getStatus(),
      amt: t.getAmount(),
      belongsTo: t.getBelongsTo(),
    }));

    fs.writeFileSync(this.filePath, JSON.stringify(rawTransactions, null, 2));
  }

  // =========================
  // PUBLIC METHODS
  // =========================

  save(transaction: Transaction): void {
    const transactions = this.readTransactions();

    transactions.push(transaction);

    this.writeTransactions(transactions);

    console.log(`Saved transaction ${transaction.getId()}`);
  }

  update(transaction: Transaction): void {
    const transactions = this.readTransactions();

    const index = transactions.findIndex((t) => t.getId() === transaction.getId());

    if (index === -1) {
      throw new Error("Transaction not found");
    }

    transactions[index] = transaction;

    this.writeTransactions(transactions);
  }
  delete(transaction: Transaction): void {
    const transactions = this.readTransactions();

    const filtered = transactions.filter((t) => t.getId() !== transaction.getId());

    this.writeTransactions(filtered);
  }

  getById(id: number): Transaction | null {
    const transactions = this.readTransactions();

    return transactions.find((t) => t.getId() === id) || null;
  }

  getByUserId(userId: number): Transaction[] {
    const transactions = this.readTransactions();

    return transactions.filter((t) => t.getBelongsTo() === userId);
  }

  getNextId(): number {
    const transactions = this.readTransactions();

    if (transactions.length === 0) {
      return 1;
    }

    const maxId = Math.max(...transactions.map((t) => t.getId()));

    return maxId + 1;
  }
}

// ======================================================
// ASSET REPOSITORY
// ======================================================

export class DummyAssetDb implements AssetRepository {
  private filePath = "./assets.json";

  // =========================
  // PRIVATE HELPERS
  // =========================

  private readAssets(): Asset[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    const data = fs.readFileSync(this.filePath, "utf-8");

    const rawAssets: RawAsset[] = JSON.parse(data);

    return rawAssets.map(
      (a) =>
        new Asset(a.id, a.icon, a.background, a.name, a.type, a.value, a.cost, a.acquiredDate, a.note, a.belongsTo),
    );
  }

  private writeAssets(assets: Asset[]): void {
    const rawAssets: RawAsset[] = assets.map((a) => ({
      id: a.getId(),
      icon: a.getIcon(),
      background: a.getBackground(),
      name: a.getName(),
      type: a.getType(),
      value: a.getValue(),
      cost: a.getCost(),
      acquiredDate: a.getAcquiredDate(),
      note: a.getNote(),
      belongsTo: a.getBelongsTo(),
    }));

    fs.writeFileSync(this.filePath, JSON.stringify(rawAssets, null, 2));
  }

  // =========================
  // PUBLIC METHODS
  // =========================

  save(asset: Asset): void {
    const assets = this.readAssets();

    assets.push(asset);

    this.writeAssets(assets);

    console.log(`Saved asset ${asset.getName()}`);
  }

  update(asset: Asset): void {
    const assets = this.readAssets();

    const index = assets.findIndex((a) => a.getId() === asset.getId());

    if (index === -1) {
      throw new Error("Asset not found");
    }

    assets[index] = asset;

    this.writeAssets(assets);
  }

  getById(id: number): Asset | null {
    const assets = this.readAssets();

    return assets.find((a) => a.getId() === id) || null;
  }

  getAllByUserId(userId: number): Asset[] {
    const assets = this.readAssets();

    return assets.filter((a) => a.getBelongsTo() === userId);
  }

  delete(id: number): void {
    const assets = this.readAssets();

    const filtered = assets.filter((a) => a.getId() !== id);

    this.writeAssets(filtered);
  }

  getNextId(): number {
    const assets = this.readAssets();

    if (assets.length === 0) {
      return 1;
    }

    const maxId = Math.max(...assets.map((a) => a.getId()));

    return maxId + 1;
  }
}

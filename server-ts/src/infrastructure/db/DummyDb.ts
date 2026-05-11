import fs from "fs";

import { User } from "../../entities/User";
import { UserRepository, TransactionRepository } from "../../service/interfaces";
import { Transaction } from "../../entities/Transaction";

export class UserDummyDb implements UserRepository {
  // private filePath = path.join(process.cwd(), "users.json");
  private filePath = "./users.json";

  // ========================= INFRASTRUCTURE IMPLEMENTATION =========================
  private readUsers(): User[] {
    // create file if it doesn't exist
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    const data = fs.readFileSync(this.filePath, "utf-8");

    return JSON.parse(data).map((u: any) => new User(u.id, u.email, u.username, u.password));
  }

  private writeUsers(users: User[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }

  // ========================= INFRASTRUCTURE OPERATION =========================
  add(user: User): void {
    const users = this.readUsers();

    users.push(user);

    this.writeUsers(users);

    console.log(`Added ${user.getEmail()}`);
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

  getByEmail(email: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getEmail() === email) || null;
  }

  getByUsername(username: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getUsername() === username) || null;
  }

  getById(id: number): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getId() === id) || null;
  }

  getNextId(): number {
    const users = this.readUsers();

    if (users.length === 0) return 1;

    const maxId = Math.max(...users.map((u) => u.getId()));
    return maxId + 1;
  }
}

export class TransactionDummyDb implements TransactionRepository {
  // private filePath = path.join(process.cwd(), "users.json");
  private filePath = "./transactions.json";

  // ========================= INFRASTRUCTURE IMPLEMENTATION =========================
  private readTransactions(): Transaction[] {
    // create file if it doesn't exist
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }

    const data = fs.readFileSync(this.filePath, "utf-8");

    return JSON.parse(data).map(
      (t: any) => new Transaction(t.id, t.name, t.category, t.date, t.status, t.amt, t.belongsTo),
    );
  }

  private writeTransactions(transactions: Transaction[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(transactions, null, 2));
  }

  // ========================= INFRASTRUCTURE OPERATION =========================

  add(transaction: Transaction): void {
    const transactions = this.readTransactions();

    transactions.push(transaction);

    this.writeTransactions(transactions);

    console.log(`Added Transcations`);
  }

  getByUserId(id: number): Transaction[] {
    const transactions = this.readTransactions();

    return transactions.filter((t) => t.getBelongsTo() === id);
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

  getNextId(): number {
    const transactions = this.readTransactions();

    if (transactions.length === 0) return 1;

    const maxId = Math.max(...transactions.map((t) => t.getId()));

    return maxId + 1;
  }

  getById(id: number): Transaction | null {
    const transactions = this.readTransactions();

    return transactions.find((t) => t.getId() === id) || null;
  }
}

export class Transaction {
  constructor(
    private id: number,
    private name: string,
    private category: TransactionCategory,
    private date: number,
    private status: TransactionStatus,
    private amt: number,
    private belongsTo: number,
  ) {
    if (!name) {
      throw new Error("Transaction name is required");
    }

    if (!category) {
      throw new Error("Category is required");
    }

    if (!Number.isFinite(amt)) {
      throw new Error("Invalid amount");
    }

    if (!Number.isInteger(date)) {
      throw new Error("Invalid timestamp");
    }

    if (!Number.isInteger(belongsTo)) {
      throw new Error("Invalid belongsTo");
    }
  }

  // ===== GETTERS =====

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): TransactionCategory {
    return this.category;
  }

  getDate(): number {
    return this.date;
  }

  getStatus(): TransactionStatus {
    return this.status;
  }

  getAmount(): number {
    return this.amt;
  }

  getBelongsTo(): number {
    return this.belongsTo;
  }

  // ===== DOMAIN METHODS =====

  changeName(name: string): void {
    if (!name) {
      throw new Error("Transaction name is required");
    }

    this.name = name;
  }

  changeCategory(category: TransactionCategory): void {
    if (!category) {
      throw new Error("Category is required");
    }

    this.category = category;
  }

  changeDate(date: number): void {
    if (!Number.isInteger(date)) {
      throw new Error("Invalid timestamp");
    }

    this.date = date;
  }

  changeStatus(status: TransactionStatus): void {
    this.status = status;
  }

  changeAmount(amt: number): void {
    if (!Number.isFinite(amt)) {
      throw new Error("Invalid amount");
    }

    this.amt = amt;
  }

  // ===== HELPERS =====

  isExpense(): boolean {
    return this.amt < 0;
  }

  isIncome(): boolean {
    return this.amt > 0;
  }
}
export type TransactionStatus = "ok" | "pending" | "failed";

export type TransactionCategory =
  | "housing"
  | "income"
  | "groceries"
  | "investment"
  | "software"
  | "transfer"
  | "transport"
  | "entertainment"
  | "health"
  | "default";

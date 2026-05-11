export class Transaction {
  constructor(
    private id: number,
    private name: string,
    private category: string,
    private date: number,
    private status: string,
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
      throw new Error("Invalid Belongs to");
    }
  }

  // ===== GETTERS =====

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): string {
    return this.category;
  }

  getDate(): number {
    return this.date;
  }

  getStatus(): string {
    return this.status;
  }

  getAmount(): number {
    return this.amt;
  }

  getBelongsTo(): number {
    return this.belongsTo;
  }

  // ===== DOMAIN METHODS =====

  isExpense(): boolean {
    return this.amt < 0;
  }

  isIncome(): boolean {
    return this.amt > 0;
  }
}

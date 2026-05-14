export type AssetType =
  | "Real Estate"
  | "Vehicle"
  | "Investment"
  | "Savings"
  | "Crypto"
  | "Business";

export class Asset {
  constructor(
    private id: number,
    private icon: string,
    private background: string,
    private name: string,
    private type: AssetType,
    private value: number,
    private cost: number,
    private acquiredDate: number,
    private note: string,
    private belongsTo: number
  ) {
    if (!name) {
      throw new Error("Asset name is required");
    }

    if (!icon) {
      throw new Error("Asset icon is required");
    }

    if (!background) {
      throw new Error("Background is required");
    }

    if (!Number.isFinite(value)) {
      throw new Error("Invalid asset value");
    }

    if (!Number.isFinite(cost)) {
      throw new Error("Invalid asset cost");
    }

    if (cost < 0) {
      throw new Error("Cost cannot be negative");
    }

    if (value < 0) {
      throw new Error("Value cannot be negative");
    }

    if (!acquiredDate) {
      throw new Error("Acquired date is required");
    }

    if (!Number.isInteger(belongsTo)) {
      throw new Error("Invalid belongsTo");
    }
  }

  // ===== GETTERS =====

  getId(): number {
    return this.id;
  }

  getIcon(): string {
    return this.icon;
  }

  getBackground(): string {
    return this.background;
  }

  getName(): string {
    return this.name;
  }

  getType(): AssetType {
    return this.type;
  }

  getValue(): number {
    return this.value;
  }

  getCost(): number {
    return this.cost;
  }

  getAcquiredDate(): number {
    return this.acquiredDate;
  }

  getNote(): string {
    return this.note;
  }

  getBelongsTo(): number {
    return this.belongsTo;
  }

  // ===== DOMAIN METHODS =====

  changeName(name: string): void {
    if (!name) {
      throw new Error("Asset name is required");
    }

    this.name = name;
  }

  changeValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error("Invalid value");
    }

    this.value = value;
  }

  changeCost(cost: number): void {
    if (!Number.isFinite(cost)) {
      throw new Error("Invalid cost");
    }

    this.cost = cost;
  }

  changeType(type: AssetType): void {
    this.type = type;
  }

  changeNote(note: string): void {
    this.note = note;
  }

  // ===== HELPERS =====

  getProfit(): number {
    return this.value - this.cost;
  }

  getProfitPercentage(): number {
    if (this.cost === 0) {
      return 0;
    }

    return (
      ((this.value - this.cost) /
        this.cost) *
      100
    );
  }

  isProfitable(): boolean {
    return this.value > this.cost;
  }
}
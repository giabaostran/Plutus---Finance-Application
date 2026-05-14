export class User {
  constructor(
    private id: number,
    private email: string,
    private username: string,
    private password: string,
    private deleted: boolean = false,
  ) {
    if (!username) {
      throw new Error("Name is required");
    }

    if (!User.isValidEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!User.isValidPassword(password)) {
      throw new Error("Weak password");
    }
  }

  // ===== GETTERS =====

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }
  setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  setEmail(newEmail: string): void {
    this.email = newEmail;
  }

  isDeleted(): boolean {
    return this.deleted;
  }

  softDelete(): void {
    this.deleted = true;
  }

  restore(): void {
    this.deleted = false;
  }

  // ===== VALIDATION =====

  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  }
}

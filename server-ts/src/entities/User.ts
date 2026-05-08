export class User {
  constructor(
    private id: number,
    private email: string,
    private username: string,
    private password: string,
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

  // ===== VALIDATION =====

  static isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  }
}

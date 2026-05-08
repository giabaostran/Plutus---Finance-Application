export class User {
  username: string;
  email: string;
  password: string;

  constructor(email: string, username: string, password: string) {
    if (!username) {
      throw new Error("Name is required");
    }

    console.log(email);
    if (!User.isValidEmail(email)) {
      throw new Error("Invalid emails");
    }

    if (!User.isValidPassword(password)) {
      throw new Error("Weak password");
    }

    this.username = username;
    this.email = email;
    this.password = password;
  }
  static isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static isValidPassword(password: string) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  }
}

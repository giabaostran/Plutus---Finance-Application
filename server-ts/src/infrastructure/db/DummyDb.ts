import fs from "fs";

import { User } from "../../entities/User";
import { UserRepository } from "../../service/interfaces";

export class DummyDb implements UserRepository {
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

  addUser(user: User): void {
    const users = this.readUsers();

    users.push(user);

    this.writeUsers(users);

    console.log(`Added ${user.getEmail()}`);
  }

  updateUser(user: User): void {
    const users = this.readUsers();

    const index = users.findIndex((u) => u.getId() === user.getId());

    if (index === -1) {
      throw new Error("User not found");
    }

    users[index] = user;

    this.writeUsers(users);
  }

  getUserByEmail(email: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getEmail() === email) || null;
  }

  getUserByUsername(username: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.getUsername() === username) || null;
  }

  getNextId(): number {
    const users = this.readUsers();

    if (users.length === 0) return 1;

    const maxId = Math.max(...users.map((u) => u.getId()));
    return maxId + 1;
  }
}

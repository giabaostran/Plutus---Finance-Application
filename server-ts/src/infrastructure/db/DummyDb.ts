import fs from "fs";

import { User } from "../../entities/User";
import { UserRepository } from "../../service/interfaces";

export class DummyDb implements UserRepository {
  // private filePath = path.join(process.cwd(), "users.json");
  private filePath = "./users.json";

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

  save(user: User): void {
    const users = this.readUsers();

    users.push(user);

    this.writeUsers(users);

    console.log(`Saved ${user.getEmail()}`);
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

    if (users.length === 0) return 1;

    const maxId = Math.max(...users.map((u) => u.getId()));
    return maxId + 1;
  }
}

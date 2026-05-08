import fs from "fs";

import { User } from "../../entities/User";
import { UserRepository } from "../../service/interfaces";

export class DummyDb implements UserRepository {
  // private filePath = path.join(process.cwd(), "users.json");
  private filePath = "./users.json";

  private readUsers(): User[] {
    // create file if it doesn't exist
    if (!fs.existsSync(this.filePath)) fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));

    const data = fs.readFileSync(this.filePath, "utf-8");

    return JSON.parse(data);
  }

  private writeUsers(users: User[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }

  save(user: User): void {
    const users = this.readUsers();

    users.push(user);

    this.writeUsers(users);

    console.log(`Saved ${user.email}`);
  }

  getByEmail(email: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.email === email) || null;
  }

  getByUsername(username: string): User | null {
    const users = this.readUsers();

    return users.find((u) => u.username === username) || null;
  }
}

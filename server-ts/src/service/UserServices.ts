import { User } from "../entities/User";
import { UserRepository, UserUseCases } from "./interfaces";

export class UserServices implements UserUseCases {
  constructor(private repository: UserRepository) {}

  create(email: string, username: string, password: string) {
    if (this.repository.getUserByEmail(email)) throw new Error("A user with the same email already exists");

    if (this.repository.getUserByUsername(username)) throw new Error("A user with the same username already exists");

    const id = this.repository.getNextId();

    const newUser = new User(id, email, username, password); // This can throw an error if invalid user so delegate to its caller

    this.repository.addUser(newUser);

    return newUser;
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    const user = this.repository.getUserByUsername(username);

    // If user with given name doesn't exist
    if (!user) {
      throw new Error(`Invalid username or password does not exist`);
    }
    // If supplied password doesn't match
    if (user.getPassword() === oldPassword) {
      user.setPassword(newPassword);
      this.repository.updateUser(user);
      return
    }

    throw new Error(`Invalid username or password does not exist`);
  }
}

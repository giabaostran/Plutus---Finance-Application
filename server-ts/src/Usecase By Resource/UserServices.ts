import { User } from "../entities/User";
import { UserRepository, UserUseCases } from "./interfaces";

export class UserServices implements UserUseCases {
  constructor(private repository: UserRepository) {}

  create(email: string, username: string, password: string) {
    if (this.repository.getUserByEmail(email)) throw new Error("A user with the same email already exists");

    if (this.repository.getUserByUsername(username)) throw new Error("A user with the same username already exists");

    const id = this.repository.getNextId();

    // This can throw an error if invalid user so delegate to its caller
    const newUser = new User(id, email, username, password);

    this.repository.addUser(newUser);

    return newUser;
  }

  changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = this.repository.getUserById(id);

    // If supplied password doesn't match or If user with given name doesn't exist
    if (!user || user.getPassword() !== oldPassword) {
      throw new Error(`Invalid username or password does not exist`);
    }

    user.setPassword(newPassword);

    this.repository.updateUser(user);

    return user;
  }
}

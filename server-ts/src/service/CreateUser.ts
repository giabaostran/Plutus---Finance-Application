import { User } from "../entities/User";
import { CreateUserUseCase, UserRepository } from "./interfaces";

export class CreateUser implements CreateUserUseCase {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(email: string, username: string, password: string) {
    if (this.repository.getByEmail(email)) throw new Error("A user with the same email already exists");

    if (this.repository.getByUsername(username)) throw new Error("A user with the same username already exists");

    const id = this.repository.getNextId();

    const newUser = new User(id, email, username, password); // This can throw an error if invalid user so delegate to its caller

    this.repository.add(newUser);

    return newUser;
  }
}

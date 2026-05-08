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

    const newUser = new User(email, username, password);

    this.repository.save(newUser);

    return newUser;
  }
}

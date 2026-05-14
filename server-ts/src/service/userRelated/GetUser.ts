import { GetUserUseCase, UserRepository } from "../interfaces";

import { User } from "../../entities/User";

export class GetUser implements GetUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  execute(userId: number): User {
    const user = this.repository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}

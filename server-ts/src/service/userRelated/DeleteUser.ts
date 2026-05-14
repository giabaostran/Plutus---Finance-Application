import { DeleteUserUseCase, UserRepository } from "../interfaces";

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly repository: UserRepository) {}
  execute(userId: number): void {
    const user = this.repository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isDeleted()) {
      throw new Error("User already deleted");
    }

    this.repository.softDelete(userId);
  }
}

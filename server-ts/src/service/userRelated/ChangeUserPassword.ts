import { ChangeUserPasswordUseCase, UserRepository } from "../interfaces";

export class ChangeUserPassword implements ChangeUserPasswordUseCase {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  execute(id: number, oldPassword: string, newPassword: string) {
    const user = this.repository.getById(id);

    // If supplied password doesn't match or If user with given name doesn't exist
    if (!user || user.getPassword() !== oldPassword) {
      throw new Error(`Invalid username or password does not exist`);
    }

    user.setPassword(newPassword);

    this.repository.update(user);

    return user;
  }
}

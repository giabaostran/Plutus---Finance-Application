import { User } from "../../entities/User";
import { LoginUseCase, UserRepository } from "../interfaces";

export class Login implements LoginUseCase {
  constructor(private userRepo: UserRepository) {}
  execute(email: string, password: string): User {
    const user = this.userRepo.getByEmail(email);
    if (!user || user.getPassword() !== password || user.isDeleted()) {
      throw new Error(`Invalid username/email or password does not exist`);
    }
    return user;
  }
}

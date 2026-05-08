import { User } from "../entities/User";

export interface UserRepository {
  getByEmail: (email: string) => User | null;
  getByUsername: (username: string) => User | null;
   getNextId(): number;
  save: (user: User) => void;
}

export interface UtilityService {
  sendEmail: (recipient: string, subject: string, content: string) => void;
}

export interface CreateUserUseCase {
  execute: (email: string, username: string, password: string) => User;
}

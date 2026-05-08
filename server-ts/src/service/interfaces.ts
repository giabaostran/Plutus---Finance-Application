import { User } from "../entities/User";

export interface UserRepository {
  getUserByEmail: (email: string) => User | null;
  getUserByUsername: (username: string) => User | null;
  getNextId(): number;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
}

export interface UtilityService {
  sendEmail: (recipient: string, subject: string, content: string) => void;
}

export interface CreateUserUseCase {
  execute: (email: string, username: string, password: string) => User;
}

export interface UserUseCases {
  create: (email: string, username: string, password: string) => User;
  changePassword: (username: string, oldPassword: string, newPassword: string) => void;
}

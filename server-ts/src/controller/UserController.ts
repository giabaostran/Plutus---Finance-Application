import { CreateUserUseCase, UserUseCases } from "../service/interfaces";
import { Request, Response } from "express";

export class UserController {
  // constructor(private createUser: CreateUserUseCase) {}
  constructor(private userServices: UserUseCases) {}

  create = (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;

      const user = this.userServices.create(email, username, password); // this can throw an error

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  changePassword = (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const username = req.params.username as string;
      const user = this.userServices.changePassword(username, oldPassword, newPassword); // this can throw an error

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}

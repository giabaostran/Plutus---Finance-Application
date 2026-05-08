import { CreateUserUseCase } from "../service/interfaces";
import { Request, Response } from "express";

export class UserController {
  constructor(private createUser: CreateUserUseCase) {}

  create = (req: Request, res: Response) => {
    try {
      const { email, username, password } = req.body;

      const user = this.createUser.execute(email, username, password); // this can throw an error

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? "hi: " + error.message : "Unknown error",
      });
    }
  };
}

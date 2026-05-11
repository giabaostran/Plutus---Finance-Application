import { TransactionUseCases } from "../service/interfaces";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private transactionServices: TransactionUseCases) {}

  create = (req: Request, res: Response) => {
    try {
      const { name, category, date, status, amt } = req.body;

      const belongsTo = Number(req.params.id);

      const transaction = this.transactionServices.create(name, category, date, status, amt, belongsTo); // this can throw an error

      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  getByUserId = (req: Request, res: Response) => {
    try {
      const belongsTo = Number(req.params.id);

      const transactions = this.transactionServices.getByUserId(belongsTo);

      res.status(201).json(transactions);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}

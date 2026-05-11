import { Transaction } from "../entities/Transaction";
import { CreateTransactionUseCase, TransactionRepository, UserRepository } from "./interfaces";

export class CreateTransaction implements CreateTransactionUseCase {
  constructor(
    private transactionRepo: TransactionRepository,
    private userRepo: UserRepository,
  ) {}

  execute(name: string, category: string, date: number, status: string, amt: number, belongsTo: number) {

    if (!belongsTo || !this.userRepo.getById(belongsTo)) {
      throw new Error("Must inlude this transaction's owner");
    }

    const id = this.transactionRepo.getNextId();

    const newTransaction = new Transaction(id, name, category, date, status, amt, belongsTo);

    this.transactionRepo.addTransaction(newTransaction);

    return newTransaction;
  }
}

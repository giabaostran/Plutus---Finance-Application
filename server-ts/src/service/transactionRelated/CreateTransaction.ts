import { Transaction, TransactionCategory, TransactionStatus } from "../../entities/Transaction";
import { CreateTransactionUseCase, TransactionRepository, UserRepository } from "../interfaces";

export class CreateTransaction implements CreateTransactionUseCase {
  constructor(
    private transactionRepo: TransactionRepository,
    private userRepo: UserRepository,
  ) {}

  execute(
    name: string,
    category: TransactionCategory,
    date: number,
    status: TransactionStatus,
    amt: number,
    belongsTo: number,
  ) {
    if (!belongsTo || !this.userRepo.getById(belongsTo)) {
      throw new Error("Must inlude this transaction's owner");
    }

    const id = this.transactionRepo.getNextId();

    const newTransaction = new Transaction(id, name, category, date, status, amt, belongsTo);

    this.transactionRepo.save(newTransaction);

    return newTransaction;
  }
}

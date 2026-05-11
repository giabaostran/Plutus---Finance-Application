import { Transaction } from "../entities/Transaction";

import { TransactionUseCases, TransactionRepository } from "./interfaces";

export class TransactionServices implements TransactionUseCases {
  constructor(private repository: TransactionRepository) {}

  create(name: string, category: string, date: number, status: string, amt: number, belongsTo: number) {
    const id = this.repository.getNextId();

    const newTransaction = new Transaction(id, name, category, date, status, amt, belongsTo);

    this.repository.addTransaction(newTransaction);

    return newTransaction;
  }

  getByUserId(id: number) {
    const transactions = this.repository.getTransactionsByUser(id);
    return transactions;
  }
}

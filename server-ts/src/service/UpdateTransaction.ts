import { Transaction, TransactionCategory } from "../entities/Transaction";
import { TransactionRepository, UpdateTransactionUseCase } from "./interfaces";

export class UpdateTransaction implements UpdateTransactionUseCase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  execute(
    transactionId: number,
    updates: {
      name?: string;
      category?: TransactionCategory;
      amount?: number;
    },
  ): Transaction {
    
    const transaction = this.transactionRepository.getById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // apply changes
    if (updates.name) {
      transaction.changeName(updates.name);
    }

    if (updates.category) {
      transaction.changeCategory(updates.category);
    }

    if (updates.amount !== undefined) {
      transaction.changeAmount(updates.amount);
    }

    this.transactionRepository.update(transaction);

    return transaction;
  }
}

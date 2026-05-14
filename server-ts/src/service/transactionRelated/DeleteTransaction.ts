import { TransactionRepository } from "../interfaces";

export class DeleteTransaction implements DeleteTransaction {
  constructor(private readonly repository: TransactionRepository) {}
  execute(transactionId: number, userId: number): void {
    const transaction = this.repository.getById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (transaction.getBelongsTo() !== userId) {
      throw new Error("User Not Authorize");
    }

    this.repository.delete(transaction);
  }
}

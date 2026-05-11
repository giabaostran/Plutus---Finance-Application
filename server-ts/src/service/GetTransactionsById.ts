import { GetTransactionByIdUseCase, TransactionRepository, UserRepository } from "./interfaces";

export class GetTransactionsById implements GetTransactionByIdUseCase {
  constructor(
    private transactionRepo: TransactionRepository,
    private userRepo: UserRepository,
  ) {}

  execute(id: number) {
    if (!id || !this.userRepo.getById(id)) throw new Error("User not found");

    const transactions = this.transactionRepo.getByUserId(id);

    return transactions;
  }
}

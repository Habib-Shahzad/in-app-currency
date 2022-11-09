import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User, UserModel } from "../users/users.model";
import { transactionTypeEnum } from "../transactions/transactions.model";

@Injectable()
export class WalletService {
  constructor() {}

  // Validate the amount to be added or withdrawn
  // Amount should be greater than 0 for all transactions
  // Amount should be less than or equal to wallet balance for payment transactions
  validateAmount(amount: number, balance: number, type: transactionTypeEnum) {
    if (amount <= 0) {
      throw new HttpException(
        "Amount should be greater than 0",
        HttpStatus.BAD_REQUEST
      );
    }
    if (balance < amount && type === transactionTypeEnum.payment) {
      throw new HttpException("Insufficient Balance", HttpStatus.BAD_REQUEST);
    }
  }

  // Add money to wallet
  async addMoney(user: User | UserModel, amount: number) {
    user.walletBalance += amount;
    await user.save();
    return user.walletBalance;
  }

  // Withdraw money from wallet
  async withdrawMoney(user: User | UserModel, amount: number) {
    user.walletBalance -= amount;
    await user.save();
    return user.walletBalance;
  }
}

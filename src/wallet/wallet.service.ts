import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "src/users/users.model";
import { transactionTypeEnum } from "src/transactions/transactions.model";

@Injectable()
export class WalletService {
  constructor() {}

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

  async addMoney(user: User, amount: number) {
    user.walletBalance += amount;
    await user.save();
    return user.walletBalance;
  }

  async withdrawMoney(user: User, amount: number) {
    user.walletBalance -= amount;
    await user.save();
    return user.walletBalance;
  }
}

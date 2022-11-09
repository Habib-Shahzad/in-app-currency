import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction, transactionTypeEnum } from "./transactions.model";
import { UsersService } from "../users/users.service";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel("transaction")
    private readonly transactionModel: Model<Transaction>,
    private readonly userService: UsersService,
    private readonly walletService: WalletService
  ) {}

  async createTransaction(
    username: string,
    amount: number,
    type: transactionTypeEnum
  ) {
    const user = await this.userService.getUser(username);
    const walletBalance = user.walletBalance;
    this.walletService.validateAmount(amount, walletBalance, type);

    if (type === transactionTypeEnum.payment) {
      await this.walletService.withdrawMoney(user, amount);
    } else if (type === transactionTypeEnum.topUp) {
      await this.walletService.addMoney(user, amount);
    }
    const newTransaction = new this.transactionModel({
      user: user.id,
      amount,
      type,
    });
    return await newTransaction.save();
  }

  async getUserTransactions(username: string) {
    const user = await this.userService.getUser(username);
    return await this.transactionModel.find({ username: user.username });
  }
}

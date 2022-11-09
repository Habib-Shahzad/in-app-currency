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

  // Process a transaction
  async createTransaction(
    username: string,
    amount: number,
    type: transactionTypeEnum
  ) {
    // Get the user
    const user = await this.userService.getUser(username);
    const walletBalance = user.walletBalance;

    // Validate the amount to be added or withdrawn
    this.walletService.validateAmount(amount, walletBalance, type);

    // Top up the wallet OR pay from the wallet
    if (type === transactionTypeEnum.payment) {
      await this.walletService.withdrawMoney(user, amount);
    } else if (type === transactionTypeEnum.topUp) {
      await this.walletService.addMoney(user, amount);
    }

    // Create a transaction
    const newTransaction = new this.transactionModel({
      user: user.id,
      amount,
      type,
    });
    return await newTransaction.save();
  }

  // Get all transactions of a user
  async getUserTransactions(username: string) {
    const user = await this.userService.getUser(username);
    return await this.transactionModel.find({ user: user.id });
  }
}

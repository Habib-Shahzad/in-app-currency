import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { transactionTypeEnum } from "./transactions.model";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly usersService: TransactionsService) {}

  //post/ top-up
  @UseGuards(AuthenticatedGuard)
  @Post("/top-up")
  async topUp(
    @Request() req,
    @Body("amount") amount: number,
    @Body("username") username: string
  ) {
    if (req.user.userName != username) {
      return {
        message: "You are not authorized to top up this user",
      };
    }
    const result = await this.usersService.createTransaction(
      username,
      amount,
      transactionTypeEnum.topUp
    );
    return result;
  }

  //post/ withdraw
  @UseGuards(AuthenticatedGuard)
  @Post("/withdraw")
  async withdraw(
    @Request() req,
    @Body("amount") amount: number,
    @Body("username") username: string
  ) {
    if (req.user.userName != username) {
      return "You can only withdraw from your own account";
    }
    const result = await this.usersService.createTransaction(
      username,
      amount,
      transactionTypeEnum.payment
    );
    return result;
  }

  //Get / transactions
  @UseGuards(AuthenticatedGuard)
  @Get("/list")
  async getTransactions(@Request() req) {
    const result = await this.usersService.getUserTransactions(
      req.user.userName
    );
    return result;
  }
}

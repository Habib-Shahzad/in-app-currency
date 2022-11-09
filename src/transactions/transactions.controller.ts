import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { transactionTypeEnum } from "./transactions.model";

@Controller("transactions")
export class TransactionsController {
  constructor(private readonly usersService: TransactionsService) {}

  //post/ Add money to wallet
  @UseGuards(AuthenticatedGuard)
  @Post("/top-up")
  async topUp(@Request() req, @Body("amount") amount: number) {
    // Get the username of current authenticated user
    const username = req.user.userName;

    const result = await this.usersService.createTransaction(
      username,
      amount,
      transactionTypeEnum.topUp
    );
    return result;
  }

  //post/ Pay money through wallet
  @UseGuards(AuthenticatedGuard)
  @Post("/withdraw")
  async withdraw(@Request() req, @Body("amount") amount: number) {

    // Get the username of current authenticated user
    const username = req.user.userName;

    const result = await this.usersService.createTransaction(
      username,
      amount,
      transactionTypeEnum.payment
    );
    return result;
  }

  //Get / List all transactions of authenticated user
  @UseGuards(AuthenticatedGuard)
  @Get("/list")
  async getTransactions(@Request() req) {
    const result = await this.usersService.getUserTransactions(
      req.user.userName
    );
    return result;
  }
}

import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionSchema } from "./transactions.model";
import { UsersModule } from "src/users/users.module";
import { WalletModule } from "src/wallet/wallet.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "transaction", schema: TransactionSchema },
    ]),
    UsersModule,
    WalletModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}

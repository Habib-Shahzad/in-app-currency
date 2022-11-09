import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "../database/database.module";
import { TransactionsController } from "./transactions.controller";
import { TransactionsModule } from "./transactions.module";
import { TransactionsService } from "./transactions.service";
import { connections } from "mongoose";
import { transactionTypeEnum } from "./transactions.model";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { HttpException } from "@nestjs/common";

describe("TransactionsService", () => {
  let service: TransactionsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TransactionsModule, DatabaseModule],
      controllers: [TransactionsController],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

    service = module.get<TransactionsService>(TransactionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  beforeAll((done) => {
    done();
  });

  it("it should be able to process a payment", async () => {
    const user = await usersService.insertUser("test", "test", 100);

    const transaction = await service.createTransaction(
      "test",
      20,
      transactionTypeEnum.payment
    );
    transaction && (await transaction.delete());
    user && (await user.delete());
    expect(transaction).toBeDefined();
  });

  it("it should be able to process a deposit", async () => {
    const user = await usersService.insertUser("test", "test", 100);

    const transaction = await service.createTransaction(
      "test",
      20,
      transactionTypeEnum.topUp
    );
    transaction && (await transaction.delete());
    user && (await user.delete());
    expect(transaction).toBeDefined();
  });

  it("it should throw an error if the user does not exist", async () => {
    try {
      await service.createTransaction("test", 20, transactionTypeEnum.topUp);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it("it should throw an error if the amount is less than 0", async () => {
    const user = await usersService.insertUser("test", "test", 100);

    try {
      await service.createTransaction("test", -20, transactionTypeEnum.topUp);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
    user && (await user.delete());
  });

  it("it should throw an error if the amount is greater than the wallet balance", async () => {
    const user = await usersService.insertUser("test", "test", 100);

    try {
      await service.createTransaction("test", 200, transactionTypeEnum.payment);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
    user && (await user.delete());
  });

  afterAll((done) => {
    connections[1].close();
    done();
  });
});

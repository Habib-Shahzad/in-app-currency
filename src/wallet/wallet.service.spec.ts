import { Test, TestingModule } from "@nestjs/testing";
import { WalletService } from "./wallet.service";
import { UserModel } from "../users/users.model";
import { transactionTypeEnum } from "../transactions/transactions.model";
import { HttpException } from "@nestjs/common";

describe("WalletService", () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [WalletService],
    }).compile();

    service = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should add money to wallet", () => {
    const user = new UserModel("test", "test", 0);
    const amount = 100;
    const oldBalance = user.walletBalance;
    service.addMoney(user, amount);
    const updatedBalance = user.walletBalance;

    expect(updatedBalance).toBe(oldBalance + amount);
  });

  it("should remove money from wallet", () => {
    const user = new UserModel("test", "test", 200);
    const amount = 100;
    const oldBalance = user.walletBalance;
    service.withdrawMoney(user, amount);
    const updatedBalance = user.walletBalance;

    expect(updatedBalance).toBe(oldBalance - amount);
  });

  it("should throw error if amount is less than 0", () => {
    const user = new UserModel("test", "test", 200);
    const amount = -100;

    try {
      service.validateAmount(
        amount,
        user.walletBalance,
        transactionTypeEnum.payment
      );
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  it("should throw error if amount is greater than wallet balance", () => {
    const user = new UserModel("test", "test", 200);
    const amount = 300;

    try {
      service.validateAmount(
        amount,
        user.walletBalance,
        transactionTypeEnum.payment
      );
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    done();
  });
});

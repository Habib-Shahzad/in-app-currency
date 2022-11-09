import { Test, TestingModule } from "@nestjs/testing";
import { TransactionsController } from "./transactions.controller";
import { DatabaseModule } from "../database/database.module";
import { TransactionsModule } from "./transactions.module";
import { connections } from "mongoose";

describe("TransactionsController", () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule, DatabaseModule],
      controllers: [TransactionsController],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

    beforeAll((done) => {
      done();
    });

    afterAll((done) => {
      connections[1].close();
      done();
    });
});

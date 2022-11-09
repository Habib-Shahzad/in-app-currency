import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersModule } from "./users.module";
import { connections } from "mongoose";
import { DatabaseModule } from "../database/database.module";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
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

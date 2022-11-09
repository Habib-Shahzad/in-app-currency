import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersModule } from "./users.module";
import { connections } from "mongoose";
import { DatabaseModule } from "../database/database.module";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be able to create a new user", async () => {
    const user = await service.insertUser("test", "test");
    user && (await user.delete());
    expect(user).toBeDefined();
  });

  it("should be able to find a user by username", async () => {
    const user = await service.insertUser("test", "test");
    const foundUser = await service.getUser("test");
    user && (await user.delete());
    expect(foundUser).toBeDefined();
  });

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    connections[1].close();
    done();
  });
});

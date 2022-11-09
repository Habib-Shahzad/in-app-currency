import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseModule } from "../database/database.module";
import { UsersModule } from "../users/users.module";
import { AuthService } from "./auth.service";
import { connections } from "mongoose";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, DatabaseModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    connections[1].close();
    done();
  });
});

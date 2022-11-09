import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";
import { LocalAuthGuard } from "src/auth/local.auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //post/ signup
  @Post("/signup")
  async addUser(
    @Request() req,
    @Response() res,
    @Body("password") userPassword: string,
    @Body("username") userName: string
  ) {
    //hash password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(userName, hashedPassword);

    if (result) {
      const user = {
        userId: result._id,
        userName: result.username,
      };
      req.login(user, (err) => {
        if (err) {
          res.status(401).send("unauthorized");
        } else {
          res.send(user);
        }
      });
    } else {
      res.status(401).send("unauthorized");
    }
  }

  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() req): any {
    return { User: req.user, msg: "User logged in" };
  }

  //Get / protected
  @UseGuards(AuthenticatedGuard)
  @Get("/protected")
  getUser(@Request() req): string {
    return req.user;
  }

  //Get / logout
  @Get("/logout")
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: "The user session has ended" };
  }
}

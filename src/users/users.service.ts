import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel("user") private readonly userModel: Model<User>) {}

  // Signup user method with username and password
  async insertUser(userName: string, password: string, walletBalance: number = 0) {
    const username = userName.toLowerCase();
    try {
      const newUser = new this.userModel({ username, password, walletBalance });
      await newUser.save();
      return newUser;
    } catch (err) {
      return null; // If the user already exists, return null
    }
  }
  // log in user using the findOne method
  async getUser(userName: string) {
    const username = userName.toLowerCase();

    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException("User not found", 404);
    }
    return user;
  }
}

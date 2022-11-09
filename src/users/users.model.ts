import * as mongoose from "mongoose";
export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  walletBalance: number;
}



export class UserModel {
  constructor(
    public username: string,
    public password: string,
    public walletBalance: number
  ) {
    this.username = username;
    this.password = password;
    this.walletBalance = walletBalance;
  }

  save() {}
}

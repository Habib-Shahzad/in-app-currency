import * as mongoose from "mongoose";
export const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["payment", "top-up"],
      required: true,
    },
  },
  { timestamps: true }
);

export enum transactionTypeEnum {
  payment = "payment",
  topUp = "top-up",
}

export interface Transaction extends mongoose.Document {
  _id: string;
  user: string;
  amount: number;
  type: string;
}

import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },
    transactionType: {
      type: String,
      required: [true, "Transaction Type is required"],
    },

   

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Expenses = mongoose.model("Expenses", expenseSchema);

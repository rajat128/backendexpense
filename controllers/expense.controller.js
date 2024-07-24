import mongoose from "mongoose";
import { Expenses } from "../models/expense.model.js";
import { catchayncerror } from "../middlewares/catchasyncerror.js";
import { User } from "../models/user.model.js";
import moment from "moment";

const createExpenses = catchayncerror(async (req, res, next) => {
  const {
    title,
    amount,
    description,

    category,
    userId,
    transactionType,
  } = req.body;

  // console.log(title, amount, description, date, category, userId, transactionType);

  if (!title || !amount || !description || !category || !transactionType) {
    return res.status(408).json({
      success: false,
      messages: "Please Fill all fields",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  let newTransaction = await Expenses.create({
    title: title,
    amount: amount,
    category: category,
    description: description,

    user: userId,
    transactionType: transactionType,
  });

  user.transactions.push(newTransaction);

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Transaction Added Successfully",
    user,
  });
});
const deleteExpenses = catchayncerror(async (req, res, next) => {
  const transactionId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const transactionElement = await Expenses.findByIdAndDelete(transactionId);
  // console.log(transactionElement._id);
  if (!transactionElement) {
    return res.status(400).json({
      success: false,
      message: "transaction not found",
    });
  }

  user.transactions = user.transactions.filter(
    (items) => !items._id.equals(transactionElement._id)
  );
  // user.updateOne({transactions:})
  // console.log(temp);
  await user.save();
  // console.log(user.transactions);

  return res.status(200).json({
    success: true,
    message: `Transaction successfully deleted`,
    user,
  });
});

// const updateExpense=catchayncerror(async(req,res,next)=>{
//     const transactionId = req.params.id;
//     const userId = req.body.userId;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     const { title, amount, description, date, category, transactionType } =
//       req.body;

//     console.log(title, amount, description, date, category, transactionType);

//     const transactionElement = await Expenses.findById(transactionId);
//       user.transactions=user.transactions.forEach(items=>
//        {
//         if(items._id.equals(transactionElement._id)){
//           items=transactionElement
//           console.log(items);
//         }
//        }
//       )
//       console.log(user.transactions);
//       await user.save()
//     if (!transactionElement) {
//       return res.status(400).json({
//         success: false,
//         message: "transaction not found",
//         user
//       });
//     }

//     if (title) {
//       transactionElement.title = title;
//     }

//     if (description) {
//       transactionElement.description = description;
//     }

//     if (amount) {
//       transactionElement.amount = amount;
//     }

//     if (category) {
//       transactionElement.category = category;
//     }
//     if (transactionType) {
//       transactionElement.transactionType = transactionType;
//     }

//     if (date) {
//       transactionElement.date = date;
//     }
//       console.log(transactionElement);
//     await transactionElement.save();

//     // await transactionElement.remove();

//     return res.status(200).json({
//       success: true,
//       message: `Transaction Updated Successfully`,
//       user
//     });
// })

const updateExpense = catchayncerror(async (req, res, next) => {
  const transactionId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { title, amount, description, date, category, transactionType } =
    req.body;

  const transactionElement = await Expenses.findById(transactionId);

  if (!transactionElement) {
    return res.status(400).json({
      success: false,
      message: "transaction not found",
      user,
    });
  }

  if (title) {
    transactionElement.title = title;
  }

  if (description) {
    transactionElement.description = description;
  }

  if (amount) {
    transactionElement.amount = amount;
  }

  if (category) {
    transactionElement.category = category;
  }
  if (transactionType) {
    transactionElement.transactionType = transactionType;
  }

  if (date) {
    transactionElement.date = date;
  }

  await transactionElement.save();

  const index = user.transactions.findIndex((transaction) =>
    transaction._id.equals(transactionId)
  );
  // console.log(index);
  if (index !== -1) {
    user.transactions[index] = transactionElement;
    // console.log(user.transactions[index]);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: `Transaction Updated Successfully`,
    user,
  });
});
const getAllExpenses = catchayncerror(async (req, res, next) => {
  const { userId, type, frequency, startDate, endDate } = req.body;

  // console.log(userId, type, frequency, startDate, endDate);

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  // Create a query object with the user and type conditions
  const query = {
    user: userId,
  };

  if (type == "all") {
    query.transactionType = type;
  }
  // console.log(query);
  // Add date conditions based on 'frequency' and 'custom' range
  if (frequency == "custom") {
    query.date = {
      $gt: moment().subtract(Number(frequency), "days").toDate(),
    };
  } else if (startDate && endDate) {
    query.date = {
      $gte: moment(startDate).toDate(),
      $lte: moment(endDate).toDate(),
    };
  }

  // console.log(query);

  const transactions = await Expenses.find(query);

  // console.log(transactions);

  return res.status(200).json({
    success: true,
    transactions: transactions,
  });
});

export { createExpenses, deleteExpenses, updateExpense, getAllExpenses };

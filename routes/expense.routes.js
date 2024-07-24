import express from "express";
import { createExpenses,updateExpense,deleteExpenses,getAllExpenses } from "../controllers/expense.controller.js";


const expenseRouter=express.Router()
expenseRouter.route("/addExpense").post(createExpenses);

expenseRouter.route("/getExpense").get(getAllExpenses);

expenseRouter.route("/deleteExpense/:id").post(deleteExpenses);

expenseRouter.route('/updateExpense/:id').put(updateExpense);

export{expenseRouter}

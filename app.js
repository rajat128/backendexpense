import express from "express"
import { expenseRouter } from "./routes/expense.routes.js"
import cors from "cors"
import router from "./routes/user.routes.js"
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use('/api/v1',expenseRouter)
app.use('/api/auth',router)
export{app}

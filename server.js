import { app } from "./app.js";
// import dotenv from"dotenv"
import { connectDB } from "./DB/connect.js";
import dotenv from 'dotenv'
dotenv.config()

//uncaught error
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught promise rejection`);
    process.exit(1)
})


connectDB()

const server=app.listen(8015,()=>{
    console.log(`Server is working on http://localhost:${8015}`);
})

//unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})
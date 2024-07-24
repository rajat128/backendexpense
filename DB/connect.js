import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB=async()=>{
   
    console.log(process.env.MONGOOSE_URI);
        const connectionInstance=await mongoose.connect("mongodb+srv://Rajat:Rajat1234@cluster0.l2yyhxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/expenses")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  
}

export{connectDB}

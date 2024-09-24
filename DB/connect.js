import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const connectDB=async()=>{
   
    
        const connectionInstance=await mongoose.connect("")
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  
}

export{connectDB}

import mongoose from "mongoose";

const connectDB= async() => {
    try{
        const connectionInsatnce= await mongoose.connect(`${process.env.MONGODB_URI}/chatapp`);
        console.log(`\n Mongodb connected !! DB host:${connectionInsatnce.connection.host}`)

    }catch(error){
        console.error("MONGODB conection failed")
        process.exit(1)
    }

}

export default connectDB;
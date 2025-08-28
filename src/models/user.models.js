import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10)
})


export const User=mongoose.model("User",userSchema);
import {User} from '../models/user.models.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser= async(req,res)=>{
    try{
        const{username,password}=req.body;

        if(!username || !password){
            return res
            .status(400)
            .json({message:"password and username required!!"})
        }

        const existingUser= await User.findOne({username})
        if(existingUser){
            return res
            .status(409)
            .json({message:"user already taken"})
        }

        const user= await User.create({
            username,
            password
        })

        const createdUser= await User.findById(user._id).select("-password")


        return res
        .status(200)
        .json({message:"user registered succesfully..",user:createdUser})

        }
    
    catch(error){
        return res
        .status(500)
        .json({message:"error in registering user",error})
    }
}

export {registerUser}
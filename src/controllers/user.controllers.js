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

const loginUser= async(req,res)=>{
    try{
        const {username,password}=req.body;

        if(!password || !username){
            return res
            .status(401)
            .json({message:"Both are required!!"})
        }

        const user=await User.findOne({username})

        if(!user){
            return res
            .status(405)
            .json({message:"user not found buddy"})
        }

        const isPassword= await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res
            .status(400)
            .json({message:"password is wrong!! try again"})
        }

        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        const loggedInUser= await User.findById(user._id).select("-password")



        return res
        .status(200)
        .json({message:"user login successfully!!!"})


    }
    catch(error){
        return res
        .status(501)
        .json({message:"internal error in logging in user",error})
    }
}

export {registerUser,loginUser}
import jwt from "jsonwebtoken";
import {User} from './models/user.model.js';

const verifyJWT= async(req,res,next)=>{
    try{
        const token=req.header("Authorization")?.replace("Bearer","");

        if(!token){
            return res
            .status(401)
            .json({message:"unauthorized request"})
        }
        const decodeToken=jwt.verify(token,process.env.JWT_SECERET);
        const user = await User.findById(decodeToken?._id).select("-password")

        if(!user){
            return res
            .status(401)
            .json({message:"invalid access token"});
        }
        req.user=user;
        next()

    }
    catch(error){
        return res
        .status(401)
        .json({message:"invalid or expired token"})
    }
}

export {verifyJWT}
import { Message } from "../models/message.model";

const getMessage= async(req,res)=>{
    try{
        const {receiverId}= req.params;
        const senderId=req.user._id;

        const messages= await Message.find({
            $or:[
                {sender:senderId,receiver:receiverId},
                {sender:receiverId,receiver:senderId}
            ]
        }).sort({createdAt:'asc'})

    }catch(error){
        return res
        .status(500)
        .json({message:"Server error while fetching message...",error:error.message})
    }
}

export {getMessage}
// In index.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRouter from './routes/user.routes.js'; 
import { Message } from './models/message.model.js';
import messsageRouter from './routes/message.route.js';
import { timeStamp } from 'console';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use("/api/v1/users", userRouter); 
app.use("/api/v1/messages",messsageRouter);



const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });


io.on('connection', (socket) => {
    console.log(' A user connected:', socket.id);


    const userId=socket.handshake.query.userId;
    if(userId){
        socket.join(userId);
        console.log(`User${userId} joined their room`);
    }

    socket.on('private message',async({content,to})=>{
        try{
            const message=await Message.create({
                content,
                sender:userId,
                receiver:to
            });
            io.to(to).emit('private message',{
                content,
                from:userId,
                timeStamp:message.createdAt
            });
            console.log(`message from ${userId} to ${to}:${content}`);

        }catch(error){
            console.log("Error handling private message:",error)
        }
    })


    socket.on('disconnect', () => {
        console.log(' A user disconnected:', socket.id);
    });
});
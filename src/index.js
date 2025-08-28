// In index.js

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRouter from './routes/user.routes.js'; 

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);


app.use(express.json());
app.use("/api/v1/users", userRouter); 



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

    socket.on('disconnect', () => {
        console.log(' A user disconnected:', socket.id);
    });
});
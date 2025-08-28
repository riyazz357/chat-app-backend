import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import { Socket } from "dgram";
import { Console } from "console";

dotenv.config()

const app = express();
const httpServer=http.createServer(app);
const io=new Server(httpServer)

const PORT= process.env.PORT || 3500


io.on("connction",(socket)=>{
    Console.log("A user connected:",socket.id);

    socket.on("disconnect",()=>{
        console.log("A user is disconnected:",socket.io);
    })
})

httpServer.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
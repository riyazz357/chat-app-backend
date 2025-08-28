import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import { Socket } from "dgram";
import connectDB from "./db/index.js";
import { Console } from "console";
import { connect } from "http2";

dotenv.config()

const app = express();
const httpServer=http.createServer(app);
const io=new Server(httpServer)

const PORT= process.env.PORT || 3500

//connecting to the database
connectDB()
.then(()=>{
    httpServer.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGODB db connection failed !!!",err);
})


io.on("connction",(socket)=>{
    Console.log("A user connected:",socket.id);

    socket.on("disconnect",()=>{
        console.log("A user is disconnected:",socket.io);
    })
})


import express from 'express'
import cors from 'cors'
import { Server } from "socket.io";
import { createServer } from 'http';
import mongoose from 'mongoose'
import app from './app.js'


const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });
io.on("connection", (socket) => { 
console.log(socket.id)

});

mongoose.connect('mongodb+srv://Asadbek:Azamjonov@cluster0.ykjem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => {
    console.log("connected to mongo")
    httpServer.listen(3030);
})
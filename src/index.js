import { Server } from "socket.io";
import { createServer } from 'http';
import mongoose from 'mongoose'
import app from './app.js'
import RoomModel from "./room/model.js";


const httpServer = createServer(app)
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(socket.id, socket.rooms)

    socket.on("setUsername", ({ username, room }) => {
        console.log(username)

       

        onlineUsers.push({ username, id: socket.id, room })

        socket.emit('loggedin')
        socket.broadcast.emit('newConnection')
    })

    socket.on("sendmessage", async ({ message, room }) => {

        try {
            await RoomModel.findOneAndUpdate({ name: room }, {
                $push: { messages: message }
            })

            socket.to(room).emit("message", message)

        } catch (error) {
            socket.emit("error", { error: "Can't save to DB. Try again later." })
        }

    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(u => u.id !== socket.id)
    })
});

mongoose.connect(process.env.MONGO_CONNECTION)
.then(() => {
    console.log("connected to mongo")
    httpServer.listen(4000);
})
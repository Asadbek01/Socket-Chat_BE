import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { OnlineUser } from "./types";

// We can initialize a in-memory shared array that will be used in our socket handlers
// as well as in our express routes.

let onlineUsers: OnlineUser[] = []

// Initializing our express app
const app = express();

app.use(cors());
app.use(express.json());

// app.get('/online-users', (req, res) => {
//     res.send({ onlineUsers })
// })



// Handling some express routes/routers...
//....

// Creating a new HTTP server using the standard NodeJS http module 
// passing our express app for the configuration of the routes*
const httpServer = createServer(app);

// * This is important because the Server from socket.io accepts in input only a standard HTTP server
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    
    socket.on("setUsername", ({ username  }) => {
        onlineUsers.push({ username, id: socket.id })
        // Emits to the other end of the channel
        socket.emit("loggedin")

        // Emits to the other end of *every other* channel
        socket.broadcast.emit("newConnection")

        // Emits to every connected socket
        // io.sockets.emit() 
    })

    socket.on("sendmessage", (message) => {
        console.log(message)
        socket.broadcast.emit("message", message)
    })

 

});

// CAUTION: we do not app.listen() 
// but rather httpServer.listen()
httpServer.listen(3030, () => {
    console.log("Server is listening on port 3030");
});

function id(id: any) {
    throw new Error("Function not implemented.");
}

import { Server } from "socket.io";
import http from 'http';
import app from "../App.js";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on("connection", (socket) => {
    console.log("Socket connected");

    socket.on("disconnect", (error) => {
        console.log("Socket disconnected")
    })
    socket.on("error", (error) => {
        console.log("Socker error : ", error);
    });
})

export {server, io};
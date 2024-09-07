import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { Message } from "../types/message";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("message", (data) => {
      io.emit("message", data); // Broadcast the message to all clients
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });

    socket.on("send_message", (message: Message) => {
      console.log("Message received:", message);

      // Broadcast the message to all connected clients
      io.emit("receive_message", message);
    });
  });

  return io;
};

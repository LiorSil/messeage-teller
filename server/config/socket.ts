import { Server as HttpServer } from "http";
import { Server } from "socket.io";

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
  });

  return io;
};

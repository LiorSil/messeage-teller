// src/socket/index.ts
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { handleConnection } from "./handlers/connectionHandler";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow credentials (e.g., cookies)
    },
  });

  io.on("connection", (socket) => handleConnection(socket, io));

  return io;
};

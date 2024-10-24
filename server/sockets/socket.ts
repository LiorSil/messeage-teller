import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { handleConnection } from "./handlers/connectionHandler";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    },
  });

  io.on("connection", (socket) => handleConnection(socket, io));

  return io;
};

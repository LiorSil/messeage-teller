import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { handleConnection } from "./handlers/connection.handler";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
 // enable more origins
 origin: ["http://localhost:5173","http://localhost:5174"],

      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    },
  });

  io.on("connection", (socket) => handleConnection(socket, io));

  return io;
};

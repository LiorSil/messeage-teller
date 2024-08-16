import { Server } from "socket.io";
import http from "http";

let io: Server | null = null;

export const initializeSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Must match the client origin
      methods: ["GET", "POST"],
      credentials: true, // Must allow credentials if withCredentials is used on the client
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io?.emit("message", data); // Broadcast the message to all clients
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.IO initialized");
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

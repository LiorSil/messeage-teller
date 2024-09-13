import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { IMessage } from "../models/model.interfaces";
import chatService from "../services/chatService";
import { IChat } from "../models/model.interfaces";
import { Types } from "mongoose";

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Replace with your frontend URL
      methods: ["GET", "POST"],
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    },
  });

  // Map to store the relationship between contact._id and socket.id
  const contactSocketMap = new Map<string, string>();

  io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    // Accessing the contactId from the query parameter
    const contactId = socket.handshake.query.contactId as string;

    if (contactId) {
      // Map contact._id to socket.id
      contactSocketMap.set(contactId, socket.id);
      console.log(`Contact ${contactId} connected with socket ${socket.id}`);
    }

    // Listen for incoming messages
    socket.on("send_message", async (message: IMessage) => {
      try {
        // Create or retrieve the chat between participants on the server database
        const chat: IChat = await chatService.createChat([
          message.fromId.toString(),
          message.toId.toString(),
        ]);

        if (!chat || !(chat._id instanceof Types.ObjectId)) {
          console.error("Failed to create or retrieve the chat.");
          return;
        }

        // Add the message to the chat on the server database
        const updatedChat = await chatService.createMessage(chat._id, message);
        console.log("updatedChat:", updatedChat);

        // Emit the message to the receiver's socket if they are online
        const receiverSocketId = contactSocketMap.get(message.toId.toString());

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
          console.log(
            `Message sent to contact ${message.toId} via socket ${receiverSocketId}`
          );
        } else {
          console.log(`Contact ${message.toId} is not online.`);
        }
      } catch (error) {
        console.error("Error handling send_message:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      if (contactId) {
        contactSocketMap.delete(contactId);
        console.log(`Contact ${contactId} disconnected`);
      }
    });

    // Broadcast a message to all clients (for demonstration)
    socket.on("message", (data) => {
      io.emit("message", data); // Broadcast the message to all clients
    });
  });

  return io;
};

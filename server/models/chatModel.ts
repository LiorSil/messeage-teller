import exp from "constants";
import mongoose, { Schema, Document } from "mongoose";
import { IChat } from "./model.interfaces";
import Message from "./messageModel";

const chatSchema = new Schema<IChat>({
  participants: [
    { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  ],
  messages: { type: [Message], default: [] },
});

export const Chat = mongoose.model("Chat", chatSchema, "chats");
export default Chat;

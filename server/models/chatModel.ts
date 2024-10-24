import mongoose, { Schema } from "mongoose";
import { IChat, IMessage } from "./model.interfaces";

const messageSchema = new Schema<IMessage>({
  fromId: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  toId: {
    type: Schema.Types.ObjectId,
    ref: "Contact",
    required: true,
  },
  sentTD: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  readTD: {
    type: Date,
  },
  content: {
    type: String,
    required: true,
  },
});

const chatSchema = new Schema<IChat>({
  participants: [
    { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  ],
  messages: { type: [messageSchema], default: [] },
  notification: {
    type: [Schema.Types.ObjectId],
    ref: "Contact",
    default: [],
    required: true,
  },
});

export const Chat = mongoose.model("Chat", chatSchema, "chats");
export default Chat;

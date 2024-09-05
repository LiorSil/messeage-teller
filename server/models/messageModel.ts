import { Schema, Document, Types, model } from "mongoose";
import { IMessage } from "./model.interfaces";

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
  messageText: {
    type: String,
    required: true,
  },
});

const Message = model<IMessage>("Message", messageSchema, "messages");

export default Message;

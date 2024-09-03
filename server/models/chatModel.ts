import exp from "constants";
import mongoose, { Schema, Document } from "mongoose";

// Define the message subdocument schema
interface IMessage extends Document {
  sender: Schema.Types.ObjectId;
  content: string;
  timestamp: string;
  read: boolean;
}
 
interface IChat extends Document {
  participants: Schema.Types.ObjectId[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
  isGroupChat: boolean;
  groupName: string;
}

const messageSchema = new Schema<IMessage>({
  sender: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
  read: { type: Boolean, default: false },
});



// Define the chat schema
const chatSchema = new Schema<IChat>({
  participants: [
    { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  ],
  messages: { type: [messageSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isGroupChat: { type: Boolean, default: false },
  groupName: {
    type: String,
    required: function () {
      return (this as any).isGroupChat;
    },
  }, // Name of the group if it's a group chat
});

// Pre-save hook to update the updatedAt field
chatSchema.pre("save", function (next) {
  this.updatedAt = new Date(Date.now());
  next();
});

export const Chat = mongoose.model("Chat", chatSchema, "chats");
export default Chat;
export { IMessage, IChat };

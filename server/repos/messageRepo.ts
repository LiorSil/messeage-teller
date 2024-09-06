import e from "express";
import Message from "../models/messageModel";
import { IMessage } from "../models/model.interfaces";

const createMessage = async (
  messageData: Partial<IMessage>
): Promise<IMessage> => {
  const message = new Message({ ...messageData });
  console.log("message", message);

  return await message.save();
};

export default { createMessage };

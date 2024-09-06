import { IMessage } from "../models/model.interfaces";
import messageRepo from "../repos/messageRepo";

const createMessage = async (
  messageData: Partial<IMessage>
): Promise<IMessage> => {
  const message = await messageRepo.createMessage(messageData);
  return message;
};

export default {
  createMessage,
};

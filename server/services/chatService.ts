import chatRepo from "../repos/chatRepo";
import { IChat, IContact, IMessage } from "../models/model.interfaces";
import { Schema, Types } from "mongoose";
import contactService from "./contactService";

const createChat = async (contacts: string[]): Promise<IChat> => {
  const participants = await contactService.getContactsByIds(contacts);

  if (!participants || participants.length === 0) {
    throw new Error(
      "Invalid contacts. Unable to create chat with undefined or empty contacts."
    );
  }

  const contactIds = participants.map((contact: IContact) => contact._id);

  if (contactIds.some((id) => !id)) {
    throw new Error("One or more contacts have invalid IDs.");
  }

  const chat = await chatRepo.createChat(contactIds);
  return chat;
};

const createMessage = async (
  chatId: Types.ObjectId,
  messageData: Partial<IMessage>
): Promise<IChat | null> => {
  return await chatRepo.pushMessage(chatId, messageData);
}

export default { createChat, createMessage

 };

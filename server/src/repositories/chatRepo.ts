import { Types } from "mongoose";
import { IChat, IMessage } from "../models/model.interfaces";
import chatModel from "../models/chatModel";

export const pushMessage = async (
  chatId: Types.ObjectId,
  message: Partial<IMessage>
): Promise<IChat | null> => {
  return await chatModel
    .findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true })
    .exec();
};


export const pushNotification = async (
  chatId: Types.ObjectId,
  recipientId: Types.ObjectId
): Promise<IChat | null> => {
  const success = await chatModel
    .findByIdAndUpdate(
      chatId,
      { $push: { notifications: recipientId } },
      { new: true }
    )
    .exec();
  console.log("Notification pushed:", success);
  return success;
};

export const getChats = async (): Promise<IChat[] | IChat> => {
  return await chatModel.find().exec();
};

export const getOrCreateChat = async (
  participants: Types.ObjectId[]
): Promise<IChat> => {
  let chat = await chatModel
    .findOne({
      participants: { $all: participants },
      $expr: { $eq: [{ $size: "$participants" }, participants.length] },
    })
    .exec();

  // If no chat is found, create a new one
  if (!chat) {
    chat = new chatModel({ participants });
    await chat.save();
  }
  return chat;
};

export const updateChat = async (
  chatId: Types.ObjectId | string,
  updateData: Partial<IChat>
): Promise<IChat | null> => {
  return await chatModel
    .findByIdAndUpdate(chatId, updateData, { new: true })
    .exec();
};

export const deleteChat = async (
  chatId: Types.ObjectId | string
): Promise<IChat | null> => {
  return await chatModel.findByIdAndDelete(chatId).exec();
};

export const getChatsByContactId = async (
  participantId: Types.ObjectId
): Promise<IChat[]> => {
  try {
    return await chatModel
      .find({
        participants: { $in: [participantId] },
      })
      .exec();
  } catch (error) {
    console.error("Error retrieving chats by participant:", error);
    throw new Error("Failed to retrieve chats.");
  }
};

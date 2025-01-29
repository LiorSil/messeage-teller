import { IChat, IMessage } from "../interfaces/model.interfaces";
import chatModel from "../models/chat.model";
import { Participant } from "../types/chat.type";

/**
 * 
 * @param chatId 
 * @param message 
 * @returns 
 */

export const pushMessage = async (
  chatId: Pick<IChat, "_id">,
  message: Partial<IMessage>
): Promise<IChat | null> => {
  return await chatModel
    .findByIdAndUpdate(chatId, { $push: { messages: message } }, { new: true })
    .exec();
};

/**
 * Pushes a notification to the notifications array of a specific chat.
 * @param chatId - The ID of the chat document to update.
 * @param recipientId - The ID of the recipient to add to the notifications array.
 * @returns {Promise<IChat | null>} - Returns the updated chat document or null if not found.
 */

export const pushNotification = async (
  chatId: Pick<IChat, "_id">,
  recipientId: Participant
): Promise<IChat | null> => {
  const updatedChat = await chatModel
    .findByIdAndUpdate(
      chatId,
      { $push: { notifications: recipientId } },
      { new: true }
    )
    .exec();
  return updatedChat;
};

/**
 * @returns {Promise<IChat[] | IChat>} - Returns an array of chat documents or a single chat document.
 */
export const getChats = async (): Promise<IChat[] | IChat> => {
  return await chatModel.find().exec();
};

/**
 * Retrieves a chat document by its ID.
 * @param chatId - The ID of the chat document to retrieve.
 * @returns {Promise<IChat | null>} - Returns the chat document or null if not found.
 * @throws {Error} - Throws an error if the retrieval fails.
 */

export const getOrCreateChat = async (
  participants: Array<Participant>
): Promise<IChat> => {
  let chat = await chatModel
    .findOne({
      participants: { $all: participants },
      $expr: { $eq: [{ $size: "$participants" }, participants.length] },
    })
    .exec();

  // If no chat is found, create a new one ( can't )
  if (!chat) {
    chat = new chatModel({ participants });
    await chat.save();
  }
  return chat;
};



/**
 * Updates a chat document with the provided update data.
 * @param chatId - The ID of the chat document to update.
 * @param updateData - The data to update in the chat document.
 * @returns {Promise<IChat | null>} - Returns the updated chat document or null if not found.
 * @throws {Error} - Throws an error if the update fails.
 */
export const updateChat = async (
  chatId: Pick<IChat, "_id">,
  updateData: Partial<IChat>
): Promise<IChat | null> => {
  try {
    const updatedChat = await chatModel
      .findByIdAndUpdate(chatId, updateData, { new: true, lean: true })
      .exec();
    return updatedChat as IChat;
  } catch (error) {
    console.error("Error updating chat:", error);
    throw new Error("Failed to update chat.");
  }
};

/**
 * Deletes a chat document by its ID.
 * @param chatId - The ID of the chat document to delete.
 * @returns {Promise<IChat | null>} - Returns the deleted chat document or null if not found.
 */
export const deleteChat = async (
  chatId: Pick<IChat, "_id">
): Promise<IChat | null> => {
  const deletedChat = await chatModel.findByIdAndDelete(chatId).exec();
  return deletedChat as IChat;
};

/**
 * Retrieves chats by a participant's ID.
 * @param participantId - The ID of the participant to search for in chats.
 * @returns {Promise<IChat[]>} - Returns an array of chat documents.
 * @throws {Error} - Throws an error if the retrieval fails.
 */
export const getChatsByContactId = async (
  participantId: Participant
): Promise<IChat[]> => {
  try {
    const chats = await chatModel
      .find({
        participants: { $in: [participantId] },
      })
      .lean()
      .exec();
    return chats as IChat[];
  } catch (error) {
    console.error("Error retrieving chats by participant:", error);
    throw new Error("Failed to retrieve chats.");
  }
};

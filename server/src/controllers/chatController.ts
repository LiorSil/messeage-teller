import { Request, Response } from "express";
import { getChatByParticipants } from "../services/chatService";
("../services/chatService");

export const getChatsByParticipantsIds = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contact } = await req.body;
  const { subContactId } = req.query;
  const chat = await getChatByParticipants([contact._id, subContactId]);
  if (chat) res.status(200).json(chat);
  else res.status(404).json({ message: "Chat not found" });
};

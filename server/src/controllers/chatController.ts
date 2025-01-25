import { Request, Response } from "express";
import { getChatByParticipants as getChatByParticipantsService } from "../services/chatService";
("../services/chatService");

export const getChatByParticipants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const  contact = await req.body.contact;
  const { subContactId } = req.query;
  const chat = await getChatByParticipantsService([contact._id, subContactId]);
  if (chat) res.status(200).json(chat);
  else res.status(404).json({ message: "Chat not found" });
};

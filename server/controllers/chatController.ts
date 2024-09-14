import { Request, Response } from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
  const participants = req.query.participants as string;
  const chats = await chatService.getChatByParticipantsIds(participants);

  if (!chats) {
    res.status(404).json({ message: "No chats found." });
  } else {
    res.status(200).json(chats);
  }
};

export default { getChatsByParticipantsIds };

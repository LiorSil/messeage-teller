import {Request, Response} from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const { contact } = await req.body;
    const {subContactId} = req.query
    const chat = await chatService.getOrCreateChat(contact._id, subContactId as any);
    res.status(chat ? 200 : 404).json(chat ? chat : {message: "No chats found."});
}
export default {getChatsByParticipantsIds};

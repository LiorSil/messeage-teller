import {Request, Response} from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const {contactId, subContactId} = req.query
    const chat = await chatService.getChatByParticipantsIds([contactId as any, subContactId as any]);
    res.status(chat ? 200 : 404).json(chat ? chat : {message: "No chats found."});
}
export default {getChatsByParticipantsIds};

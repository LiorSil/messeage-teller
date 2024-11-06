import {Request, Response} from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const {contact} = await req.body;
    const {subContactId} = req.query
    const chat = await chatService.getChatByParticipants([contact._id, subContactId]);
    if (chat)
        res.status(200).json(chat);
    else
        res.status(404).json({message: "Chat not found"});

}
export default {getChatsByParticipantsIds};

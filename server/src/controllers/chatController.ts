import {Request, Response} from "express";
import notificationRepo from "../repositories/notificationRepo";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const {contact} = await req.body;
    const {subContactId} = req.query
    const chat = await notificationRepo.pullRecipient(contact._id, subContactId as any);
    if (chat)
        res.status(200).json(chat);
    else
        res.status(404).json({message: "Chat not found"});

}
export default {getChatsByParticipantsIds};

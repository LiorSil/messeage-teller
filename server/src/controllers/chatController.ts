import {Request, Response} from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const contactId = req.query.contactId;
    const subContactId = req.query.subContactId;
    const chats = await chatService.getChatByParticipantsIds(contactId as string);
    const messages = chats?.find((chat) =>
        chat.participants.some(participant => participant.equals(subContactId as string)
        ));

    if (!chats) {
        res.status(404).json({message: "No chats found."});
    } else {

        res.status(200).json(messages)
    }
}
export default {getChatsByParticipantsIds};

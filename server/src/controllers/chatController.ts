import {Request, Response} from "express";
import chatService from "../services/chatService";

const getChatsByParticipantsIds = async (req: Request, res: Response) => {
    const contactId = req.query.contactId;
    const subContactId = req.query.subContactId;
    const chat = await chatService.getChatByParticipantsIds([contactId as string, subContactId as string] );
    const messages = chat?.find((chat) =>
        chat.participants.some(participant => participant.equals(subContactId as string)
        ));
    console.log("messages", messages);

    if (!chat) {
        res.status(404).json({message: "No chats found."});
    } else {

        res.status(200).json(messages)
    }
}
export default {getChatsByParticipantsIds};

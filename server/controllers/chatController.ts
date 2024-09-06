import chatService from "../services/chatService";
import contactService from "../services/contactService";
import messageService from "../services/messageService";
import { Request, Response } from "express";

const createChat = async (req: Request, res: Response) => {
  try {
    const { fromNumber, toNumber, content } = req.body;

    const contacts = await contactService.getContactsByPhoneNumber([
      fromNumber,
      toNumber,
    ]);

    const [from, to] = [0, 1];

    if (!contacts) {
      return res.status(404).json({ error: "Contacts not found" });
    }

    const message = await messageService.createMessage({
      fromId: contacts[from]._id,
      toId: contacts[to]._id,
      content,
    });

    console.log("message", message);

    const chat = await chatService.createChat(
      [message.fromId, message.toId],
      message
    );

    res.status(201).json(chat);
  } catch (error: any) {
    res.status(500).json({ error: error.message as string });
  }
};

export default { createChat };

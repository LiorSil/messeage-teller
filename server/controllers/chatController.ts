import chatService from "../services/chatService";
import contactService from "../services/contactService";
import { Request, Response } from "express";

const createChat = async (req: Request, res: Response) => {
  try {
    const contacts = req.body?.contacts || [];
    const dbContacts = await contacts.map(async (contact: any) => {
      return await contactService.getContactByPhoneNumber(contact.phoneNumber);
    });

    const message = req.body?.message || [];

    console.log("dbContacts", dbContacts);
    console.log("messages", message);

    if (!dbContacts || !(dbContacts.length > 2)) {
      return res.status(404).json({ message: "Contacts not found" });
    } else {
      const newChat = await chatService.createChat(dbContacts, message);
      res.status(201).json(newChat);
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { createChat };

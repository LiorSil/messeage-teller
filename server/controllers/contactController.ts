import { Request, Response } from "express";


import contactService from "../services/contactService";

const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContact = async (req: Request, res: Response) => {
  const { id, phoneNumber } = req.body.contact;
  console.log("id", id, "phoneNumber", phoneNumber);
  try {
    const contact = await contactService.getContactByPhoneNumber(phoneNumber);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContactByPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.params;

  try {
    const contact = await contactService.getContactByPhoneNumber(
      phoneNumber as string
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export { createContact, getContact, getContactByPhoneNumber };

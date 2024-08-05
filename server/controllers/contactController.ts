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

const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await contactService.getContacts();
    res.status(200).json(contacts);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const updateContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.updateContact(req.params.id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export {
  createContact,
  getContactById,
  getContacts,
  updateContact,
  deleteContact,
};

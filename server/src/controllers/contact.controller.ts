import { Request, Response } from "express";
import {
  addSubContactService,
  buildClientContactDataService,
  createContactService,
  findContactsByQueryService,
  pushNotificationService,
  pullNotificationService,
  updateContactService,
} from "../services/contact.service";

export const createContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contactData = req.body;
    const createdContact = await createContactService(contactData);
    if (!createdContact)
      res.status(409).json({ message: "Contact already exists" });
    res.status(201).json(createdContact);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact } = await req.body;
    const result = await buildClientContactDataService(contact);
    res.status(result.status).json(result.data);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const findContactsByQuery = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact } = req.body;
    const { query } = req.params;
    const safeContacts = await findContactsByQueryService(contact, query);
    res.status(200).json(safeContacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addSubContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact, subContactId } = req.body;

    const newSubContact = await addSubContactService(contact._id, subContactId);
    if (!newSubContact)
      res.status(404).json({ message: "Sub contact not found" });
    res.status(200).json({...newSubContact, isIncomingMessage: false});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact } = req.body;
    if (!contact) res.status(404).json({ message: "Contact not found" });

    Object.assign(contact, req.body);
    await updateContactService(contact._id, contact);

    res.status(200).json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

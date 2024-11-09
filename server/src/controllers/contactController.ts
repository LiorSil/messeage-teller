import { Request, Response } from "express";
import {
  addSubContactService,
  buildClientContactDataService,
  createContactService,
  findContactsByQueryService,
  pushNotificationService,
  pullNotificationService,
  updateContactService,
} from "../services/contactService";

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
    console.log("result", result);
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

    const contactWasUpdated = await addSubContactService(
      contact._id,
      subContactId
    );
    if (!contactWasUpdated)
      res.status(404).json({ message: "Sub contact not found" });
    const result = await buildClientContactDataService(contact);
    res.status(result.status).json(result.data);
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

export const creteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contactId, subContactId } = req.body;
    const result = await pushNotificationService(contactId, subContactId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const acknowledgeNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contactId, subContactId } = req.body;
    const result = await pullNotificationService(contactId, subContactId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

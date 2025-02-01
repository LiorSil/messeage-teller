import { Request, Response } from "express";
import {
  addSubContactService,
  buildClientContactDataService,
  createContactService,
  deleteSubContact,
  findContactsByQueryService,
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

export const ModifySubContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact, subContactId, actionType } = req.body;

    if (actionType == "add") {
      const newSubContact = await addSubContactService(contact, subContactId);
      if (!newSubContact)
        res.status(404).json({ message: "Sub contact not found" });

      res
        .status(200)
        .json({ subContact: { ...newSubContact, isIncomingMessage: false } });
    } else if (actionType == "delete") {
      const subContactIsDelete = await deleteSubContact(contact, subContactId);
      if (subContactIsDelete)
        res.status(200).json({
          subContactId,
        });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//TODO: Make the updateProfile generic to handle other updates
export const updateContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { contact, data } = req.body;
    const updatedContact = { ...contact, ...data };
    await updateContactService(contact._id, updatedContact);

    res.status(200).json(updatedContact);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

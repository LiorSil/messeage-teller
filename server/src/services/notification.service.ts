
import { IContact } from "../interfaces/model.interfaces";
import { getContactById, updateNotification } from "../repositories/contact.repository";

export const pushNotificationService = async (
  contactId: Pick<IContact, "_id">,
  subContactId: Pick<IContact, "_id">
): Promise<IContact | null> => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  const updatedContact = await updateNotification(
    contactId,
    subContactId,
    true
  );
  return updatedContact;
};

export const pullNotificationService = async (
  contactId: Pick<IContact, "_id">,
  subContactId: Pick<IContact, "_id">
): Promise<IContact | null> => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  const updatedContact = await updateNotification(
    contactId,
    subContactId,
    false
  );
  return updatedContact;
};





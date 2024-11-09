// src/types/contact.ts

import { SubContact } from "./subContact";

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
  subContacts: SubContact[]; //
  notificationsIds: string[];
  // Ensure this is typed as an array of SubContact
}

// src/types/contactTypes.ts

export interface FetchContactByPhoneOrNameParams {
  query: string;
}
export interface FetchAddSubContactParams {
  newSubContactNumber: string;
}
export interface AckNotificationArgs {
  contactId: string;
  subContactId: string;
}

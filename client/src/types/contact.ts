// src/types/contact.ts

import { SubContact } from "./subContact";

export interface Contact {
  _id: string;
  name: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  subContacts: SubContact[]; // Ensure this is typed as an array of SubContact
}

// src/types/contactTypes.ts

export interface FetchAddSubContactParams {
  token: string;
  newSubContactNumber: string;
}

export interface FetchContactByPhoneOrNameParams {
  token: string;
  phoneNumber: string;
}

export interface ContactResponse {
  contacts: any;
  id: string;
  name: string;
  phoneNumber: string;
  subContacts: Array<{ id: string; phoneNumber: string }>;
}

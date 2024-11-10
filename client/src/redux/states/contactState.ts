// contactState.ts
import { Contact } from "../../types/contact";
import { SubContact } from "../../types/subContact";

export interface ContactState {
  contact: Contact | null;
  potentialSubContacts: SubContact[];
  error: string;
}

export const initialState: ContactState = {
  contact: {
    _id: "",
    name: "",
    phoneNumber: "",
    avatar: "",
    createdAt: "",
    subContacts: [],
    notificationsIds: [],
  },
  potentialSubContacts: [],
  error: "",
};

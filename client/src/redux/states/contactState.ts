// contactState.ts
import { Contact } from "../../types/contact";

export interface ContactState {
  contact: Contact | null;
  loading: boolean;
  error: string | null;
  getContactLoading: boolean;
  phoneNumber: string;
  addContactSuccess: boolean;
}

export const initialState: ContactState = {
  contact: {
    _id: "",
    name: "",
    phoneNumber: "",
    avatar: "",
    createdAt: "",
    subContacts: [],
  },
  loading: false,
  phoneNumber: "",
  getContactLoading: false,
  error: "",
  addContactSuccess: false,
};
